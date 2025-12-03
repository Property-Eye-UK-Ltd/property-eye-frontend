import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useSidebarContext } from "./SidebarContext"
import { DonutChart } from "@/components/ui/donut-chart"
import { getNavConfig } from "@/config/navigation"

interface DashboardSidebarProps {
    variant?: "agency" | "super-admin"
}

export const DashboardSidebar = ({ variant = "agency" }: DashboardSidebarProps) => {
    const location = useLocation()
    const { isCollapsed } = useSidebarContext()
    const navConfig = getNavConfig(variant)

    const isActive = (path: string) => {
        // For dashboard/overview pages
        if (path === "/dashboard" || path === "/admin/dashboard") {
            return location.pathname === path
        }
        return location.pathname.startsWith(path)
    }

    return (
        <aside
            className={cn(
                "bg-primary text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-10",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Logo Section */}
            <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "")}>
                {isCollapsed ? (
                    /* When collapsed: Show favicon */
                    <Link to={variant === "super-admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center justify-center">
                        <img
                            src="/favicon.ico"
                            alt="Property Eye"
                            className="h-6 w-auto"
                        />
                    </Link>
                ) : (
                    /* When expanded: Show full logo */
                    <Link to={variant === "super-admin" ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-3">
                        <img
                            src="/assets/logo.svg"
                            alt="Property Eye"
                            className="h-8 w-auto"
                        />
                    </Link>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {navConfig.mainItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-full transition-colors",
                                        isCollapsed && "justify-center",
                                        active
                                            ? "bg-secondary text-primary font-medium hover:bg-primary/90"
                                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div className="flex-shrink-0" style={{ color: active ? "var(--primary)" : "var(--progress)" }}>
                                        <Icon size={20} variant={item.variant || "Bulk"} />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Separator - Only for Super Admin */}
            {variant === "super-admin" && <div className="border-t border-sidebar-border" />}

            {/* Bottom Navigation Items (Settings, etc.) */}
            <div className="px-3 py-4">
                <ul className="space-y-1">
                    {navConfig.bottomItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-full transition-colors",
                                        isCollapsed && "justify-center",
                                        active
                                            ? "bg-secondary text-primary font-medium hover:bg-primary/90"
                                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div className="flex-shrink-0" style={{ color: active ? "var(--primary)" : "var(--progress)" }}>
                                        <Icon size={20} variant={item.variant || "Bulk"} />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Pro Plan Section - Only for Agency Admin */}
            {navConfig.showProCard && (
                <>
                    {/* Separator before Pro Card */}
                    <div className="border-t border-sidebar-border" />

                    {isCollapsed ? (
                        <div className="p-4 flex justify-center">
                            <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                                <DonutChart value={75} size={25} strokeWidth={3} />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="bg-white rounded-xl p-4">
                                <h3 className="text-sm font-medium text-primary mb-3">Pro Plan</h3>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground">
                                            Next billing date: <span className="font-medium text-foreground">Nov 29, 2025</span>
                                        </p>
                                    </div>
                                    <DonutChart value={75} size={25} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </aside>
    )
}
