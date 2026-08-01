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
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // A logged-in agency/marketer user hitting an /admin/* route directly
    // must not see admin pages, even though they're authenticated elsewhere.
    if (user && user.portal_context !== "admin") {
        return <Navigate to="/login" replace />;
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

    // Official Records (PPD uploads) and Team Management are superadmin-only
    // (backend/src/api/v1/endpoints/ppd_upload.py, dashboard.py /admin/team/*)
    // — analyst/viewer admin-portal roles must not reach them, even via a
    // direct URL.
    if (
        user &&
        user.role !== "superadmin" &&
        (location.pathname.startsWith("/admin/ppd-records") ||
            location.pathname.startsWith("/admin/team"))
    ) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
