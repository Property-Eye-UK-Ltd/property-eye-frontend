import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MarketerAgenciesTable } from "@/features/marketing/agencies/components/MarketerAgenciesTable"
import { marketerAgencies } from "@/data/marketing-data"

const MarketingAgencies = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="My Agencies" />

            <DashboardPageContent>
                <MarketerAgenciesTable data={marketerAgencies} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencies
