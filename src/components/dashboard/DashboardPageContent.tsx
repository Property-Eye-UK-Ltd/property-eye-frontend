import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DashboardPageContentProps {
    children: ReactNode
    className?: string
}

export const DashboardPageContent = ({ children, className }: DashboardPageContentProps) => (
    <div
        className={cn(
            "mx-auto w-full max-w-[1600px] space-y-3 px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4 lg:space-y-4 lg:px-4 lg:py-4",
            className
        )}
    >
        {children}
    </div>
)
