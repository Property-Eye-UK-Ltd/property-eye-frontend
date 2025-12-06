import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { Button } from "@/components/ui/button"
import { ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TopAgenciesTable } from "@/features/reports/components/TopAgenciesTable"
import { reportsMetrics, reportPeriods, topAgenciesData, checksConsumptionData } from "@/data/reportsData"

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
                tabs={<PeriodTabs periods={reportPeriods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={reportsMetrics} />

                {/* First Row - Pie Chart and Top Agencies Table */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    <CommissionBreakdownPanel data={checksConsumptionData} title="Checks Consumption by Plan" chartSize={150} />
                    <TopAgenciesTable data={topAgenciesData} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ReportsExports
