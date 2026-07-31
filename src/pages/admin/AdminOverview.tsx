import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { MetricCards, type MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel, type CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel, type FraudDataPoint, type FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { RecentDeterminationsPanel } from "@/features/admin/components/RecentDeterminationsPanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp } from "iconsax-react"
import {
    useAdminFraudDetectionGrowth,
    useAdminOverviewSummary,
    useAdminRevenueByPlan,
    useAdminSeverityDistribution,
} from "@/features/adminoverview/api/useAdminOverview"

const formatGbp = (value: number): string =>
    `£${value.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`

const severityColors: Record<string, string> = {
    Low: "#6B7280",
    Medium: "#EAB308",
    High: "#F97316",
    Critical: "#EF4444",
}

const revenuePlanColors = ["#3B82F6", "#F97316", "#10B981", "#8B5CF6", "#EAB308"]

const fraudGrowthConfig: Record<string, FraudSeriesConfig> = {
    Cases: {
        label: "Confirmed Cases",
        color: "var(--progress)",
    },
}

const AdminOverview = () => {
    const navigate = useNavigate()

    const { data: summary, isLoading: summaryLoading } = useAdminOverviewSummary()
    const { data: severity } = useAdminSeverityDistribution()
    const { data: revenueByPlan = [] } = useAdminRevenueByPlan()
    const { data: fraudGrowth = [] } = useAdminFraudDetectionGrowth()

    const metrics: MetricCard[] = useMemo(() => {
        if (!summary) return []
        return [
            { title: "Total Checks Run", value: summary.total_lr_checks.toLocaleString(), period: "All time", change: "", topBarClass: "bg-blue-500" },
            { title: "Total Agencies", value: summary.total_agencies.toLocaleString(), period: "All time", change: "", topBarClass: "bg-red-500" },
            { title: "Subscription Revenue", value: formatGbp(summary.total_income_gbp), period: "All time", change: "", topBarClass: "bg-green-500" },
            { title: "Commission Recovered", value: formatGbp(summary.commission_recovered_total), period: "Recovered split share", change: "", topBarClass: "bg-purple-500" },
        ]
    }, [summary])

    const clearanceMetric: MetricCard | null = summary
        ? { title: "Clearance Rate", value: `${summary.clearance_rate_percent}%`, period: "Not Fraudulent / all closed", change: "", topBarClass: "bg-amber-500" }
        : null

    const activeMarketersMetric: MetricCard | null = summary
        ? { title: "Active Marketers", value: summary.active_marketers.toLocaleString(), period: "Affiliates network", change: "", topBarClass: "bg-progress" }
        : null

    const severityData: CommissionBreakdownDatum[] = useMemo(() => {
        if (!severity) return []
        return [
            { name: "Low", value: severity.low, color: severityColors.Low },
            { name: "Medium", value: severity.medium, color: severityColors.Medium },
            { name: "High", value: severity.high, color: severityColors.High },
            { name: "Critical", value: severity.critical, color: severityColors.Critical },
        ]
    }, [severity])

    const revenueData: CommissionBreakdownDatum[] = useMemo(
        () =>
            revenueByPlan.map((item, index) => ({
                name: item.plan_name,
                value: item.total_income_gbp,
                color: revenuePlanColors[index % revenuePlanColors.length],
            })),
        [revenueByPlan]
    )

    const fraudGrowthData: FraudDataPoint[] = useMemo(
        () => fraudGrowth.map((point) => ({ month: point.period_label, Cases: point.count })),
        [fraudGrowth]
    )

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Overview"
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                {/* Top 4 KPIs */}
                {summaryLoading ? (
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
                        ))}
                    </div>
                ) : (
                    <MetricCards metrics={metrics} columns={4} />
                )}

                {/* Clearance Rate + Active Marketers side by side */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {clearanceMetric && (
                        <Card className="relative overflow-hidden">
                            <div className={`absolute left-0 right-0 top-0 h-2 ${clearanceMetric.topBarClass}`} />
                            <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
                                <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                                    {clearanceMetric.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0">
                                <div className="space-y-1.5 lg:space-y-2">
                                    <p className="text-xl font-medium text-foreground lg:text-3xl">{clearanceMetric.value}</p>
                                    <p className="text-[10px] text-muted-foreground lg:text-xs">{clearanceMetric.period}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeMarketersMetric && (
                        <button
                            type="button"
                            onClick={() => navigate("/admin/affiliates")}
                            className="text-left transition-opacity hover:opacity-90"
                        >
                            <Card className="relative overflow-hidden h-full">
                                <div className={`absolute left-0 right-0 top-0 h-2 ${activeMarketersMetric.topBarClass}`} />
                                <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
                                    <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                                        {activeMarketersMetric.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0">
                                    <div className="flex items-end justify-between gap-4">
                                        <div className="space-y-1.5 lg:space-y-2">
                                            <p className="text-xl font-medium text-foreground lg:text-3xl">{activeMarketersMetric.value}</p>
                                            <p className="text-[10px] text-muted-foreground lg:text-xs">{activeMarketersMetric.period}</p>
                                        </div>
                                        <span className="flex items-center gap-3">
                                            <span className="text-xs font-medium text-progress hover:underline lg:text-sm">
                                                View Affiliates
                                            </span>
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </button>
                    )}
                </div>

                <div className="w-full">
                    <CommissionBreakdownPanel
                        title="Timing Risk Distribution"
                        data={severityData}
                        chartSize={200}
                        className="w-full"
                    />
                </div>

                <RecentDeterminationsPanel />

                {fraudGrowthData.length > 0 ? (
                    <FraudDetectionPanel
                        title="Fraud Detection Growth"
                        data={fraudGrowthData}
                        config={fraudGrowthConfig}
                        showCategoryFilter={false}
                    />
                ) : (
                    <Card className="p-6 text-center text-sm text-muted-foreground">
                        Fraud Detection Growth — coming soon
                    </Card>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminOverview
