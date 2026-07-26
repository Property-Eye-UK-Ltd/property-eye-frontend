import { useState } from "react"
import { DocumentText, ArrowDown2 } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { useAdminEventLog } from "@/features/reports/api/useReports"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const pageTabs = [
    { label: "Agency Reports", value: "agency" },
    { label: "Affiliate Exports", value: "affiliate" },
    { label: "Audit Log", value: "audit" },
]

const EVENT_LOG_PAGE_SIZE = 20

const ReportsExports = () => {
    const [activeTab, setActiveTab] = useState("audit")
    const [eventLogPage, setEventLogPage] = useState(1)

    const { data: eventLogData } = useAdminEventLog(eventLogPage, EVENT_LOG_PAGE_SIZE)

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Reports & Exports"
                stackActionsBelowTitle
            />

            <DashboardPageContent className="space-y-3 lg:space-y-6">
                <CaseTypeTabs tabs={pageTabs} selected={activeTab} onSelect={setActiveTab} />

                {(activeTab === "agency" || activeTab === "affiliate") && (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-border bg-card/30 backdrop-blur-md shadow-sm">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 -m-4 rounded-full bg-primary/10 blur-xl animate-pulse" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                                <DocumentText size={32} variant="Bulk" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            {activeTab === "agency" ? "Agency Performance Reports" : "Affiliate Exports & Analytics"}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                            This reporting module is currently under development to provide advanced analytics, automated PDF exports, and scheduled report delivery.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                Coming Soon
                            </span>
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                In Development
                            </span>
                        </div>
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
