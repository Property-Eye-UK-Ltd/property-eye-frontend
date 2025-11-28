import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { RepeatOffendersPanel } from "@/features/overview/components/RepeatOffendersPanel"
import { MostCommonFraudTypesPanel } from "@/features/analytics/components/MostCommonFraudTypesPanel"
import { TimingGapsDistributionPanel } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { HMLRCheckEfficiencyPanel } from "@/features/analytics/components/HMLRCheckEfficiencyPanel"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
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
    metrics,
    fraudRateData,
    fraudRateConfig,
    severityData,
    detectionData,
    detectionConfig,
    fraudTypesData,
    fraudTypesConfig,
    repeatOffenders,
    timingGapsData,
    commissionAvoidedData,
    commissionAvoidedConfig,
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
                        <FraudDetectionPanel
                            data={fraudRateData}
                            config={fraudRateConfig}
                            showCategoryFilter={false}
                            title="Fraud Rate Over Time"
                        />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
                            <div className="lg:col-span-2">
                                <CommissionBreakdownPanel data={severityData} title="Severity Distribution" />
                            </div>
                            <div className="lg:col-span-5">
                                <FraudDetectionPanel
                                    data={detectionData}
                                    config={detectionConfig}
                                    title="Detection vs False Positive Ratio"
                                />
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
                    <>
                        <FraudDetectionPanel
                            data={commissionAvoidedData}
                            config={commissionAvoidedConfig}
                            showCategoryFilter={false}
                            title="Total Commission Avoided"
                        />
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white border border-border rounded-lg p-6">
                                    <h3 className="text-sm text-muted-foreground mb-2">Cost Reduction Estimate</h3>
                                    <p className="text-4xl font-medium text-foreground">£18,029</p>
                                </div>
                                <HMLRCheckEfficiencyPanel percentage={48} />
                            </div>
                            <div className="lg:col-span-5">
                                <FraudDetectionPanel
                                    data={recoveredCommissionData}
                                    config={recoveredCommissionConfig}
                                    showCategoryFilter={false}
                                    title="Recovered Commission"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Analytics
