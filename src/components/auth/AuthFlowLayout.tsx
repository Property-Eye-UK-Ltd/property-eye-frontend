import { Outlet, useLocation } from "react-router-dom"
import { AuthLayout } from "./AuthLayout"

export const AuthFlowLayout = () => {
    const location = useLocation()
    const path = location.pathname

    // Determine if this is super admin auth
    const isSuperAdmin = path.startsWith("/admin")

    // Determine current step based on path
    let currentStep = 0
    if (path === "/verify-otp") currentStep = 1
    else if (path === "/agency-owner-info") currentStep = 2
    else if (path === "/agency-information") currentStep = 3

    return (
        <AuthLayout
            currentStep={currentStep}
            totalSteps={4}
            variant={isSuperAdmin ? "super-admin" : "agency"}
            showProgress={!isSuperAdmin} // Hide progress bar for super admin
        >
            <Outlet />
        </AuthLayout>
    )
}
