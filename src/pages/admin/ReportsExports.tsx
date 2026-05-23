import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { Button } from "@/components/ui/button"
import { ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { DetailedPerformanceTable } from "@/features/reports/components/DetailedPerformanceTable"
import { reportsMetricsData, reportPeriods, eventLogData, agencyPerformanceData } from "@/data/reportsData"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const reportCtaOutlineClass =
    "h-9 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const reportCtaPrimaryClass =
    "h-9 shrink-0 rounded-full bg-primary px-3 text-xs text-white hover:bg-primary/90 lg:h-10 lg:px-4 lg:text-sm"

const ReportsExports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(reportPeriods[0])
    const [isExportOpen, setIsExportOpen] = useState(false)

    const handleScheduleReport = () => {
        console.log("Schedule report clicked")
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Reports & Exports"
                stackActionsBelowTitle
                actions={
                    <>
                        <Button
                            onClick={handleScheduleReport}
                            variant="outline"
                            className={reportCtaOutlineClass}
                        >
                            Schedule Reports
                        </Button>
                        <DropdownMenu onOpenChange={setIsExportOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button className={reportCtaPrimaryClass}>
                                    Export Reports
                                    <ArrowDown2
                                        size={16}
                                        variant="Outline"
                                        className={`ml-1 transition-transform duration-200 lg:ml-2 ${isExportOpen ? "rotate-180" : ""}`}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Export as Excel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                }
                filters={
                    <PeriodTabs
                        periods={reportPeriods}
                        selected={selectedPeriod}
                        onSelect={setSelectedPeriod}
                    />
                }
            />

            <DashboardPageContent className="space-y-3 lg:space-y-6">
                <MetricCards metrics={reportsMetricsData[selectedPeriod]} />

                <DashboardPanel
                    title="Agency Performance Report"
                    description="Comprehensive breakdown of recovery and revenue metrics per agency"
                    noPadding
                    hasBorder
                    actions={
                        <Button variant="outline" className={panelBtnClass}>
                            View All Analytics
                        </Button>
                    }
                >
                    <DetailedPerformanceTable data={agencyPerformanceData} />
                </DashboardPanel>

                <DashboardPanel
                    title="System Event Log"
                    description="Audit trail of all administrative actions and system events"
                    noPadding
                    hasBorder
                    actions={
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={panelBtnClass}>
                                    Export Log
                                    <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                >
                    <EventLogTable data={eventLogData} />
                </DashboardPanel>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default ReportsExports
