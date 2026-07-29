import { useState } from "react"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SearchNormal, Filter, ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillingHistoryTable } from "@/features/adminbilling/components/BillingHistoryTable"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"
import { CommissionApprovalTable } from "@/features/marketing-admin/finance/components/CommissionApprovalTable"
import { AgencyRecoveriesTable } from "@/features/adminbilling/components/AgencyRecoveriesTable"
import { billingPeriods } from "@/data/adminBillingData"
import { useAdminBillingMetrics, useAdminInvoices } from "@/features/adminbilling/api/useAdminBilling"
import { toBillingMetricCards, getAdminInvoicesForExport } from "@/features/adminbilling/api/adminBillingService"
import { useAdminCommissions } from "@/features/adminbilling/api/useAdminCommissions"
import { getAdminCommissionsForExport } from "@/features/adminbilling/api/adminCommissionsService"
import { useAdminAgencyRecoveries } from "@/features/adminbilling/api/useAdminAgencyRecoveries"
import { getAdminAgencyRecoveriesForExport } from "@/features/adminbilling/api/adminAgencyRecoveriesService"
import { MetricCard } from "@/features/overview/components/MetricCards"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (!isAxiosError(error)) return fallback
    const detail = (error.response?.data as { detail?: string } | undefined)?.detail
    return typeof detail === "string" ? detail : fallback
}

const BillingFinance = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(billingPeriods[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("billing")

    const { data: billingMetrics } = useAdminBillingMetrics(selectedPeriod)
    const { data: invoicesData } = useAdminInvoices({ search: searchQuery || undefined, page_size: 100 })
    const billingHistory = invoicesData?.items ?? []

    const { data: commissions = [] } = useAdminCommissions()
    const { data: agencyRecoveries = [] } = useAdminAgencyRecoveries()

    const pageTabs = [
        { label: "Subscription Billing", value: "billing" },
        { label: "Marketer Commissions", value: "commissions", count: commissions.filter((c) => c.status === "Pending").length },
        { label: "Agencies Recoveries", value: "agency-recoveries", count: agencyRecoveries.filter((r) => r.status === "Pending").length },
    ]

    const commissionMetrics: MetricCard[] = [
        {
            title: "Commission Liability",
            value: formatGbp(commissions.reduce((sum, c) => sum + c.amount, 0)),
            period: "Earned to date",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Outstanding Commission",
            value: formatGbp(commissions.filter((c) => c.status !== "Paid").reduce((sum, c) => sum + c.amount, 0)),
            period: "Awaiting payout",
            change: "",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Paid",
            value: formatGbp(commissions.filter((c) => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

    const recoveryMetrics: MetricCard[] = [
        {
            title: "Total Recovery Liability",
            value: formatGbp(agencyRecoveries.reduce((sum, r) => sum + r.amount, 0)),
            period: "Owed to date",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Outstanding",
            value: formatGbp(agencyRecoveries.filter((r) => r.status === "Pending").reduce((sum, r) => sum + r.amount, 0)),
            period: "Awaiting payment",
            change: "",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Paid",
            value: formatGbp(agencyRecoveries.filter((r) => r.status === "Paid").reduce((sum, r) => sum + r.amount, 0)),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

    const [exportDialogOpen, setExportDialogOpen] = useState(false)
    const [pendingFormat, setPendingFormat] = useState<"csv" | "pdf" | null>(null)
    const [exportDateFrom, setExportDateFrom] = useState("")
    const [exportDateTo, setExportDateTo] = useState("")
    const [isExporting, setIsExporting] = useState(false)

    const runExport = async (format: "csv" | "pdf", dateFrom: string, dateTo: string) => {
        setIsExporting(true)
        try {
            let dataToExport: any[] = []
            let title = ""

            if (activeTab === "billing") {
                const fullInvoices = await getAdminInvoicesForExport({
                    search: searchQuery || undefined,
                    date_from: dateFrom || undefined,
                    date_to: dateTo || undefined,
                })
                if (fullInvoices.items.length === 0) {
                    toast.error("No billing records found for the selected date range")
                    return
                }
                dataToExport = fullInvoices.items.map((b: any) => ({
                    transactionId: b.transactionId,
                    agency: b.agencyName,
                    plan: b.planTier,
                    amount: b.amount,
                    date: b.transactionDate,
                    status: b.status,
                }))
                title = "Billing History Report"
            } else if (activeTab === "commissions") {
                const fullCommissions = await getAdminCommissionsForExport({
                    date_from: dateFrom || undefined,
                    date_to: dateTo || undefined,
                })
                if (fullCommissions.length === 0) {
                    toast.error("No commissions found for the selected date range")
                    return
                }
                dataToExport = fullCommissions.map((c: any) => ({
                    marketer: c.marketer,
                    agency: c.agency,
                    fraudCase: c.fraudCase,
                    amount: c.amountLabel || `£${c.amount}`,
                    status: c.status,
                }))
                title = "Marketer Commissions Report"
            } else if (activeTab === "agency-recoveries") {
                const fullRecoveries = await getAdminAgencyRecoveriesForExport({
                    date_from: dateFrom || undefined,
                    date_to: dateTo || undefined,
                })
                if (fullRecoveries.length === 0) {
                    toast.error("No agency recoveries found for the selected date range")
                    return
                }
                dataToExport = fullRecoveries.map((r: any) => ({
                    agency: r.agency,
                    fraudCase: r.fraudCase,
                    amount: r.amountLabel || `£${r.amount}`,
                    date: r.dateLabel || r.createdAt || "—",
                    status: r.status,
                }))
                title = "Agencies Recoveries Report"
            }

            if (dataToExport.length === 0) return

            if (format === "csv") {
                exportToCSV(dataToExport, `${activeTab}_report.csv`)
            } else {
                exportToPDF(dataToExport, title)
            }
        } catch (error) {
            toast.error(extractErrorMessage(error, "Failed to export. Please try again."))
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
                title="Billing & Finance"
                actions={
                    activeTab !== "billing" ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" disabled={isExporting} className="h-9 shrink-0 rounded-full border-border px-3 text-xs lg:h-10 lg:px-4 lg:text-sm bg-white text-foreground hover:bg-slate-50">
                                    {isExporting ? (
                                        <>
                                            <Loader2 className="mr-1 h-4 w-4 animate-spin lg:mr-2" />
                                            Exporting...
                                        </>
                                    ) : (
                                        <>
                                            Export
                                            <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                        </>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : undefined
                }
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={pageTabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "billing" && (
                    <>
                        <MetricCards
                            metrics={billingMetrics ? toBillingMetricCards(billingMetrics, selectedPeriod) : []}
                        />
                        <DashboardPanel
                            title="Billing History"
                            description="View and manage all subscription history"
                            noPadding
                            hasBorder
                            actions={
                                <div className="flex flex-nowrap items-center gap-1.5 lg:gap-2">
                                    <div className="relative min-w-[9rem] flex-1 sm:min-w-0 sm:flex-none sm:w-44 lg:w-56">
                                        <SearchNormal
                                            size={16}
                                            variant="Outline"
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        />
                                        <Input
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                                        />
                                    </div>
                                    <Button variant="outline" className="h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                                        <Filter size={16} variant="Outline" className="mr-1 lg:mr-2" />
                                        Filter
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" disabled={isExporting} className="h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                                                {isExporting ? (
                                                    <>
                                                        <Loader2 className="mr-1 h-4 w-4 animate-spin lg:mr-2" />
                                                        Exporting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Export
                                                        <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            }
                        >
                            <BillingHistoryTable data={billingHistory} />
                        </DashboardPanel>
                    </>
                )}

                {activeTab === "commissions" && (
                    <>
                        <MetricCards metrics={commissionMetrics} columns={3} />
                        <CommissionApprovalTable data={commissions} />
                    </>
                )}

                {activeTab === "agency-recoveries" && (
                    <>
                        <MetricCards metrics={recoveryMetrics} columns={3} />
                        <AgencyRecoveriesTable data={agencyRecoveries} />
                    </>
                )}
            </DashboardPageContent>

            <Dialog open={exportDialogOpen} onOpenChange={(open) => !isExporting && setExportDialogOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export {activeTab === "billing" ? "Billing History" : activeTab === "commissions" ? "Marketer Commissions" : "Agency Recoveries"}</DialogTitle>
                        <DialogDescription>
                            Optionally narrow the export to a date range. Leave both fields blank to export everything (up to 10,000 rows).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="billing-export-from">From</Label>
                            <input
                                id="billing-export-from"
                                type="date"
                                value={exportDateFrom}
                                onChange={(e) => setExportDateFrom(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="billing-export-to">To</Label>
                            <input
                                id="billing-export-to"
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

export default BillingFinance
