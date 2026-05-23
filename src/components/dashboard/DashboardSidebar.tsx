import { cn } from "@/lib/utils"
import { useSidebarContext } from "./SidebarContext"
import { DashboardSidebarContent } from "./DashboardSidebarContent"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardSidebarProps {
    variant?: "agency" | "super-admin"
}

export const DashboardSidebar = ({ variant = "agency" }: DashboardSidebarProps) => {
    const { isCollapsed, isMobileNavOpen, setIsMobileNavOpen, isDesktop } = useSidebarContext()

    const closeMobileNav = () => setIsMobileNavOpen(false)

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "bg-primary text-sidebar-foreground flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-30",
                    "hidden lg:flex",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                <DashboardSidebarContent variant={variant} isCollapsed={isCollapsed} />
            </aside>

            {/* Mobile drawer — only mount interaction when not desktop */}
            {!isDesktop && (
                <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                    <SheetContent
                        side="left"
                        className={cn(
                            "w-[min(280px,85vw)] max-w-[85vw] p-0 gap-0 border-0 bg-primary text-sidebar-foreground",
                            "flex flex-col h-full [&>button]:text-sidebar-foreground [&>button]:hover:text-sidebar-foreground/80"
                        )}
                    >
                        <div className="flex flex-col h-full overflow-hidden">
                            <DashboardSidebarContent
                                variant={variant}
                                isCollapsed={false}
                                onNavigate={closeMobileNav}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </>
    )
}
