import { useLocation } from "react-router-dom"
import { Monitor } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { marketingAdminNavConfig } from "@/config/navigation"

const MarketingAdminComingSoon = () => {
    const location = useLocation()
    const navItems = [...marketingAdminNavConfig.mainItems, ...marketingAdminNavConfig.bottomItems]
    const activeItem = navItems.find((item) => location.pathname.startsWith(item.path))
    const title = activeItem?.label ?? "Control Tower"

    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader title={title} />

            <DashboardPageContent>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
                        <Monitor size={40} variant="Bulk" className="text-primary" />
                    </div>
                    <div className="mt-6 max-w-sm space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Coming Soon</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            The {title} workspace is being built. The Control Tower overview is ready
                            to explore in the meantime.
                        </p>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminComingSoon
