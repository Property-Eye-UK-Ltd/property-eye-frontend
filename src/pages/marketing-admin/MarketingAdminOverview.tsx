import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { MarketingBarChartPanel } from "@/features/marketing/components/MarketingBarChartPanel"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { MarketerLeaderboardTable } from "@/features/marketing-admin/overview/components/MarketerLeaderboardTable"
import {
    marketingAdminMetrics,
    commissionLiabilityTrend,
    commissionLiabilityBreakdown,
    marketerLeaderboard,
} from "@/data/marketing-data"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const MarketingAdminOverview = () => {
    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader title="Control Tower" />

            <DashboardPageContent>
                <MetricCards metrics={marketingAdminMetrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6 lg:gap-4">
                    <MarketingBarChartPanel
                        title="Commission Liability Over Time"
                        description="Monthly commission accrued across all marketers (£)"
                        data={commissionLiabilityTrend}
                        color="#F59E0B"
                        valueFormatter={formatGbp}
                        className="lg:col-span-4"
                    />
                    <DonutBreakdownPanel
                        title="Liability Split"
                        data={commissionLiabilityBreakdown}
                        description="Across all marketers"
                        className="lg:col-span-2"
                    />
                </div>

                <MarketerLeaderboardTable data={marketerLeaderboard} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminOverview
