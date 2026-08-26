import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
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

// One session mechanism for the whole account lifecycle — mid-onboarding
// (status pending_verification/pending_profile) and fully active users carry
// the exact same access_token cookie + httpOnly refresh_token cookie; the
// backend gates what each status is allowed to do, not the token shape. There
// is deliberately no separate onboarding-token cookie/path-matching here.
apiClient.interceptors.request.use((config) => {
    if (config.headers.Authorization) {
        return config;
    }
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

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retriedAfterRefresh?: boolean };

// The backend issues a 15-minute access token (ACCESS_TOKEN_EXPIRE_MINUTES)
// backed by a 7-day httpOnly refresh-token cookie (REFRESH_TOKEN_EXPIRE_DAYS)
// that's meant to renew it transparently — but nothing ever called
// POST /auth/refresh, so every access token's 401 was treated as a dead
// session and the user was logged out and bounced to /login every 15
// minutes in production, even with hours left on their actual session.
// This single in-flight refresh call, shared across every request that hits
// a 401 at once, restores that renewal.
let refreshInFlight: Promise<string | null> | null = null;

const performRefresh = async (): Promise<string | null> => {
    try {
        const { data } = await apiClient.post("/auth/refresh");
        setAuthToken(data.access_token, data.expires_in);
        return data.access_token as string;
    } catch {
        return null;
    }
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url ?? "";
        const isAuthFlowEndpoint = requestUrl.includes(AUTH_FLOW_PATH_PREFIX);

        if (isAuthFlowEndpoint) {
            return Promise.reject(error);
        }

        const detail = (error.response?.data as { detail?: string } | undefined)?.detail;
        const isSuspendedAccount = status === 403 && detail === SUSPENDED_ACCOUNT_DETAIL;

        if (status === 401) {
            const config = error.config as RetriableRequestConfig | undefined;
            // Only ever retry once per request — if the refreshed token also
            // 401s, the refresh-token cookie itself is dead/expired, so fall
            // through to the real "session expired" logout below instead of
            // looping.
            if (config && !config._retriedAfterRefresh && getAuthToken()) {
                config._retriedAfterRefresh = true;
                refreshInFlight ??= performRefresh().finally(() => {
                    refreshInFlight = null;
                });
                const newToken = await refreshInFlight;
                if (newToken) {
                    config.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient.request(config);
                }
            }

            clearAuthToken();
            toast({
                title: "Session expired",
                description: "Please log in again to continue.",
                variant: "destructive",
            });
            if (window.location.pathname !== "/login") {
                window.location.assign("/login");
            }
        } else if (isSuspendedAccount) {
            clearAuthToken();
            toast({
                title: "Account suspended",
                description: "Your account has been suspended. Contact support if you believe this is a mistake.",
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
