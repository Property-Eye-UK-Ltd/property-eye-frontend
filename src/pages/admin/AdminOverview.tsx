import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { CaseQueuePanel } from "@/features/admin/components/CaseQueuePanel"
import { MostCommonFraudTypesPanel } from "@/features/analytics/components/MostCommonFraudTypesPanel"
import {
    adminMetrics,
    adminRevenueData,
    adminCaseQueueData,
    adminSeverityStyles,
    adminFraudTypeStyles,
    adminUsersActivityData,
    adminChartConfig,
    adminFraudDetectionData,
    adminFraudDetectionConfig,
    adminSeverityData,
    adminFraudTypesData,
    adminFraudTypesConfig,
} from "@/data/adminOverviewData"

const periods = ["All Time", "This Month", "Last Week"]

const AdminOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Overview"
                actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={adminMetrics} />

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
                        fraudTypeStyles={adminFraudTypeStyles}
                    />
                    <CommissionBreakdownPanel
                        title="Subscription Revenue Breakdown"
                        data={adminRevenueData}
                        chartSize={220}
                    />
                </div>

                {/* Fraud Detection Over Time */}
                <FraudDetectionPanel
                    title="Fraud Detection Over Time"
                    data={adminFraudDetectionData}
                    config={adminFraudDetectionConfig}
                />

                {/* Severity Distribution & Most Common Fraud Types */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <CommissionBreakdownPanel
                        title="Severity Distribution"
                        data={adminSeverityData}
                        chartSize={200}
                    />
                    <div className="lg:col-span-3">
                        <MostCommonFraudTypesPanel
                            data={adminFraudTypesData}
                            config={adminFraudTypesConfig}
                            height={320}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminOverview
