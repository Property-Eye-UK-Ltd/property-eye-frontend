import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { ResponsivePanelGroup } from "@/components/dashboard/MobilePanelCarousel"
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
                filters={
                    <PeriodTabs
                        periods={periods}
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />
                }
                showSweepCountdown
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <MetricCards metrics={adminMetricsData[selectedPeriod]} />

                <FraudDetectionPanel
                    title="Users Activity"
                    data={adminUsersActivityData}
                    config={adminChartConfig}
                    showCategoryFilter={false}
                />

                <ResponsivePanelGroup className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-4">
                    <CaseQueuePanel
                        data={adminCaseQueueData}
                        severityStyles={adminSeverityStyles}
                    />
                    <CommissionBreakdownPanel
                        title="Subscription Revenue Breakdown"
                        data={adminRevenueData}
                        chartSize={200}
                    />
                </ResponsivePanelGroup>

                <ResponsivePanelGroup className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-4">
                    <FraudDistributionPanel title="Fraud Distribution" data={fraudDistributionData} />
                    <div className="lg:col-span-3">
                        <CommissionBreakdownPanel
                            title="Severity Distribution"
                            data={adminSeverityData}
                            chartSize={200}
                        />
                    </div>
                </ResponsivePanelGroup>

                <AnnualChecksTable data={annualChecksData} />

                <FraudDetectionPanel
                    title="Fraud Detection Growth"
                    data={adminFraudGrowthData}
                    config={adminFraudGrowthConfig}
                    showCategoryFilter={false}
                />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminOverview
