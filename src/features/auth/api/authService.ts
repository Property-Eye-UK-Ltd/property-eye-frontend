import apiClient from "@/lib/apiClient";
import type {
    AuthLoginRequest,
    AuthLoginResponse,
    AuthMeResponse,
    AuthMessageResponse,
    AuthForgotPasswordRequest,
    AuthResetPasswordRequest,
    AuthChangePasswordRequest,
    AgencyOnboardingStartRequest,
    AgencyOnboardingStartResponse,
    AgencyOnboardingResendRequest,
    AgencyOnboardingOtpRequest,
    AgencyOnboardingStepResponse,
    AgencyProfileUpdateRequest,
    AgencyProfileUpdateResponse,
    MarketerOnboardingStartRequest,
    MarketerOnboardingStartResponse,
    MarketerOnboardingResendRequest,
    MarketerOnboardingOtpRequest,
    MarketerOnboardingStepResponse,
    MarketerProfileUpdateRequest,
    MarketerProfileUpdateResponse,
} from "@/types/auth.types";

export const login = async (payload: AuthLoginRequest): Promise<AuthLoginResponse> => {
    const { data } = await apiClient.post<AuthLoginResponse>("/auth/login", payload);
    return data;
};

export const refresh = async (): Promise<AuthLoginResponse> => {
    const { data } = await apiClient.post<AuthLoginResponse>("/auth/refresh");
    return data;
};

export const logout = async (): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>("/auth/logout");
    return data;
};

export const getMe = async (): Promise<AuthMeResponse> => {
    const { data } = await apiClient.get<AuthMeResponse>("/auth/me");
    return data;
};

export const forgotPassword = async (
    payload: AuthForgotPasswordRequest
): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>("/auth/forgot-password", payload);
    return data;
};

export const resetPassword = async (
    payload: AuthResetPasswordRequest
): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>("/auth/reset-password", payload);
    return data;
};

export const adminForgotPassword = async (
    payload: AuthForgotPasswordRequest
): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>("/auth/admin/forgot-password", payload);
    return data;
};

export const adminResetPassword = async (
    payload: AuthResetPasswordRequest
): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>("/auth/admin/reset-password", payload);
    return data;
};

export const changePassword = async (
    payload: AuthChangePasswordRequest
): Promise<AuthMessageResponse> => {
    const { data } = await apiClient.post<AuthMessageResponse>(
        "/auth/change-password-authenticated",
        payload
    );
    return data;
};

export const agencyRegister = async (
    payload: AgencyOnboardingStartRequest,
    params?: { token?: string; code?: string; ref?: string }
): Promise<AgencyOnboardingStartResponse> => {
    const { data } = await apiClient.post<AgencyOnboardingStartResponse>(
        "/auth/agency/register",
        payload,
        { params }
    );
    return data;
};

export const agencyResendOtp = async (
    payload: AgencyOnboardingResendRequest
): Promise<AgencyOnboardingStartResponse> => {
    const { data } = await apiClient.post<AgencyOnboardingStartResponse>(
        "/auth/agency/register/resend-otp",
        payload
    );
    return data;
};

export const agencyVerifyOtp = async (
    payload: AgencyOnboardingOtpRequest
): Promise<AgencyOnboardingStepResponse> => {
    const { data } = await apiClient.post<AgencyOnboardingStepResponse>(
        "/auth/agency/register/verify-otp",
        payload
    );
    return data;
};

// Onboarding-only: saves owner/agency profile fields during signup. Uses the
// same session (access_token cookie) as every other authenticated call —
// there is no separate onboarding token; the backend gates this endpoint by
// account status instead. Backend: POST /auth/agency/onboarding-profile.
export const agencyUpdateOnboardingProfile = async (
    payload: AgencyProfileUpdateRequest
): Promise<AgencyProfileUpdateResponse> => {
    const { data } = await apiClient.post<AgencyProfileUpdateResponse>(
        "/auth/agency/onboarding-profile",
        payload
    );
    return data;
};

// Authenticated-only: edits profile fields for an already-signed-up agency
// user (dashboard settings), relying on apiClient's normal bearer-cookie
// interceptor. Backend: POST /auth/agency/profile.
export const agencyUpdateProfile = async (
    payload: AgencyProfileUpdateRequest
): Promise<AgencyProfileUpdateResponse> => {
    const { data } = await apiClient.post<AgencyProfileUpdateResponse>(
        "/auth/agency/profile",
        payload
    );
    return data;
};

export const marketerRegister = async (
    payload: MarketerOnboardingStartRequest
): Promise<MarketerOnboardingStartResponse> => {
    const { data } = await apiClient.post<MarketerOnboardingStartResponse>(
        "/auth/marketer/register",
        payload
    );
    return data;
};

export const marketerResendOtp = async (
    payload: MarketerOnboardingResendRequest
): Promise<MarketerOnboardingStartResponse> => {
    const { data } = await apiClient.post<MarketerOnboardingStartResponse>(
        "/auth/marketer/register/resend-otp",
        payload
    );
    return data;
};

export const marketerVerifyOtp = async (
    payload: MarketerOnboardingOtpRequest
): Promise<MarketerOnboardingStepResponse> => {
    const { data } = await apiClient.post<MarketerOnboardingStepResponse>(
        "/auth/marketer/register/verify-otp",
        payload
    );
    return data;
};

// Same session/cookie as every other authenticated call — see
// agencyUpdateOnboardingProfile above.
export const marketerUpdateProfile = async (
    payload: MarketerProfileUpdateRequest
): Promise<MarketerProfileUpdateResponse> => {
    const { data } = await apiClient.post<MarketerProfileUpdateResponse>(
        "/auth/marketer/profile",
        payload
    );
    return data;
};

export interface ImageUploadResponse {
    url: string;
}

// Called both mid-onboarding and from the authenticated dashboard
// (AgencyProfileTab) — both now carry the same session cookie, so no
// per-caller token distinction is needed here anymore.
export const uploadImage = async (
    file: File,
    fileType: "profile" | "logo"
): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<ImageUploadResponse>(
        `/media/image?file_type=${fileType}`,
        formData
    );
    return data;
};

