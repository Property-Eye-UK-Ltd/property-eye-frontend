import { useState } from "react"
import { isAxiosError } from "axios"
import { DocumentText, ArrowDown2 } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EventLogTable } from "@/features/reports/components/EventLogTable"
import { useAdminEventLog } from "@/features/reports/api/useReports"
import { getAdminEventLogForExport } from "@/features/reports/api/reportsService"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (!isAxiosError(error)) return fallback
    const detail = (error.response?.data as { detail?: string } | undefined)?.detail
    return typeof detail === "string" ? detail : fallback
}

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm"

const pageTabs = [
    { label: "Agency Reports", value: "agency" },
    { label: "Affiliate Exports", value: "affiliate" },
    { label: "Audit Log", value: "audit" },
]

const EVENT_LOG_PAGE_SIZE = 20

const actionLabels: Record<string, string> = {
    login: "Login",
    logout: "Logout",
    create_case: "Case Created",
    update_case: "Case Updated",
    export_report: "Report Exported",
}

const ReportsExports = () => {
    const [activeTab, setActiveTab] = useState("audit")
    const [eventLogPage, setEventLogPage] = useState(1)
    const [exportDialogOpen, setExportDialogOpen] = useState(false)
    const [pendingFormat, setPendingFormat] = useState<"csv" | "pdf" | null>(null)
    const [exportDateFrom, setExportDateFrom] = useState("")
    const [exportDateTo, setExportDateTo] = useState("")
    const [isExporting, setIsExporting] = useState(false)

    const { data: eventLogData } = useAdminEventLog(eventLogPage, EVENT_LOG_PAGE_SIZE, { enabled: activeTab === "audit" })

    const runExport = async (format: "csv" | "pdf", dateFrom: string, dateTo: string) => {
        setIsExporting(true)
        try {
            const fullData = await getAdminEventLogForExport(dateFrom || undefined, dateTo || undefined)
            const list = fullData.items ?? []
            if (list.length === 0) {
                toast.error("No event log entries found for the selected date range")
                return
            }

            const dataToExport = list.map((event: any) => ({
                actor: event.actor_name || "—",
                role: event.actor_role || "—",
                action: actionLabels[event.action] || event.action || "—",
                target: event.target_type || "—",
                agency: event.agency_name || "—",
                date: event.date
                    ? new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                      })
                    : "—",
            }))

            if (format === "csv") {
                exportToCSV(dataToExport, "event_log_report.csv")
            } else {
                exportToPDF(dataToExport, "System Event Log Report")
            }
        } catch (error) {
            toast.error(extractErrorMessage(error, "Failed to export event log. Please try again."))
        } finally {
            setIsExporting(false)
        }
    }

    const handleExport = (format: "csv" | "pdf") => {
        setPendingFormat(format)
        setExportDateFrom("")
        setExportDateTo("")
        setExportDialogOpen(true)
    }

    const handleConfirmExport = async () => {
        if (!pendingFormat) return
        await runExport(pendingFormat, exportDateFrom, exportDateTo)
        setExportDialogOpen(false)
        setPendingFormat(null)
    }

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
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
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

            <Dialog open={exportDialogOpen} onOpenChange={(open) => !isExporting && setExportDialogOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export Event Log</DialogTitle>
                        <DialogDescription>
                            Optionally narrow the export to a date range. Leave both fields blank to export the full log (up to 10,000 rows).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="event-log-export-from">From</Label>
                            <input
                                id="event-log-export-from"
                                type="date"
                                value={exportDateFrom}
                                onChange={(e) => setExportDateFrom(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="event-log-export-to">To</Label>
                            <input
                                id="event-log-export-to"
                                type="date"
                                value={exportDateTo}
                                onChange={(e) => setExportDateTo(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setExportDialogOpen(false)} disabled={isExporting}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmExport} disabled={isExporting}>
                            {isExporting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                "Export"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    )
}

export default ReportsExports
