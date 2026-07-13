import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { ResponsivePanelGroup } from "@/components/dashboard/MobilePanelCarousel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
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
    metricsData,
    casesOverTimeData,
    casesOverTimeConfig,
} from "@/data/analytics-data"

const Analytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
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
                stackActionsBelowTitle
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
                <MetricCards metrics={metricsData[selectedPeriod]} columns={2} />
                <ResponsivePanelGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <FraudDetectionPanel
                        data={casesOverTimeData}
                        config={casesOverTimeConfig}
                        showCategoryFilter={false}
                        title="Cases Over Time"
                        valueFormatter={(value) => String(value)}
                        yAxisTickFormatter={(value) => String(value)}
                    />
                </ResponsivePanelGroup>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Analytics
