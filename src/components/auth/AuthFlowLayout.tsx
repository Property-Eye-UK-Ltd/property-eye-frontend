import { Outlet, useLocation } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";

export const AuthFlowLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    // Determine current step based on path
    let currentStep = 0;
    if (path === "/verify-otp") currentStep = 1;
    else if (path === "/agency-owner-info") currentStep = 2;
    else if (path === "/agency-information") currentStep = 3;

    // Determine heading based on step
    let heading = "";
    // We can customize heading per step if needed, or let the pages handle their own headings
    // The AuthLayout accepts a heading prop for the progress bar section if we want one there.

    return (
        <AuthLayout
            currentStep={currentStep}
            totalSteps={4}
        // We can pass dynamic props here if needed
        >
            <Outlet />
        </AuthLayout>
    );
};
