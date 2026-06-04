import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { MarketerFraudCasesTable } from "@/features/marketing/fraud-cases/components/MarketerFraudCasesTable"
import { marketerFraudCases, marketerFraudMetrics } from "@/data/marketing-data"

const MarketingFraudCases = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Fraud Cases" />

            <DashboardPageContent>
                <MetricCards metrics={marketerFraudMetrics} columns={3} />

                <MarketerFraudCasesTable data={marketerFraudCases} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingFraudCases
