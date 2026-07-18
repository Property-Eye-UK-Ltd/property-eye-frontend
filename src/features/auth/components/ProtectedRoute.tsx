import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
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

    const { user } = useAuth();

    // Smartly redirect unsubscribed/inactive agency users to the subscription plans view.
    // Allows them to access billing paths (like /dashboard/billing/plans) to complete signup.
    if (
        user &&
        user.portal_context === "agency" &&
        !user.plan &&
        !location.pathname.startsWith("/dashboard/billing")
    ) {
        return <Navigate to="/dashboard/billing/plans" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
