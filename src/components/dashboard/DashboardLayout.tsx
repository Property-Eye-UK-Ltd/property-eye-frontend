import { ReactNode } from "react"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardHeader } from "./DashboardHeader"
import { SidebarProvider, useSidebarContext } from "./SidebarContext"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
    children: ReactNode
    variant?: "agency" | "super-admin"
}

const DashboardLayoutContent = ({ children, variant = "agency" }: DashboardLayoutProps) => {
    const { isCollapsed } = useSidebarContext()

    return (
        <div className="min-h-screen flex">
            {/* Sidebar - Fixed */}
            <DashboardSidebar variant={variant} />

            {/* Main Content Area */}
            <div
                className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300 h-screen overflow-hidden",
                    isCollapsed ? "ml-20" : "ml-64"
                )}
            >
                {/* Dashboard Header - Sticky */}
                <DashboardHeader variant={variant} />

                {/* Page Content - Scrollable (children includes PageHeader) */}
                <main className="flex-1 overflow-y-auto bg-page-background">
                    {children}
                </main>
            </div>
        </div>
    )
}

export const DashboardLayout = ({ children, variant = "agency" }: DashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <DashboardLayoutContent variant={variant}>{children}</DashboardLayoutContent>
        </SidebarProvider>
    )
}
