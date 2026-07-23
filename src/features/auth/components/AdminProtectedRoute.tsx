import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const AdminProtectedRoute = () => {
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
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // A logged-in agency/marketer user hitting an /admin/* route directly
    // must not see admin pages, even though they're authenticated elsewhere.
    if (user && user.portal_context !== "admin") {
        return <Navigate to="/admin/login" replace />;
    }

    // Force a password change for newly-invited admin users still on their
    // temporary password before they can reach any other admin page.
    if (
        user &&
        user.must_change_password &&
        location.pathname !== "/admin/change-password"
    ) {
        return <Navigate to="/admin/change-password" replace />;
    }

    // Official Records (PPD uploads) is superadmin-only — analyst/viewer
    // admin-portal roles must not reach it, even via a direct URL.
    if (
        user &&
        user.role !== "superadmin" &&
        location.pathname.startsWith("/admin/ppd-records")
    ) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
