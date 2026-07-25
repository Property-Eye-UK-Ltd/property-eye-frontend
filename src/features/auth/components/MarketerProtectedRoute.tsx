import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

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

    return <Outlet />;
};

export default MarketerProtectedRoute;
