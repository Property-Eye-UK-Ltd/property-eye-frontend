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
import { cn } from "@/lib/utils";

export const AuthLayout = ({
    children,
    currentStep,
    totalSteps,
    imageUrl,
    imageAlt = "Property Eye Authentication",
    heading,
}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Content Area */}
            <div className="flex-1 flex flex-col bg-background">
                <div className="flex-1 flex flex-col p-6 md:p-12 lg:p-16 max-w-2xl mx-auto w-full">
                    {/* Logo */}
                    <div className="mb-8 lg:mb-12">
                        <img
                            src="/assets/logo.svg"
                            alt="Property Eye Logo"
                            className="h-8 md:h-10"
                        />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8 lg:mb-12">
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

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col">
                        {children}
                    </div>

                    {/* Footer - Optional */}
                    <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center">
                            © {new Date().getFullYear()} Property Eye. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Brand Area */}
            <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
                {imageUrl ? (
                    <div className="relative w-full h-full">
                        {/* Background overlay for better image visibility */}
                        <div className="absolute inset-0 bg-primary/20 z-10" />

                        {/* Image */}
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    /* Fallback: Brand color with pattern/gradient */
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-6 p-12">
                            {/* Logo in white */}
                            <div className="flex justify-center opacity-20">
                                <img
                                    src="/assets/logo.svg"
                                    alt="Property Eye"
                                    className="h-24 brightness-0 invert"
                                />
                            </div>

                            {/* Tagline */}
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-white">
                                    Digital Watchdog
                                </h3>
                                <p className="text-lg text-white/80">
                                    Protecting Your Commissions
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
