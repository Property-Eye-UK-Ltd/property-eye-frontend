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

const ReportsExports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(reportPeriods[0])

    const handleScheduleReport = () => {
        console.log("Schedule report clicked")
        // In real app, would open schedule report modal
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Reports & Exports"
                actions={
                    <div className="flex items-center gap-3">
                        <Button onClick={handleScheduleReport} variant="outline" className="rounded-full">
                            Schedule Reports
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full bg-primary text-white">
                                    Export Reports
                                    <ArrowDown2 size={18} variant="Outline" className="ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Export as Excel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
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
                {/* Metric Cards */}
                <MetricCards metrics={reportsMetricsData[selectedPeriod]} />

                {/* Significant increase in report detail: Agency Performance Analytics */}
                <DashboardPanel
                    title="Agency Performance Report"
                    description="Comprehensive breakdown of recovery and revenue metrics per agency"
                    noPadding
                    hasBorder
                    actions={
                        <Button
                            variant="outline"
                            className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            View All Analytics
                        </Button>
                    }
                >
                    <DetailedPerformanceTable data={agencyPerformanceData} />
                </DashboardPanel>

                {/* Third Row - Event Log Table */}
                <DashboardPanel
                    title="System Event Log"
                    description="Audit trail of all administrative actions and system events"
                    noPadding
                    hasBorder
                    actions={
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                                >
                                    Export Log
                                    <ArrowDown2 size={18} variant="Outline" className="ml-2" />
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
