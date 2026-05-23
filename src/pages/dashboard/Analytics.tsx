import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { ResponsivePanelGroup } from "@/components/dashboard/MobilePanelCarousel"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { RepeatOffendersPanel } from "@/features/overview/components/RepeatOffendersPanel"
import { TimingGapsDistributionPanel } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { HMLRCheckEfficiencyPanel } from "@/features/analytics/components/HMLRCheckEfficiencyPanel"
import { ClosedCasesTable } from "@/features/analytics/components/ClosedCasesTable"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import { ArrowDown2 } from "iconsax-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    periods,
    analyticsTabs,
    metricsData,
    fraudRateData,
    fraudRateConfig,
    severityData,
    detectionData,
    detectionConfig,
    repeatOffenders,
    timingGapsData,
    eventLogsData,
    recoveredCommissionData,
    recoveredCommissionConfig,
} from "@/data/analytics-data"

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
            <DynamicPageHeader
                title="Analytics & Reports"
                actions={
                    <>
                        <Button
                            onClick={handleScheduleReports}
                            className="h-9 shrink-0 rounded-full border border-border bg-white px-3 text-sm text-foreground hover:bg-muted lg:h-10 lg:px-4"
                        >
                            Schedule Reports
                        </Button>

                        <DropdownMenu onOpenChange={setIsExportOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button className="h-9 shrink-0 rounded-full bg-primary px-3 text-sm text-white hover:bg-primary/90 lg:h-10 lg:px-4">
                                    Export
                                    <ArrowDown2
                                        size={18}
                                        variant="Outline"
                                        className={`ml-1.5 transition-transform duration-200 lg:ml-2 ${isExportOpen ? "rotate-180" : ""}`}
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
                    </>
                }
                filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            <DashboardPageContent>
                <MetricCards metrics={metricsData[selectedPeriod]} />
                <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                    <CaseTypeTabs tabs={analyticsTabs} selected={selectedTab} onSelect={setSelectedTab} />
                </div>

                {selectedTab === "overview" && (
                    <>
                        <ResponsivePanelGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <FraudDetectionPanel
                                data={fraudRateData}
                                config={fraudRateConfig}
                                showCategoryFilter={false}
                                title="Fraud Rate Over Time"
                            />
                            <FraudDetectionPanel
                                data={detectionData}
                                config={detectionConfig}
                                title="Detection vs False Positive Ratio"
                            />
                        </ResponsivePanelGroup>
                        <DashboardPanel title="Event Log" noPadding hasBorder>
                            <EventLogTable data={eventLogsData} />
                        </DashboardPanel>
                    </>
                )}

                {selectedTab === "fraud-patterns" && (
                    <>
                        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-5 lg:gap-4">
                            <CommissionBreakdownPanel data={severityData} title="Severity Distribution" />
                            <RepeatOffendersPanel offenders={repeatOffenders} />
                        </div>
                        <TimingGapsDistributionPanel data={timingGapsData} />
                    </>
                )}

                {selectedTab === "financial-impact" && (
                    <>
                        <ResponsivePanelGroup className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <div className="lg:col-span-5">
                                <FraudDetectionPanel
                                    data={recoveredCommissionData}
                                    config={recoveredCommissionConfig}
                                    showCategoryFilter={false}
                                    title="Recovered Commission"
                                />
                            </div>
                            <div className="space-y-4 lg:col-span-2">
                                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm lg:p-6">
                                    <h3 className="mb-2 text-sm text-muted-foreground">Cost Reduction Estimate</h3>
                                    <p className="text-3xl font-medium text-foreground lg:text-4xl">£18,029</p>
                                </div>
                                <HMLRCheckEfficiencyPanel percentage={40} />
                            </div>
                        </ResponsivePanelGroup>

                        <DashboardPanel title="Cases Closed by Admin" noPadding hasBorder>
                            <ClosedCasesTable />
                        </DashboardPanel>
                    </>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Analytics
