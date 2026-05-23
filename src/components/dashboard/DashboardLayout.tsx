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
    const { isCollapsed, isDesktop } = useSidebarContext()

    return (
        <div className="min-h-[100dvh] flex">
            <DashboardSidebar variant={variant} />

            <div
                className={cn(
                    "flex flex-1 flex-col min-w-0 transition-all duration-300 min-h-[100dvh] h-[100dvh] overflow-hidden",
                    isDesktop && (isCollapsed ? "lg:ml-20" : "lg:ml-64")
                )}
            >
                <DashboardHeader variant={variant} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-page-background">
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
