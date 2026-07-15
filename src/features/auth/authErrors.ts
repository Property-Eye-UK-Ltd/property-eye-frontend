import { isAxiosError, type AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/auth.types";

/**
 * Every `detail` string the backend is known to send for auth endpoints
 * (backend/src/services/auth_service.py, agency_onboarding_service.py).
 * Kept as an exact-match catalogue instead of guessed substrings so new/renamed
 * backend messages fail loudly (fall through to the generic fallback) rather
 * than silently mis-routing the user.
 */
export const AUTH_ERROR_DETAIL = {
    // auth_service.py
    INCORRECT_CREDENTIALS: "Incorrect email or password",
    EMAIL_VERIFICATION_REQUIRED: "Email verification required",
    AGENCY_SIGNUP_INCOMPLETE: "Agency signup is incomplete",
    WRONG_PORTAL_PREFIX: "User must authenticate through the", // + "<portal> portal"
    ACCOUNT_NOT_ACTIVE: "User account is not active",
    COULD_NOT_VALIDATE_CREDENTIALS: "Could not validate credentials",
    SESSION_EXPIRED: "Session expired or invalid",
    RESET_CODE_INVALID: "Reset code is invalid or expired",
    USER_NOT_FOUND: "User not found",
    ONBOARDING_ALREADY_COMPLETED: "Onboarding is already completed",
    // agency_onboarding_service.py
    EMAIL_ALREADY_REGISTERED: "Email already registered",
    SIGNUP_DRAFT_NOT_FOUND: "Signup draft not found",
    OTP_RESEND_TOO_LATE: "OTP can only be resent before verification",
    OTP_VERIFICATION_UNAVAILABLE: "OTP verification is no longer available",
    OTP_EXPIRED: "OTP code is expired",
    OTP_INVALID: "OTP code is invalid",
    PENDING_USER_NOT_FOUND: "Pending user record not found",
    PROFILE_UPDATE_BEFORE_OTP: "Agency profile can only be updated after OTP verification",
    PROFILE_FIELD_REQUIRED: "At least one profile field must be provided",
    OWNER_PROFILE_INCOMPLETE: "Owner profile is incomplete",
    AGENCY_DETAILS_INCOMPLETE: "Agency details are incomplete",
    INVITE_TOKEN_NOT_FOUND: "Invite token not found",
    INVITE_TOKEN_INVALID: "Invite token is no longer valid",
    INVITE_EMAIL_MISMATCH: "Invite email does not match the signup email",
    REFERRAL_CODE_INVALID: "Invalid referral code",
} as const;

/**
 * Signup-draft state errors that mean "the local onboarding state on this
 * device is stale/gone" — the only safe recovery is to send the user back to
 * Signup to re-establish (or resume, since /auth/agency/register is
 * idempotent-resumable) their session from scratch.
 */
export const STALE_ONBOARDING_STATE_DETAILS: readonly string[] = [
    AUTH_ERROR_DETAIL.SIGNUP_DRAFT_NOT_FOUND,
    AUTH_ERROR_DETAIL.OTP_RESEND_TOO_LATE,
    AUTH_ERROR_DETAIL.OTP_VERIFICATION_UNAVAILABLE,
    AUTH_ERROR_DETAIL.PENDING_USER_NOT_FOUND,
    AUTH_ERROR_DETAIL.PROFILE_UPDATE_BEFORE_OTP,
];

export const getErrorDetail = (error: unknown): string | undefined => {
    if (!isAxiosError<ApiErrorResponse>(error)) return undefined;
    const detail = error.response?.data?.detail;
    return typeof detail === "string" ? detail : undefined;
};

export const getErrorStatus = (error: unknown): number | undefined =>
    isAxiosError(error) ? (error as AxiosError).response?.status : undefined;

/**
 * 422 responses use FastAPI's HTTPValidationError shape
 * (`detail: [{loc, msg, type}]`) instead of a plain string — every other
 * auth error is a string `detail`. Flatten the array into one readable line
 * so validation errors surface the real field/reason instead of falling
 * through to a generic fallback.
 */
const formatValidationDetail = (error: unknown): string | undefined => {
    if (!isAxiosError<ApiErrorResponse>(error)) return undefined;
    const detail = error.response?.data?.detail;
    if (!Array.isArray(detail)) return undefined;
    return detail
        .map((item) => {
            const field = item.loc?.[item.loc.length - 1];
            return field ? `${field}: ${item.msg}` : item.msg;
        })
        .join(" ");
};

export const extractErrorMessage = (error: unknown, fallback: string): string =>
    getErrorDetail(error) ?? formatValidationDetail(error) ?? fallback;
