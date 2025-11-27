import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum, CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDataPoint, FraudDetectionPanel, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { RepeatOffender, RepeatOffendersPanel } from "@/features/overview/components/RepeatOffendersPanel"
import { MostCommonFraudTypesPanel, FraudTypeData, FraudTypeConfig } from "@/features/analytics/components/MostCommonFraudTypesPanel"
import { TimingGapsDistributionPanel, TimingGapData } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { Button } from "@/components/ui/button"
import { ArrowDown2 } from "iconsax-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const periods = ["All Time", "This Month", "Last Week"]

const analyticsTabs = [
    { label: "Overview", value: "overview" },
    { label: "Fraud Patterns", value: "fraud-patterns" },
    { label: "Financial Impact", value: "financial-impact" },
]

const metrics: MetricCard[] = [
    {
        title: "Total fraud Alerts",
        value: "1,459",
        period: "All time",
        change: "+221",
        topBarClass: "bg-red-500",
    },
    {
        title: "Commission at Risk",
        value: "£12,898",
        period: "All time",
        change: "+£2,233",
        topBarClass: "bg-orange-500",
    },
    {
        title: "Total Recoveries",
        value: "324",
        period: "All time",
        change: "+2",
        topBarClass: "bg-green-500",
    },
    {
        title: "Avg. Fraud Likelihood",
        value: "37%",
        period: "All time",
        change: "+2%",
        topBarClass: "bg-purple-500",
    },
]

// Overview Tab Data
const fraudRateData: FraudDataPoint[] = [
    { month: "Jan", rate: 72 },
    { month: "Feb", rate: 18 },
    { month: "Mar", rate: 32 },
    { month: "Apr", rate: 22 },
    { month: "May", rate: 42 },
    { month: "Jun", rate: 12 },
    { month: "Jul", rate: 58 },
    { month: "Aug", rate: 15 },
    { month: "Sep", rate: 58 },
    { month: "Oct", rate: 52 },
    { month: "Nov", rate: 88 },
    { month: "Dec", rate: 42 },
]

const fraudRateConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Fraud Rate", color: "#00072C" },
}

const severityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 53, color: "#6B7280" },
    { name: "Medium", value: 20, color: "#EAB308" },
    { name: "High", value: 22, color: "#F97316" },
    { name: "Critical", value: 8, color: "#EF4444" },
]

const detectionData: FraudDataPoint[] = [
    { month: "Jan", detection: 45, falsePositive: 68 },
    { month: "Feb", detection: 52, falsePositive: 15 },
    { month: "Mar", detection: 32, falsePositive: 32 },
    { month: "Apr", detection: 85, falsePositive: 22 },
    { month: "May", detection: 15, falsePositive: 42 },
    { month: "Jun", detection: 12, falsePositive: 12 },
    { month: "Jul", detection: 52, falsePositive: 62 },
    { month: "Aug", detection: 35, falsePositive: 12 },
    { month: "Sep", detection: 92, falsePositive: 58 },
    { month: "Oct", detection: 92, falsePositive: 62 },
    { month: "Nov", detection: 58, falsePositive: 92 },
    { month: "Dec", detection: 12, falsePositive: 42 },
]

const detectionConfig: Record<string, FraudSeriesConfig> = {
    detection: { label: "Detection", color: "#16A34A" },
    falsePositive: { label: "False Positive Ratio", color: "#EF4444" },
}

// Fraud Patterns Tab Data
const fraudTypesData: FraudTypeData[] = [
    { type: "Private Sale", privateSale: 55, buyerIntro: 0, dualAgency: 0 },
    { type: "Buyer Intro", privateSale: 0, buyerIntro: 78, dualAgency: 0 },
    { type: "Dual Agency", privateSale: 0, buyerIntro: 0, dualAgency: 72 },
]

const fraudTypesConfig: Record<string, FraudTypeConfig> = {
    privateSale: { label: "Private Sale", color: "#9333EA" },
    buyerIntro: { label: "Buyer Intro", color: "#3B82F6" },
    dualAgency: { label: "Dual Agency", color: "#1E40AF" },
}

const repeatOffenders: RepeatOffender[] = [
    { name: "Fredrick Hunt", location: "Ashfield Road", offenses: 24 },
    { name: "Madeline Kahro", location: "Picadilly", offenses: 22 },
    { name: "Fredrick Hunt", location: "Leicester", offenses: 19 },
    { name: "Fredrick Hunt", location: "Manchester", offenses: 19 },
    { name: "Fredrick Hunt", location: "London", offenses: 12 },
    { name: "Fredrick Hunt", location: "London", offenses: 12 },
]

const timingGapsData: TimingGapData[] = [
    { range: "0", count: 5 },
    { range: "50", count: 8 },
    { range: "100", count: 7 },
    { range: "150", count: 5 },
    { range: "200", count: 3 },
    { range: "250", count: 3 },
    { range: "300", count: 8 },
    { range: "350", count: 14 },
    { range: "400", count: 16 },
    { range: "450", count: 19 },
    { range: "500", count: 14 },
    { range: "550", count: 13 },
    { range: "600", count: 10 },
    { range: "650", count: 8 },
    { range: "700", count: 6 },
    { range: "750", count: 7 },
    { range: "800", count: 5 },
    { range: "850", count: 4 },
    { range: "900", count: 3 },
]

const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
    const [selectedTab, setSelectedTab] = useState(analyticsTabs[0].value)
    const [isExportOpen, setIsExportOpen] = useState(false)

    const handleExport = (format: "pdf" | "csv") => {
        console.log(`Exporting as ${format}`)
    }

    const handleScheduleReports = () => {
        console.log("Schedule reports clicked")
    }

    return (
        <DashboardLayout>
            {/* Custom Page Header with Title and Tabs Below */}
            <div className="bg-white w-full border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto w-full px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-medium text-foreground">Analytics & Reports</h1>
                            <PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleScheduleReports}
                                className="rounded-full bg-white border border-border text-foreground hover:bg-muted h-10 px-4"
                            >
                                Schedule Reports
                            </Button>

                            <DropdownMenu onOpenChange={setIsExportOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full bg-primary text-white hover:bg-primary/90 h-10 px-4">
                                        Export
                                        <ArrowDown2
                                            size={18}
                                            variant="Outline"
                                            className={`ml-2 transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32">
                                    <DropdownMenuItem onClick={() => handleExport("pdf")} className="cursor-pointer">
                                        Export as PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleExport("csv")} className="cursor-pointer">
                                        Export as CSV
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                <MetricCards metrics={metrics} />
                <CaseTypeTabs tabs={analyticsTabs} selected={selectedTab} onSelect={setSelectedTab} />

                {/* Overview Tab Content */}
                {selectedTab === "overview" && (
                    <>
                        <FraudDetectionPanel data={fraudRateData} config={fraudRateConfig} showCategoryFilter={false} />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
                            <div className="lg:col-span-2">
                                <CommissionBreakdownPanel data={severityData} title="Severity Distribution" />
                            </div>
                            <div className="lg:col-span-5">
                                <FraudDetectionPanel data={detectionData} config={detectionConfig} />
                            </div>
                        </div>
                    </>
                )}

                {/* Fraud Patterns Tab Content */}
                {selectedTab === "fraud-patterns" && (
                    <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <MostCommonFraudTypesPanel data={fraudTypesData} config={fraudTypesConfig} />
                            </div>
                            <div className="lg:col-span-3">
                                <RepeatOffendersPanel offenders={repeatOffenders} />
                            </div>
                        </div>
                        <TimingGapsDistributionPanel data={timingGapsData} />
                    </>
                )}

                {/* Financial Impact Tab Content */}
                {selectedTab === "financial-impact" && (
                    <div className="text-center py-20 text-muted-foreground">
                        Financial Impact content coming soon...
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Analytics
