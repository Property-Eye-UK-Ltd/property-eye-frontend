import Cookies from "js-cookie";

export const MARKETER_ONBOARDING_EMAIL_KEY = "marketer_onboarding_email";
export const MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY = "marketer_onboarding_otp_expires_at";

const cookieOpts = { sameSite: "lax" as const, secure: window.location.protocol === "https:" };

// Cookies, not sessionStorage: marketer OTPs are typically checked from an
// SMS/email app, which opens the link/tab as a fresh browser context with no
// access to the tab-scoped sessionStorage that started signup — that
// mismatch was the main cause of marketers hitting "Session expired" mid
// verification. A cookie is readable from any tab in the same browser.
//
// Only email + OTP expiry live here: before OTP verification there is no
// User row with a real session yet. Once OTP verifies, the backend logs the
// user into a real session (access_token + refresh_token cookies) that
// AuthContext already tracks — there is no separate onboarding token or
// pending-session cookie to track here.
export const getMarketerOnboardingEmail = () => Cookies.get(MARKETER_ONBOARDING_EMAIL_KEY) ?? null;

export const setMarketerOnboardingEmail = (email: string) =>
    Cookies.set(MARKETER_ONBOARDING_EMAIL_KEY, email, cookieOpts);

export const getMarketerOnboardingOtpExpiresAt = () => Cookies.get(MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY) ?? null;

export const setMarketerOnboardingOtpExpiresAt = (expiresAt: string) =>
    Cookies.set(MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY, expiresAt, cookieOpts);

export const clearMarketerOnboardingStorage = () => {
    Cookies.remove(MARKETER_ONBOARDING_EMAIL_KEY);
    Cookies.remove(MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY);
};

/**
 * Backend `next_step` values from MarketerOnboardingStartResponse /
 * MarketerOnboardingStepResponse (backend/src/schemas/marketer_onboarding.py),
 * mapped to the matching frontend route. "done" has no route of its own in
 * this map — the Profile page routes to the referral-link screen directly
 * once it receives an AuthLoginResponse, rather than via this lookup.
 */
export const MARKETER_ONBOARDING_STEP_ROUTES = {
    verify_otp: "/marketer-verify-otp",
    complete_profile: "/marketer-profile",
} as const;

export type MarketerOnboardingNextStep = keyof typeof MARKETER_ONBOARDING_STEP_ROUTES | "done";

export const resolveMarketerOnboardingRoute = (nextStep: string): string => {
    if (nextStep in MARKETER_ONBOARDING_STEP_ROUTES) {
        return MARKETER_ONBOARDING_STEP_ROUTES[nextStep as keyof typeof MARKETER_ONBOARDING_STEP_ROUTES];
    }
    // "done" or any unrecognized value: nothing left for this flow to
    // resume, so send the user to sign in rather than guessing.
    return "/login";
};
