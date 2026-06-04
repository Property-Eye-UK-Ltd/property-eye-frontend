import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { MarketingBarChartPanel } from "@/features/marketing/components/MarketingBarChartPanel"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { PaymentsHistoryTable } from "@/features/marketing/payments/components/PaymentsHistoryTable"
import {
    marketerPaymentMetrics,
    paymentsTrend,
    paymentStatusBreakdown,
    payments,
} from "@/data/marketing-data"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const MarketingPayments = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Payments" />

            <DashboardPageContent>
                <MetricCards metrics={marketerPaymentMetrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6 lg:gap-4">
                    <MarketingBarChartPanel
                        title="Payouts Over Time"
                        description="Monthly payout amount (£)"
                        data={paymentsTrend}
                        color="#22C55E"
                        valueFormatter={formatGbp}
                        className="lg:col-span-4"
                    />
                    <DonutBreakdownPanel
                        title="Payout Status"
                        data={paymentStatusBreakdown}
                        description="Across all payout periods"
                        className="lg:col-span-2"
                    />
                </div>

                <PaymentsHistoryTable data={payments} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingPayments
