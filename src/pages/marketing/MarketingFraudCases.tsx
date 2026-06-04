import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MarketerFraudCasesTable } from "@/features/marketing/fraud-cases/components/MarketerFraudCasesTable"
import { marketerFraudCases } from "@/data/marketing-data"

const MarketingFraudCases = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Fraud Cases" />

            <DashboardPageContent>
                <MarketerFraudCasesTable data={marketerFraudCases} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingFraudCases
