import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { resolveOnboardingRoute } from "@/features/auth/onboardingStorage";

const ONBOARDING_ROUTES = new Set([
    "/verify-otp",
    "/agency-owner-info",
    "/agency-information",
]);

const ProtectedRoute = () => {
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

    // A session authenticates at any account status now (see
    // deps.get_current_active_user on the backend) — an agency user who's
    // mid-signup (status pending_verification/pending_profile) can reach a
    // dashboard route with a perfectly valid session, e.g. by navigating
    // directly to /dashboard after closing the signup tab. Send them back
    // to the exact onboarding step they left off at, from any entry point,
    // not just within the signup wizard's own next_step-driven navigation.
    if (
        user &&
        user.portal_context === "agency" &&
        user.status !== "active" &&
        user.onboarding_next_step &&
        !ONBOARDING_ROUTES.has(location.pathname)
    ) {
        return <Navigate to={resolveOnboardingRoute(user.onboarding_next_step)} replace />;
    }

    // Force a password change for invited team members still on their
    // temporary password before they can reach any other dashboard page.
    if (
        user &&
        user.must_change_password &&
        location.pathname !== "/dashboard/change-password"
    ) {
        return <Navigate to="/dashboard/change-password" replace />;
    }

    // Team Management and Account & Billing are agency_owner-only — keep
    // non-owners from landing on a page whose API calls will just 403.
    if (
        user &&
        user.portal_context === "agency" &&
        user.role !== "agency_owner" &&
        (location.pathname.startsWith("/dashboard/team") ||
            location.pathname.startsWith("/dashboard/billing"))
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
