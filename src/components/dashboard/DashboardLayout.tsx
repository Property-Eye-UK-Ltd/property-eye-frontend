import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { SidebarProvider, useSidebarContext } from "./SidebarContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayoutContent = ({ children }: DashboardLayoutProps) => {
    const { isCollapsed } = useSidebarContext();

    return (
        <div className="min-h-screen flex">
            {/* Sidebar - Fixed */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div
                className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300 h-screen overflow-hidden",
                    isCollapsed ? "ml-20" : "ml-64"
                )}
            >
                {/* Dashboard Header - Sticky */}
                <DashboardHeader />

                {/* Page Content - Scrollable (children includes PageHeader) */}
                <main className="flex-1 overflow-y-auto bg-page-background">
                    {children}
                </main>
            </div>
        </div>
    );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </SidebarProvider>
    );
};

