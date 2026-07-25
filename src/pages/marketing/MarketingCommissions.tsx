import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { MarketingLineChartPanel } from "@/features/marketing/components/MarketingLineChartPanel"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { CommissionLinesTable } from "@/features/marketing/commissions/components/CommissionLinesTable"
import { useMarketerCommissions } from "@/features/marketing/api/useMarketer"
import { toDonutData } from "@/features/marketing/api/chartAdapters"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const MarketingCommissions = () => {
    const { data, isLoading } = useMarketerCommissions()

    const metrics: MetricCard[] = [
        {
            title: "Total Commission Earned",
            value: isLoading ? "—" : formatGbp(data?.total_commission_earned ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-secondary",
        },
        {
            title: "Pending Commission",
            value: isLoading ? "—" : formatGbp(data?.pending_commission ?? 0),
            period: "Awaiting approval/payment",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Paid Commission",
            value: isLoading ? "—" : formatGbp(data?.paid_commission ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Commissions" />

            <DashboardPageContent>
                <MetricCards metrics={metrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6 lg:gap-4">
                    <MarketingLineChartPanel
                        title="Commission Earned Over Time"
                        description="Monthly commission earned (£)"
                        data={data?.chart_data ?? []}
                        color="#4D66EA"
                        valueFormatter={formatGbp}
                        className="lg:col-span-4"
                    />
                    <DonutBreakdownPanel
                        title="Commission Tracker"
                        data={toDonutData(data?.donut_data ?? [])}
                        description="By status"
                        className="lg:col-span-2"
                    />
                </div>

                <CommissionLinesTable data={data?.commissions ?? []} isLoading={isLoading} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingCommissions
