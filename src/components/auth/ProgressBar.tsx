/**
 * ProgressBar Component
 * 
 * Displays a horizontal progress bar indicating the current step in a multi-step process.
 * Uses the dedicated progress color (#4D66EA) for the active progress.
 */

import { cn } from "@/lib/utils";
import { ProgressBarProps } from "@/types/auth.types";

export const ProgressBar = ({
    currentStep,
    totalSteps,
    className
}: ProgressBarProps) => {
    // Calculate progress percentage (0-100)
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className={cn("w-full", className)}>
            {/* Progress bar container */}
            <div className="relative h-1 w-full bg-border rounded-full overflow-hidden">
                {/* Active progress indicator */}
                <div
                    className="absolute top-0 left-0 h-full bg-progress transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                    role="progressbar"
                    aria-valuenow={currentStep + 1}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
                />
            </div>
        </div>
    );
};
