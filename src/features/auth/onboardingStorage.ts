import Cookies from "js-cookie";

export const ONBOARDING_EMAIL_KEY = "agency_onboarding_email";
export const ONBOARDING_OTP_EXPIRES_AT_KEY = "agency_onboarding_otp_expires_at";

const cookieOpts = { sameSite: "lax" as const, secure: window.location.protocol === "https:" };

// Cookies, not sessionStorage: the OTP/verification code for this flow is
// delivered by SMS or email, and a very common path is the user opening it
// in a brand-new tab (or their phone's messaging/mail app opening a new
// browser instance) rather than returning to the tab that started signup.
// sessionStorage is scoped to that one originating tab, so it silently lost
// this state and the new tab showed "Session expired" even though the OTP
// itself was still valid — this was the main cause of that report.
//
// Only email + OTP expiry live here: before OTP verification there is no
// User row with a real session yet, so this is the only client-side state
// that exists pre-verification. Once OTP verifies, the backend logs the user
// into a real session (access_token + refresh_token cookies, same as an
// active user) — there is no separate onboarding token to track here.
export const getOnboardingEmail = () => Cookies.get(ONBOARDING_EMAIL_KEY) ?? null;

export const setOnboardingEmail = (email: string) => Cookies.set(ONBOARDING_EMAIL_KEY, email, cookieOpts);

export const getOnboardingOtpExpiresAt = () => Cookies.get(ONBOARDING_OTP_EXPIRES_AT_KEY) ?? null;

export const setOnboardingOtpExpiresAt = (expiresAt: string) =>
    Cookies.set(ONBOARDING_OTP_EXPIRES_AT_KEY, expiresAt, cookieOpts);

export const clearOnboardingStorage = () => {
    Cookies.remove(ONBOARDING_EMAIL_KEY);
    Cookies.remove(ONBOARDING_OTP_EXPIRES_AT_KEY);
};

/**
 * Backend `next_step` values from AgencyOnboardingStartResponse /
 * AgencyOnboardingStepResponse (backend/src/schemas/agency_onboarding.py),
 * mapped to the matching frontend route. "done" has no route of its own —
 * callers should treat it as onboarding-complete (redirect to /dashboard).
 */
export const ONBOARDING_STEP_ROUTES = {
    verify_otp: "/verify-otp",
    complete_profile: "/agency-owner-info",
    complete_agency: "/agency-information",
} as const;

export type OnboardingNextStep = keyof typeof ONBOARDING_STEP_ROUTES | "done";

export const resolveOnboardingRoute = (nextStep: string): string => {
    if (nextStep in ONBOARDING_STEP_ROUTES) {
        return ONBOARDING_STEP_ROUTES[nextStep as keyof typeof ONBOARDING_STEP_ROUTES];
    }
    // "done" or any unrecognized value: onboarding has nothing left for this
    // flow to resume, so send the user to sign in rather than guessing.
    return "/login";
};
