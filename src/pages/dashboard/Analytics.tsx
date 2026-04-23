import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { RepeatOffendersPanel } from "@/features/overview/components/RepeatOffendersPanel"
import { TimingGapsDistributionPanel } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { HMLRCheckEfficiencyPanel } from "@/features/analytics/components/HMLRCheckEfficiencyPanel"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
    commissionAvoidedData,
    commissionAvoidedConfig,
    recoveredCommissionData,
    recoveredCommissionConfig,
    eventLogsData,
    closedCasesData,
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
                    </>
                }
                tabs={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                <MetricCards metrics={metricsData[selectedPeriod]} />
                <CaseTypeTabs tabs={analyticsTabs} selected={selectedTab} onSelect={setSelectedTab} />

                {/* Overview Tab Content */}
                {selectedTab === "overview" && (
                    <>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                        </div>
                        <DashboardPanel title="Event Log" noPadding hasBorder>
                            <EventLogTable data={eventLogsData} />
                        </DashboardPanel>
                    </>
                )}

                {/* Fraud Patterns Tab Content */}
                {selectedTab === "fraud-patterns" && (
                    <>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                            <div className="lg:col-span-2">
                                <CommissionBreakdownPanel data={severityData} title="Severity Distribution" />
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
                         <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <div className="lg:col-span-5">
                                <FraudDetectionPanel
                                    data={recoveredCommissionData}
                                    config={recoveredCommissionConfig}
                                    showCategoryFilter={false}
                                    title="Recovered Commission"
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-sm text-muted-foreground mb-2">Cost Reduction Estimate</h3>
                                    <p className="text-4xl font-medium text-foreground">£18,029</p>
                                </div>
                                <HMLRCheckEfficiencyPanel percentage={40} />
                            </div>
                        </div>

                        <DashboardPanel title="Cases Closed by Admin" noPadding hasBorder>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="px-6 py-3 font-medium">Case ID</TableHead>
                                            <TableHead className="px-6 py-3 font-medium">Property Address</TableHead>
                                            <TableHead className="px-6 py-3 font-medium">Closed By</TableHead>
                                            <TableHead className="px-6 py-3 font-medium">Closed Date</TableHead>
                                            <TableHead className="px-6 py-3 font-medium text-right">Reason</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {closedCasesData.map((item) => (
                                            <TableRow key={item.id} className="border-b border-border">
                                                <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.id}</TableCell>
                                                <TableCell className="px-6 py-4 text-sm text-foreground">{item.address}</TableCell>
                                                <TableCell className="px-6 py-4 text-sm text-foreground font-medium">{item.closedBy}</TableCell>
                                                <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.closedDate}</TableCell>
                                                <TableCell className="px-6 py-4 text-sm text-right text-muted-foreground">{item.reason}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </DashboardPanel>
                    </>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Analytics
