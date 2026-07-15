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

const AUTH_ENDPOINTS_EXEMPT_FROM_REDIRECT = ["/auth/login", "/auth/refresh"];

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url ?? "";
        const isExemptEndpoint = AUTH_ENDPOINTS_EXEMPT_FROM_REDIRECT.some((path) =>
            requestUrl.includes(path)
        );

        if (status === 401 && !isExemptEndpoint) {
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
