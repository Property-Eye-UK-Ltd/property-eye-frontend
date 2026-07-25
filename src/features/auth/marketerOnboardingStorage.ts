import type { AuthLoginResponse } from "@/types/auth.types";

export const MARKETER_ONBOARDING_EMAIL_KEY = "marketer_onboarding_email";
export const MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY = "marketer_onboarding_otp_expires_at";
export const MARKETER_ONBOARDING_TOKEN_KEY = "marketer_onboarding_token";
export const MARKETER_ONBOARDING_SESSION_KEY = "marketer_onboarding_pending_session";

export const getMarketerOnboardingEmail = () => sessionStorage.getItem(MARKETER_ONBOARDING_EMAIL_KEY);

export const setMarketerOnboardingEmail = (email: string) =>
    sessionStorage.setItem(MARKETER_ONBOARDING_EMAIL_KEY, email);

export const getMarketerOnboardingToken = () => sessionStorage.getItem(MARKETER_ONBOARDING_TOKEN_KEY);

export const setMarketerOnboardingToken = (token: string) =>
    sessionStorage.setItem(MARKETER_ONBOARDING_TOKEN_KEY, token);

/**
 * Holds the completed AuthLoginResponse between the Profile step and the
 * Referral Link screen. Deliberately NOT applied to AuthContext until the
 * marketer clicks "Proceed to Dashboard" on that screen — applying it early
 * would make route guards treat onboarding as finished before they've seen
 * their referral link.
 */
export const getPendingMarketerSession = (): AuthLoginResponse | null => {
    const raw = sessionStorage.getItem(MARKETER_ONBOARDING_SESSION_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as AuthLoginResponse;
    } catch {
        return null;
    }
};

export const setPendingMarketerSession = (data: AuthLoginResponse) =>
    sessionStorage.setItem(MARKETER_ONBOARDING_SESSION_KEY, JSON.stringify(data));

export const clearMarketerOnboardingStorage = () => {
    sessionStorage.removeItem(MARKETER_ONBOARDING_EMAIL_KEY);
    sessionStorage.removeItem(MARKETER_ONBOARDING_OTP_EXPIRES_AT_KEY);
    sessionStorage.removeItem(MARKETER_ONBOARDING_TOKEN_KEY);
    sessionStorage.removeItem(MARKETER_ONBOARDING_SESSION_KEY);
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
    return "/marketer-login";
};
