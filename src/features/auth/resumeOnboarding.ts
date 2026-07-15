import * as authService from "@/features/auth/api/authService";
import { ONBOARDING_EMAIL_KEY, ONBOARDING_OTP_EXPIRES_AT_KEY } from "@/features/auth/onboardingStorage";

/**
 * Handles the 403 "Email verification required" response from /auth/login
 * (backend/src/services/auth_service.py `authenticate_user`, user status
 * "pending_verification"). The only email-only resume action the backend
 * exposes for this state is /auth/agency/register/resend-otp (see
 * `resend_onboarding_otp` in agency_onboarding_service.py, which only
 * requires `status == "otp_pending"` and rejects with 400/404 otherwise).
 *
 * Persists the resent OTP's expiry so /verify-otp's timer starts correctly,
 * and returns the frontend route to redirect to.
 */
export const resumePendingVerification = async (email: string): Promise<string> => {
    const response = await authService.agencyResendOtp({ email });
    sessionStorage.setItem(ONBOARDING_EMAIL_KEY, response.email);
    if (response.otp_expires_at) {
        sessionStorage.setItem(ONBOARDING_OTP_EXPIRES_AT_KEY, response.otp_expires_at);
    }
    return "/verify-otp";
};

/**
 * Handles the 403 "Agency signup is incomplete" response from /auth/login
 * (user status "pending_profile"/"pending_agency" — already past OTP
 * verification, still missing owner/agency profile fields).
 *
 * There is no email-only resume for this state: the backend's resumable
 * /auth/agency/register endpoint always re-validates and overwrites
 * phone_number + password (see `start_onboarding_session`), and the profile
 * endpoint requires a bearer token we don't have at this point. The only
 * contract-safe path is to send the user back through Signup, which collects
 * those required fields and will correctly resume at the right step once
 * resubmitted.
 */
export const PENDING_PROFILE_REDIRECT = "/signup";
