import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

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
