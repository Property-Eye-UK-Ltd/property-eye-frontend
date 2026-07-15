import apiClient from "@/lib/apiClient";
import type {
    AuthLoginRequest,
    AuthLoginResponse,
    AuthMeResponse,
    AuthMessageResponse,
    AuthForgotPasswordRequest,
    AuthResetPasswordRequest,
    AgencyOnboardingStartRequest,
    AgencyOnboardingStartResponse,
    AgencyOnboardingResendRequest,
    AgencyOnboardingOtpRequest,
    AgencyOnboardingStepResponse,
    AgencyProfileUpdateRequest,
    AgencyProfileUpdateResponse,
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

export const agencyUpdateProfile = async (
    payload: AgencyProfileUpdateRequest,
    onboardingToken?: string
): Promise<AgencyProfileUpdateResponse> => {
    const { data } = await apiClient.post<AgencyProfileUpdateResponse>(
        "/auth/agency/profile",
        payload,
        onboardingToken
            ? { headers: { Authorization: `Bearer ${onboardingToken}` } }
            : undefined
    );
    return data;
};

export interface SasUrlResponse {
    blob_name: string;
    clean_url: string;
    upload_url: string;
}

export const getUploadSasUrl = async (
    fileName: string, 
    fileType: "profile" | "logo",
    onboardingToken?: string
): Promise<SasUrlResponse> => {
    const { data } = await apiClient.get<SasUrlResponse>(
        `/media/sas-url?file_name=${encodeURIComponent(fileName)}&file_type=${fileType}`,
        onboardingToken
            ? { headers: { Authorization: `Bearer ${onboardingToken}` } }
            : undefined
    );
    return data;
};

export const uploadFileToAzure = async (uploadUrl: string, file: File): Promise<void> => {
    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": file.type,
        },
        body: file,
    });
    if (!response.ok) {
        throw new Error(`Failed to upload file to Azure: ${response.statusText}`);
    }
};

