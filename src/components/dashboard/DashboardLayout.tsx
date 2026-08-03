import { ReactNode } from "react"
// import { useLocation } from "react-router-dom"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardHeader } from "./DashboardHeader"
// import { SubscriptionBanner } from "./SubscriptionBanner"
import { SidebarProvider, useSidebarContext } from "./SidebarContext"
import { cn } from "@/lib/utils"
import { DashboardVariant } from "@/config/navigation"
// import { useAuth } from "@/features/auth/context/AuthContext"

interface DashboardLayoutProps {
    children: ReactNode
    variant?: DashboardVariant
}

const DashboardLayoutContent = ({ children, variant = "agency" }: DashboardLayoutProps) => {
    const { isCollapsed, isDesktop } = useSidebarContext()

    // WARNING: SubscriptionBanner disabled while subscriptions are
    // disconnected from the critical path — see
    // backend/src/api/deps.py has_active_subscription(). Original:
    //   const { user } = useAuth(); const location = useLocation();
    //   const showSubscriptionBanner = variant === "agency" && user?.portal_context
    //     === "agency" && !user.plan && !location.pathname.startsWith("/dashboard/billing")
    //   {showSubscriptionBanner && <SubscriptionBanner />}

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
