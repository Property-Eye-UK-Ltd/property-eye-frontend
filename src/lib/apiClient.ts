import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { subscriptionGateEvents } from "@/lib/subscriptionGateEvents";

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

// Exact detail string raised by resolve_user_from_access_token when
// User.status != "active" (backend/src/services/auth_service.py). This check
// runs on every authenticated request, not just login, so an already-logged-in
// user who gets suspended mid-session must be logged out on their very next
// call — distinct from an ordinary 403 (e.g. wrong role for an endpoint),
// which should stay on the page and just show a toast.
const SUSPENDED_ACCOUNT_DETAIL = "User account is not active";

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url ?? "";
        const isAuthFlowEndpoint = requestUrl.includes(AUTH_FLOW_PATH_PREFIX);

        if (isAuthFlowEndpoint) {
            return Promise.reject(error);
        }

        const detail = (error.response?.data as { detail?: string } | undefined)?.detail;
        const isSuspendedAccount = status === 403 && detail === SUSPENDED_ACCOUNT_DETAIL;

        if (status === 401 || isSuspendedAccount) {
            clearAuthToken();
            toast({
                title: isSuspendedAccount ? "Account suspended" : "Session expired",
                description: isSuspendedAccount
                    ? "Your account has been suspended. Contact support if you believe this is a mistake."
                    : "Please log in again to continue.",
                variant: "destructive",
            });
            if (window.location.pathname !== "/login") {
                window.location.assign("/login");
            }
        } else if (status === 403) {
            toast({
                title: "Access denied",
                description: detail ?? "You do not have permission to perform this action.",
                variant: "destructive",
            });
        } else if (status === 402) {
            subscriptionGateEvents.emit();
        }

        return Promise.reject(error);
    }
);

export default apiClient;
