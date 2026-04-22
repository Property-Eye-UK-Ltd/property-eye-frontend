import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { CaseQueuePanel } from "@/features/admin/components/CaseQueuePanel"
import { FraudDistributionPanel } from "@/features/overview/components/FraudDistributionPanel"
import { AnnualChecksTable } from "@/features/overview/components/AnnualChecksTable"
import {
    adminMetricsData,
    adminRevenueData,
    adminCaseQueueData,
    adminSeverityStyles,
    adminUsersActivityData,
    adminChartConfig,
    adminFraudGrowthData,
    adminFraudGrowthConfig,
    adminSeverityData,
    fraudDistributionData,
    annualChecksData,
} from "@/data/adminOverviewData"

const periods = ["All Time", "This Month", "Last Week"]

const AdminOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Overview"
                actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
                showSweepCountdown={true}
            />

            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={adminMetricsData[selectedPeriod]} />

                {/* Users Activity Chart */}
                <FraudDetectionPanel
                    title="Users Activity"
                    data={adminUsersActivityData}
                    config={adminChartConfig}
                    showCategoryFilter={false}
                />

                {/* Case Queue & Revenue Breakdown */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <CaseQueuePanel
                        data={adminCaseQueueData}
                        severityStyles={adminSeverityStyles}
                    />
                    <CommissionBreakdownPanel
                        title="Subscription Revenue Breakdown"
                        data={adminRevenueData}
                        chartSize={220}
                    />
                </div>

                {/* Fraud Distribution Chart & Severity Distribution */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <FraudDistributionPanel
                        title="Fraud Distribution"
                        data={fraudDistributionData}
                    />
                    <div className="lg:col-span-3">
                        <CommissionBreakdownPanel
                            title="Severity Distribution"
                            data={adminSeverityData}
                            chartSize={220}
                            isWide={true}
                        />
                    </div>
                </div>

                {/* Annual Checks Breakdown Table */}
                <AnnualChecksTable data={annualChecksData} />

                {/* Fraud Detection Over Time -> Replaced with Yearly Growth (No filters) */}
                <FraudDetectionPanel
                    title="Fraud Detection Growth"
                    data={adminFraudGrowthData}
                    config={adminFraudGrowthConfig}
                    showCategoryFilter={false}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminOverview
