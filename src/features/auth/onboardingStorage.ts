export const ONBOARDING_EMAIL_KEY = "agency_onboarding_email";
export const ONBOARDING_OTP_EXPIRES_AT_KEY = "agency_onboarding_otp_expires_at";
export const ONBOARDING_TOKEN_KEY = "agency_onboarding_token";

export const getOnboardingEmail = () => sessionStorage.getItem(ONBOARDING_EMAIL_KEY);

export const setOnboardingEmail = (email: string) =>
    sessionStorage.setItem(ONBOARDING_EMAIL_KEY, email);

export const getOnboardingToken = () => sessionStorage.getItem(ONBOARDING_TOKEN_KEY);

export const setOnboardingToken = (token: string) =>
    sessionStorage.setItem(ONBOARDING_TOKEN_KEY, token);

export const clearOnboardingStorage = () => {
    sessionStorage.removeItem(ONBOARDING_EMAIL_KEY);
    sessionStorage.removeItem(ONBOARDING_OTP_EXPIRES_AT_KEY);
    sessionStorage.removeItem(ONBOARDING_TOKEN_KEY);
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
