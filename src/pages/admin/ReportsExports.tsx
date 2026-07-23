import { useState } from "react"
import { toast } from "sonner"
import { DocumentText, ExportSquare, ArrowDown2 } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { DetailedPerformanceTable } from "@/features/reports/components/DetailedPerformanceTable"
import { reportsMetricsData, reportPeriods, agencyPerformanceData } from "@/data/reportsData"
import { useAdminEventLog } from "@/features/reports/api/useReports"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const reportCtaOutlineClass =
    "h-9 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const reportCtaPrimaryClass =
    "h-9 shrink-0 rounded-full bg-primary px-3 text-xs text-white hover:bg-primary/90 lg:h-10 lg:px-4 lg:text-sm"

const pageTabs = [
    { label: "Agency Reports", value: "agency" },
    { label: "Affiliate Exports", value: "affiliate" },
    { label: "Audit Log", value: "audit" },
]

const affiliateExports = [
    { title: "Marketer Performance", description: "Agencies referred, fraud value, and commission earned per marketer." },
    { title: "Commission Liability", description: "Full breakdown of earned, approved, and outstanding commission." },
    { title: "Attribution Summary", description: "All locked attributions, pending claims, and conflicts." },
    { title: "Payout Register", description: "Payment history across all marketers for finance reconciliation." },
    { title: "Clearance / False Positive Rate", description: "Per-agency Not Fraudulent closed cases vs all closed cases — algorithm signal quality." },
]

const EVENT_LOG_PAGE_SIZE = 20

const ReportsExports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(reportPeriods[0])
    const [isExportOpen, setIsExportOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("agency")
    const [eventLogPage, setEventLogPage] = useState(1)

    const { data: eventLogData } = useAdminEventLog(eventLogPage, EVENT_LOG_PAGE_SIZE)

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Reports & Exports"
                stackActionsBelowTitle
                actions={
                    <>
                        <Button variant="outline" className={reportCtaOutlineClass}>
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
                    activeTab === "agency" ? (
                        <PeriodTabs periods={reportPeriods} selected={selectedPeriod} onSelect={setSelectedPeriod} />
                    ) : undefined
                }
            />

            <DashboardPageContent className="space-y-3 lg:space-y-6">
                <CaseTypeTabs tabs={pageTabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "agency" && (
                    <>
                        <MetricCards metrics={reportsMetricsData[selectedPeriod]} />
                        <DashboardPanel
                            title="Agency Performance Report"
                            description="Checks, fraud counts, recovered amounts, and plan fee + Property Eye share per agency"
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
                    </>
                )}

                {activeTab === "affiliate" && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
                        {affiliateExports.map((report) => (
                            <DashboardPanel
                                key={report.title}
                                title={report.title}
                                description={report.description}
                                icon={<DocumentText size={18} variant="Bulk" className="text-muted-foreground" />}
                                hasBorder
                                compactContent
                                actions={
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toast.success(`Exporting ${report.title}…`)}
                                        className="h-8 rounded-full border-border px-3 text-xs lg:h-9 lg:text-sm"
                                    >
                                        <ExportSquare size={16} variant="Outline" className="mr-1.5" />
                                        Export CSV
                                    </Button>
                                }
                            >
                                <></>
                            </DashboardPanel>
                        ))}
                    </div>
                )}

                {activeTab === "audit" && (
                    <DashboardPanel
                        title="System Event Log"
                        description="Audit trail of user logins and fraud case activity across all agencies"
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
                        <EventLogTable
                            data={eventLogData?.items ?? []}
                            total={eventLogData?.total ?? 0}
                            page={eventLogPage}
                            pageSize={EVENT_LOG_PAGE_SIZE}
                            onPageChange={setEventLogPage}
                        />
                    </DashboardPanel>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default ReportsExports
