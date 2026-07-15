export const ONBOARDING_EMAIL_KEY = "agency_onboarding_email";
export const ONBOARDING_OTP_EXPIRES_AT_KEY = "agency_onboarding_otp_expires_at";
export const ONBOARDING_TOKEN_KEY = "agency_onboarding_token";

export const getOnboardingEmail = () => sessionStorage.getItem(ONBOARDING_EMAIL_KEY);

export const getOnboardingToken = () => sessionStorage.getItem(ONBOARDING_TOKEN_KEY);

export const setOnboardingToken = (token: string) =>
    sessionStorage.setItem(ONBOARDING_TOKEN_KEY, token);

export const clearOnboardingStorage = () => {
    sessionStorage.removeItem(ONBOARDING_EMAIL_KEY);
    sessionStorage.removeItem(ONBOARDING_OTP_EXPIRES_AT_KEY);
    sessionStorage.removeItem(ONBOARDING_TOKEN_KEY);
};
