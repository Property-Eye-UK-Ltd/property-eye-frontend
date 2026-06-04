import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionSummaryCards } from "@/features/marketing/overview/components/CommissionSummaryCards"
import { marketerCommissionMetrics, commissionSummary } from "@/data/marketing-data"

const MarketingCommissions = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Commissions" />

            <DashboardPageContent>
                <MetricCards metrics={marketerCommissionMetrics} columns={3} />

                <CommissionSummaryCards data={commissionSummary} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingCommissions
