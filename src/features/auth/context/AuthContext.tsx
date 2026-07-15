import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getAuthToken, setAuthToken, clearAuthToken } from "@/lib/apiClient";
import * as authService from "@/features/auth/api/authService";
import type { AuthLoginResponse, AuthMeResponse } from "@/types/auth.types";

interface AuthContextValue {
    user: AuthMeResponse | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    applyAuthSession: (data: AuthLoginResponse) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const toUserSummary = (data: AuthMeResponse): AuthMeResponse => {
    const { ...user } = data;
    return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthMeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hydrate = async () => {
            const token = getAuthToken();
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const me = await authService.getMe();
                setUser(me);
            } catch {
                clearAuthToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        hydrate();
    }, []);

    const applyAuthSession = useCallback((data: AuthLoginResponse) => {
        setAuthToken(data.access_token, data.expires_in);
        setUser(toUserSummary(data));
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            const data = await authService.login({ email, password });
            applyAuthSession(data);
        },
        [applyAuthSession]
    );

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            clearAuthToken();
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                login,
                logout,
                applyAuthSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};
