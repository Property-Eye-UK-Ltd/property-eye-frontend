/**
 * Authentication Layout Types
 * 
 * Type definitions for the authentication layout system
 */

export interface AuthLayoutProps {
    /**
     * Content to be displayed on the left side of the layout
     */
    children: React.ReactNode;

    /**
     * Current step in the authentication flow (0-indexed)
     */
    currentStep: number;

    /**
     * Total number of steps in the authentication flow
     */
    totalSteps: number;

    /**
     * Image URL to display on the right side
     * @default undefined - will show primary brand color background
     */
    imageUrl?: string;

    /**
     * Alt text for the image
     */
    imageAlt?: string;

    /**
     * Optional heading to display above the progress bar
     */
    heading?: string;

    /**
     * Whether to show the progress bar
     * @default true
     */
    showProgress?: boolean;

    /**
     * Layout variant for different user types
     * @default "agency"
     */
    variant?: "agency" | "super-admin";
}

export interface ProgressBarProps {
    /**
     * Current step (0-indexed)
     */
    currentStep: number;

    /**
     * Total number of steps
     */
    totalSteps: number;

    /**
     * Optional className for styling
     */
    className?: string;
}

// --- Backend auth contract types (mirrors backend/src/schemas/auth.py and agency_onboarding.py) ---

export interface AuthAgencySummary {
    id: string;
    name?: string;
    email?: string;
    phone_number?: string;
    address?: string;
    logo_url?: string;
    status: string;
}

export interface AuthPlanSummary {
    id: string;
    name: string;
    tier?: string;
    current_period_start?: string;
    current_period_end?: string;
    cancel_at_period_end?: boolean;
}

export interface AuthUserSummary {
    id: string;
    email: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    address?: string;
    profile_image_url?: string;
    role: string;
    portal_context: string;
    status: string;
    must_change_password: boolean;
    avatar_url?: string;
    last_active_at?: string;
}

export interface AuthMeResponse extends AuthUserSummary {
    agency_id?: string;
    agency?: AuthAgencySummary;
    plan?: AuthPlanSummary;
}

export interface AuthLoginResponse extends AuthMeResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token_expires_in: number;
}

export interface AuthLoginRequest {
    email: string;
    password: string;
}

export interface AuthForgotPasswordRequest {
    email: string;
}

export interface AuthResetPasswordRequest {
    reset_code: string;
    new_password: string;
}

export interface AuthChangePasswordRequest {
    current_password: string;
    new_password: string;
}

export interface AuthMessageResponse {
    message: string;
}

export interface AgencyOnboardingStartRequest {
    phone_number: string;
    email: string;
    password: string;
}

export interface AgencyOnboardingStartResponse {
    email: string;
    status: string;
    next_step: string;
    otp_expires_at?: string;
    message: string;
    token?: string;
}

export interface AgencyOnboardingResendRequest {
    email: string;
}

export interface AgencyOnboardingOtpRequest {
    email: string;
    otp_code: string;
}

export interface AgencyOnboardingStepResponse {
    email: string;
    status: string;
    next_step: string;
    message: string;
    token?: string;
}

export interface AgencyProfileUpdateRequest {
    first_name?: string;
    last_name?: string;
    gender?: string;
    address?: string;
    profile_image_url?: string;
    agency_name?: string;
    agency_address?: string;
    agency_logo_url?: string;
}

export type AgencyProfileUpdateResponse = AuthLoginResponse | AgencyOnboardingStepResponse;

export interface ApiErrorDetail {
    loc: (string | number)[];
    msg: string;
    type: string;
}

export interface ApiErrorResponse {
    detail: string | ApiErrorDetail[];
}
