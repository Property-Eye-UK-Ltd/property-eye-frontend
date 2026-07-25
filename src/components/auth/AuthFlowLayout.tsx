import { Outlet, useLocation } from "react-router-dom"
import { AuthLayout } from "./AuthLayout"

export const AuthFlowLayout = () => {
    const location = useLocation()
    const path = location.pathname

    // Determine if this is super admin auth
    const isSuperAdmin = path.startsWith("/admin")
    const isMarketer = path.startsWith("/marketer-")

    // Determine current step based on path
    let currentStep = 0
    if (path === "/verify-otp" || path === "/marketer-verify-otp") currentStep = 1
    else if (path === "/agency-owner-info" || path === "/marketer-profile") currentStep = 2
    else if (path === "/agency-information" || path === "/marketer-referral-link") currentStep = 3

    return (
        <AuthLayout
            currentStep={currentStep}
            totalSteps={4}
            variant={isSuperAdmin ? "super-admin" : isMarketer ? "marketer" : "agency"}
            showProgress={!isSuperAdmin} // Hide progress bar for super admin
        >
            <Outlet />
        </AuthLayout>
    )
}
