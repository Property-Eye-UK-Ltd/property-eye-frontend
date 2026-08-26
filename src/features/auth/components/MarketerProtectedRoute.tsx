import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { resolveMarketerOnboardingRoute } from "@/features/auth/marketerOnboardingStorage";

const MARKETER_ONBOARDING_ROUTES = new Set([
    "/marketer-verify-otp",
    "/marketer-profile",
    "/marketer-referral-link",
]);

const MarketerProtectedRoute = () => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // A logged-in agency/admin user hitting a /marketing/* route directly
    // must not see marketer pages, even though they're authenticated elsewhere.
    if (user && user.portal_context !== "marketer") {
        return <Navigate to="/login" replace />;
    }

    // Same reasoning as ProtectedRoute: a session now authenticates at any
    // account status, so a mid-signup marketer with a valid session can
    // reach a /marketing/* route directly — send them back to the right
    // onboarding step instead.
    if (
        user &&
        user.status !== "active" &&
        user.onboarding_next_step &&
        !MARKETER_ONBOARDING_ROUTES.has(location.pathname)
    ) {
        return <Navigate to={resolveMarketerOnboardingRoute(user.onboarding_next_step)} replace />;
    }

    return <Outlet />;
};

export default MarketerProtectedRoute;
