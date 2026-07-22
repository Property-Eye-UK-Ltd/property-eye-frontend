import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { DonutChart } from "@/components/ui/donut-chart"
import { getVisibleNavConfig, DashboardVariant } from "@/config/navigation"
import { useAuth } from "@/features/auth/context/AuthContext"

interface DashboardSidebarContentProps {
    variant?: DashboardVariant
    isCollapsed?: boolean
    onNavigate?: () => void
}

export const DashboardSidebarContent = ({
    variant = "agency",
    isCollapsed = false,
    onNavigate,
}: DashboardSidebarContentProps) => {
    const location = useLocation()
    const { user } = useAuth()
    const navConfig = getVisibleNavConfig(variant, user?.role)
    const homePath =
        variant === "super-admin"
            ? "/admin/dashboard"
            : variant === "marketer"
              ? "/marketing/dashboard"
              : "/dashboard"

    const isActive = (path: string) => {
        if (
            path === "/dashboard" ||
            path === "/admin/dashboard" ||
            path === "/marketing/dashboard"
        ) {
            return location.pathname === path
        }
        return location.pathname.startsWith(path)
    }

    const linkClassName = (active: boolean, collapsed: boolean) =>
        cn(
            "flex items-center gap-3 px-4 py-3 rounded-full transition-colors min-h-[44px]",
            collapsed && "justify-center",
            active
                ? "bg-secondary text-primary font-medium hover:bg-primary/90"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )

    let elapsedPercentage = 0
    if (user?.plan?.current_period_start && user?.plan?.current_period_end) {
        const start = new Date(user.plan.current_period_start).getTime()
        const end = new Date(user.plan.current_period_end).getTime()
        const now = Date.now()
        if (end > start) {
            elapsedPercentage = Math.max(0, Math.min(100, Math.round(((now - start) / (end - start)) * 100)))
        }
    }

    return (
        <>
            <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "")}>
                {isCollapsed ? (
                    <Link
                        to={homePath}
                        onClick={onNavigate}
                        className="flex items-center justify-center"
                    >
                        <img src="/favicon.ico" alt="Property Eye" className="h-6 w-auto" />
                    </Link>
                ) : (
                    <Link to={homePath} onClick={onNavigate} className="flex items-center gap-3">
                        <img src="/assets/logo.svg" alt="Property Eye" className="h-8 w-auto" />
                    </Link>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {navConfig.mainItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={onNavigate}
                                    className={linkClassName(active, isCollapsed)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div
                                        className="flex-shrink-0"
                                        style={{
                                            color: active ? "var(--primary)" : "var(--progress)",
                                        }}
                                    >
                                        <Icon size={20} variant={item.variant || "Bulk"} />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {variant === "super-admin" && (
                <div className="border-t border-sidebar-border" />
            )}

            <div className="px-3 py-4">
                <ul className="space-y-1">
                    {navConfig.bottomItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={onNavigate}
                                    className={linkClassName(active, isCollapsed)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <div
                                        className="flex-shrink-0"
                                        style={{
                                            color: active ? "var(--primary)" : "var(--progress)",
                                        }}
                                    >
                                        <Icon size={20} variant={item.variant || "Bulk"} />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {navConfig.showProCard && (
                <>
                    <div className="border-t border-sidebar-border" />
                    {isCollapsed ? (
                        <div className="p-4 flex justify-center">
                            <div className="bg-white rounded-xl p-3 flex items-center justify-center" title={user?.plan?.name ?? "No Plan"}>
                                <DonutChart value={elapsedPercentage} size={25} strokeWidth={3} />
                            </div>
                        </div>
                    ) : (
                        <div className="px-3 py-2">
                            <div className="bg-white rounded-xl p-3">
                                <h3 className="text-xs font-semibold text-primary mb-1">
                                    {user?.plan?.name ?? "No Plan"}
                                </h3>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex-1">
                                        <p className="text-[10px] text-muted-foreground leading-tight">
                                            {user?.plan?.cancel_at_period_end
                                                ? "Access ends:"
                                                : "Next billing date:"}{" "}
                                            <span className="font-medium text-foreground">
                                                {user?.plan?.current_period_end
                                                    ? new Date(user.plan.current_period_end).toLocaleDateString(
                                                          "en-US",
                                                          { month: "short", day: "numeric", year: "numeric" }
                                                      )
                                                    : "N/A"}
                                            </span>
                                        </p>
                                    </div>
                                    <DonutChart value={elapsedPercentage} size={20} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
