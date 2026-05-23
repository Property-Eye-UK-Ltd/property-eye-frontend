import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DashboardPageContentProps {
    children: ReactNode
    className?: string
}

export const DashboardPageContent = ({ children, className }: DashboardPageContentProps) => (
    <div
        className={cn(
            "mx-auto w-full max-w-7xl space-y-3 px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4 lg:space-y-6 lg:px-6 lg:py-6",
            className
        )}
    >
        {children}
    </div>
)
