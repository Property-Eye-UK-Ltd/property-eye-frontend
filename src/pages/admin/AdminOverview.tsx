import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { CaseQueuePanel } from "@/features/admin/components/CaseQueuePanel"
import { FraudDistributionPanel } from "@/features/overview/components/FraudDistributionPanel"
import { AnnualChecksTable } from "@/features/overview/components/AnnualChecksTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp } from "iconsax-react"
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
    adminMarketingSummaryMetric,
} from "@/data/adminOverviewData"

const periods = ["All Time", "This Month", "Last Week"]

const AdminOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
    const navigate = useNavigate()
    const marketing = adminMarketingSummaryMetric

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

                <button
                    type="button"
                    onClick={() => navigate("/admin/affiliates")}
                    className="w-full text-left transition-opacity hover:opacity-90"
                >
                    <Card className="relative overflow-hidden">
                        <div className={`absolute left-0 right-0 top-0 h-2 ${marketing.topBarClass}`} />
                        <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
                            <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                                {marketing.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0">
                            <div className="flex items-end justify-between gap-4">
                                <div className="space-y-1.5 lg:space-y-2">
                                    <p className="text-xl font-medium text-foreground lg:text-3xl">{marketing.value}</p>
                                    <p className="text-[10px] text-muted-foreground lg:text-xs">{marketing.period}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {marketing.change && (
                                        <span className="flex items-center gap-0.5 rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-600 lg:gap-1 lg:px-2 lg:py-1 lg:text-xs">
                                            <ArrowUp size={10} className="lg:h-3 lg:w-3" />
                                            {marketing.change}
                                        </span>
                                    )}
                                    <span className="text-xs font-medium text-progress hover:underline lg:text-sm">
                                        View Affiliates
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </button>

                <FraudDetectionPanel
                    title="Checks Submitted"
                    data={adminUsersActivityData}
                    config={adminChartConfig}
                    showCategoryFilter={false}
                />

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-4">
                    <CaseQueuePanel
                        data={adminCaseQueueData}
                        severityStyles={adminSeverityStyles}
                    />
                    <CommissionBreakdownPanel
                        title="Subscription Revenue Breakdown"
                        data={adminRevenueData}
                        chartSize={200}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-4">
                    <FraudDistributionPanel title="Fraud Distribution" data={fraudDistributionData} />
                    <div className="lg:col-span-3">
                        <CommissionBreakdownPanel
                            title="Severity Distribution"
                            data={adminSeverityData}
                            chartSize={200}
                        />
                    </div>
                </div>

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
