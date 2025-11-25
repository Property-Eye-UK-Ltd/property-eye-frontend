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
                {/* Text and Image Container - Bottom Right Aligned */}
                <div className="absolute bottom-0 right-0 flex flex-col items-end">
                    {/* Text - Above Image, Left Aligned */}
                    <div className="mb-10 self-start">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight">
                            Your Gateway to{" "}
                            <span className="text-secondary">Fraud-Free</span>
                            <br />
                            Property Operations.
                        </h1>
                    </div>

                    {/* Dashboard Preview Image */}
                    <img
                        src="/assets/auth/layout.png"
                        alt="Dashboard Preview"
                        className="max-w-full h-auto object-contain"
                        style={{ maxHeight: "60vh", maxWidth: "80vw" }}
                    />
                </div>
            </div>
        </div>
    );
};
