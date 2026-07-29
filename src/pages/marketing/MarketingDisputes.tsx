import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { ContactSupportPanel } from "@/features/marketing/support/components/ContactSupportPanel"

const MarketingDisputes = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Disputes" />

            <DashboardPageContent>
                <ContactSupportPanel
                    title="Raise a Dispute"
                    description="Attribution and commission disputes are reviewed and resolved by our support team directly, not through the app."
                    hideDetails={true}
                />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingDisputes
