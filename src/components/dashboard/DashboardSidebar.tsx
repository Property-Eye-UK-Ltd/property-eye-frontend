import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebarContext } from "./SidebarContext";
import {
    Book,
    Graph,
    Wallet1,
    Setting2,
    Headphone,
    Element2,
    People,
} from "iconsax-react";
import { DonutChart } from "@/components/ui/donut-chart";

interface NavItem {
    label: string;
    path: string;
    icon: React.ComponentType<{ size?: number | string; variant?: string; className?: string }>;
}

const navItems: NavItem[] = [
    { label: "Overview", path: "/dashboard", icon: Element2 },
    { label: "Case Management", path: "/dashboard/cases", icon: Book },
    { label: "Analytics & Reports", path: "/dashboard/analytics", icon: Graph },
    { label: "Team Management", path: "/dashboard/team", icon: People },
    { label: "Account & Billing", path: "/dashboard/billing", icon: Wallet1 },
];

const bottomNavItems: NavItem[] = [
    { label: "Settings", path: "/dashboard/settings", icon: Setting2 },
    { label: "Help Center", path: "/dashboard/help", icon: Headphone },
];

export const DashboardSidebar = () => {
    const location = useLocation();
    const { isCollapsed } = useSidebarContext();

    const isActive = (path: string) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname.startsWith(path);
    };

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
                    <Link to="/dashboard" className="flex items-center justify-center">
                        <img
                            src="/favicon.ico"
                            alt="Property Eye"
                            className="h-6 w-auto"
                        />
                    </Link>
                ) : (
                    /* When expanded: Show full logo */
                    <Link to="/dashboard" className="flex items-center gap-3">
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
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
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
                                        <Icon size={20} variant="Bulk" />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Settings and Help Center - Above separator */}
            <div className="px-3 pb-4">
                <ul className="space-y-1">
                    {bottomNavItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
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
                                        <Icon size={20} variant="Bulk" />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Separator */}
            <div className="border-t border-sidebar-border" />

            {/* Pro Plan Section */}
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
        </aside>
    );
};

