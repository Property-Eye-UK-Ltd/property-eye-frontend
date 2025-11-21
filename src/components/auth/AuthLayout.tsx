/**
 * AuthLayout Component
 * 
 * Enterprise-level authentication layout with split-screen design.
 * 
 * Layout Structure:
 * - Left Side (50%): Content area with progress bar at top
 * - Right Side (50%): Image with primary brand color background
 * 
 * Features:
 * - Responsive design (stacks on mobile)
 * - Progress tracking
 * - Branded styling
 * - Accessible markup
 */

import { AuthLayoutProps } from "@/types/auth.types";
import { ProgressBar } from "./ProgressBar";

export const AuthLayout = ({
    children,
    currentStep,
    totalSteps,
    imageUrl,
    imageAlt = "Property Eye Authentication",
    heading,
    showProgress = true,
}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Content Area */}
            <div className="flex-1 flex flex-col bg-background">
                {/* Progress Bar - Fixed at top of flow */}
                {showProgress && (
                    <div className="w-full max-w-2xl mx-auto p-6 md:p-12 lg:p-16 pb-0">
                        {heading && (
                            <h2 className="text-sm font-medium text-muted-foreground mb-4">
                                {heading}
                            </h2>
                        )}
                        <ProgressBar
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                        />
                    </div>
                )}

                {/* Main Content Area - Centered */}
                <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-16 max-w-2xl mx-auto w-full justify-center">
                    <div className="flex flex-col w-full">
                        {children}
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Brand Area */}
            <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
                {/* Content removed as requested */}
            </div>
        </div>
    );
};
