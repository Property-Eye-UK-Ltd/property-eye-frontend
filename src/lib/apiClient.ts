import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

const ACCESS_TOKEN_COOKIE = "access_token";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

export const setAuthToken = (accessToken: string, expiresInSeconds: number) => {
    Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        expires: expiresInSeconds / 86400,
        sameSite: "lax",
        secure: window.location.protocol === "https:",
    });
};

export const clearAuthToken = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
};

export const getAuthToken = () => Cookies.get(ACCESS_TOKEN_COOKIE);

apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Every endpoint under /auth/* is handled locally by its owning page (Login,
// Signup, OTPVerification, AgencyOwnerInfo, AgencyInformation, ForgotPassword)
// with specific messaging + redirects per backend response — see
// features/auth/authErrors.ts and features/auth/resumeOnboarding.ts. This
// interceptor's job is to catch 401s from *other* (authenticated app) API
// calls where nothing local is watching for them, so it must not also fire a
// competing generic toast/redirect for auth-flow requests.
const AUTH_FLOW_PATH_PREFIX = "/auth/";

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url ?? "";
        const isAuthFlowEndpoint = requestUrl.includes(AUTH_FLOW_PATH_PREFIX);

        if (isAuthFlowEndpoint) {
            return Promise.reject(error);
        }

        if (status === 401) {
            clearAuthToken();
            toast({
                title: "Session expired",
                description: "Please log in again to continue.",
                variant: "destructive",
            });
            if (window.location.pathname !== "/login") {
                window.location.assign("/login");
            }
        } else if (status === 403) {
            const detail = (error.response?.data as { detail?: string } | undefined)?.detail;
            toast({
                title: "Access denied",
                description: detail ?? "You do not have permission to perform this action.",
                variant: "destructive",
            });
        }

        return Promise.reject(error);
    }
);

export default apiClient;
