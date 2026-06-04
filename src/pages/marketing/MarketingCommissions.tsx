import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { MarketingLineChartPanel } from "@/features/marketing/components/MarketingLineChartPanel"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { CommissionLinesTable } from "@/features/marketing/commissions/components/CommissionLinesTable"
import {
    marketerCommissionMetrics,
    commissionEarningsTrend,
    commissionTracker,
    commissionTrackerTotalLabel,
    commissionLines,
} from "@/data/marketing-data"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const MarketingCommissions = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Commissions" />

            <DashboardPageContent>
                <MetricCards metrics={marketerCommissionMetrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6 lg:gap-4">
                    <MarketingLineChartPanel
                        title="Commission Earned Over Time"
                        description="Monthly commission earned (£)"
                        data={commissionEarningsTrend}
                        color="#4D66EA"
                        valueFormatter={formatGbp}
                        className="lg:col-span-4"
                    />
                    <DonutBreakdownPanel
                        title="Commission Tracker"
                        data={commissionTracker}
                        description={commissionTrackerTotalLabel}
                        className="lg:col-span-2"
                    />
                </div>

                <CommissionLinesTable data={commissionLines} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingCommissions
