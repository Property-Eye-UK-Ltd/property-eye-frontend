import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { MarketingBarChartPanel } from "@/features/marketing/components/MarketingBarChartPanel"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { PaymentsHistoryTable } from "@/features/marketing/payments/components/PaymentsHistoryTable"
import { useMarketerPayments } from "@/features/marketing/api/useMarketer"
import { toDonutData } from "@/features/marketing/api/chartAdapters"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const MarketingPayments = () => {
    const { data, isLoading } = useMarketerPayments()

    const metrics: MetricCard[] = [
        {
            title: "Total Paid Out",
            value: isLoading ? "—" : formatGbp(data?.total_paid_out ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
        {
            title: "Paid This Year",
            value: isLoading ? "—" : formatGbp(data?.paid_this_year ?? 0),
            period: "Current year",
            change: "",
            topBarClass: "bg-progress",
        },
        {
            title: "Pending Payout",
            value: isLoading ? "—" : formatGbp(data?.pending_payout ?? 0),
            period: "Awaiting payment",
            change: "",
            topBarClass: "bg-amber-500",
        },
    ]

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Payments" />

            <DashboardPageContent>
                <MetricCards metrics={metrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6 lg:gap-4">
                    <MarketingBarChartPanel
                        title="Payouts Over Time"
                        description="Monthly payout amount (£)"
                        data={data?.chart_data ?? []}
                        color="#22C55E"
                        valueFormatter={formatGbp}
                        className="lg:col-span-4"
                    />
                    <DonutBreakdownPanel
                        title="Payout Status"
                        data={toDonutData(data?.donut_data ?? [])}
                        description="Across all payout periods"
                        className="lg:col-span-2"
                    />
                </div>

                <PaymentsHistoryTable data={data?.payments ?? []} isLoading={isLoading} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingPayments
