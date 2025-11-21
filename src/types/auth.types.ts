/**
 * Authentication Layout Types
 * 
 * Type definitions for the authentication layout system
 */

export interface AuthLayoutProps {
    /**
     * Content to be displayed on the left side of the layout
     */
    children: React.ReactNode;

    /**
     * Current step in the authentication flow (0-indexed)
     */
    currentStep: number;

    /**
     * Total number of steps in the authentication flow
     */
    totalSteps: number;

    /**
     * Image URL to display on the right side
     * @default undefined - will show primary brand color background
     */
    imageUrl?: string;

    /**
     * Alt text for the image
     */
    imageAlt?: string;

    /**
     * Optional heading to display above the progress bar
     */
    heading?: string;
}

export interface ProgressBarProps {
    /**
     * Current step (0-indexed)
     */
    currentStep: number;

    /**
     * Total number of steps
     */
    totalSteps: number;

    /**
     * Optional className for styling
     */
    className?: string;
}
