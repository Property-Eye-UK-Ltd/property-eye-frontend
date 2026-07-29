import { useMemo, useState } from "react"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchNormal, ArrowDown2, Calendar, CloseCircle } from "iconsax-react"
import { AdminCasesTable } from "@/features/admincases/components/AdminCasesTable"
import { AdminCaseStatus, CaseDetermination } from "@/data/agencyCasesData"
import { useAdminCaseAgencies, useAdminCases } from "@/features/admincases/api/useAdminCases"
import { adminStatusToCaseStatus, getAdminCasesForExport } from "@/features/admincases/api/adminCasesService"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (!isAxiosError(error)) return fallback
    const detail = (error.response?.data as { detail?: string } | undefined)?.detail
    return typeof detail === "string" ? detail : fallback
}


const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

const AdminCaseManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedAgency, setSelectedAgency] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
    const [selectedDetermination, setSelectedDetermination] = useState<string>("all")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [page, setPage] = useState(1)
    const [exportDialogOpen, setExportDialogOpen] = useState(false)
    const [pendingFormat, setPendingFormat] = useState<"csv" | "pdf" | null>(null)
    const [exportDateFrom, setExportDateFrom] = useState("")
    const [exportDateTo, setExportDateTo] = useState("")
    const [isExporting, setIsExporting] = useState(false)

    const statusOptions: AdminCaseStatus[] = [
        "Open",
        "Under Legal Review",
        "Flagged",
        "Pending Approval",
        "Closed",
    ]
    const severityOptions = ["Critical", "High", "Medium", "Low"] as const
    const determinationOptions: CaseDetermination[] = [
        "Fraudulent (Confirmed)",
        "Not Fraudulent (Cleared)",
    ]

    const hasActiveFilters = searchQuery || selectedAgency !== "all" || selectedStatus !== "all" || selectedSeverity !== "all" || selectedDetermination !== "all" || dateFrom || dateTo

    const handleClearFilters = () => {
        setSearchQuery("")
        setSelectedAgency("all")
        setSelectedStatus("all")
        setSelectedSeverity("all")
        setSelectedDetermination("all")
        setDateFrom("")
        setDateTo("")
        setPage(1)
    }

    const { data: agencies } = useAdminCaseAgencies()

    const { data: casesResponse, isLoading } = useAdminCases({
        page,
        page_size: 20,
        search: searchQuery || undefined,
        status: selectedStatus !== "all" ? adminStatusToCaseStatus[selectedStatus as AdminCaseStatus] : undefined,
        agency_id: selectedAgency !== "all" ? selectedAgency : undefined,
    })

    const parseLooseDate = (value: string) => {
        const t = Date.parse(value)
        return Number.isNaN(t) ? null : t
    }

    // Severity, determination, and sale-date range aren't yet server-side
    // filters on GET /admin/fraud-reports; apply them client-side over the
    // current page until the endpoint grows dedicated query params.
    const filteredCases = useMemo(() => {
        const items = casesResponse?.items ?? []
        return items.filter((c) => {
            const matchesSeverity = selectedSeverity === "all" || c.severity === selectedSeverity
            const matchesDetermination =
                selectedDetermination === "all" || c.determination === selectedDetermination

            const saleTs = parseLooseDate(c.saleDate)
            const fromTs = dateFrom ? Date.parse(dateFrom) : null
            const toTs = dateTo ? Date.parse(dateTo) : null
            const matchesDate =
                (!fromTs || (saleTs !== null && saleTs >= fromTs)) &&
                (!toTs || (saleTs !== null && saleTs <= toTs))

            return matchesSeverity && matchesDetermination && matchesDate
        })
    }, [casesResponse, selectedSeverity, selectedDetermination, dateFrom, dateTo])

    const runExport = async (format: "csv" | "pdf", detectedFrom: string, detectedTo: string) => {
        setIsExporting(true)
        try {
            const fullCases = await getAdminCasesForExport({
                search: searchQuery || undefined,
                status: selectedStatus !== "all" ? adminStatusToCaseStatus[selectedStatus as AdminCaseStatus] : undefined,
                agency_id: selectedAgency !== "all" ? selectedAgency : undefined,
                detected_from: detectedFrom || undefined,
                detected_to: detectedTo || undefined,
            })

            // Severity/determination filters aren't backend query params yet
            // (see comment above on filteredCases) — apply them client-side
            // over the full exported dataset, same as the on-screen table.
            const items = fullCases.items.filter((c) => {
                const matchesSeverity = selectedSeverity === "all" || c.severity === selectedSeverity
                const matchesDetermination =
                    selectedDetermination === "all" || c.determination === selectedDetermination
                return matchesSeverity && matchesDetermination
            })

            if (items.length === 0) {
                toast.error("No cases found for the selected date range/filters")
                return
            }

            const dataToExport = items.map(c => ({
                caseId: c.caseId,
                agencyName: c.agencyName || "—",
                sellerName: c.sellerName || "—",
                buyerName: c.buyerName || "—",
                address: c.propertyAddress || "—",
                amount: c.amount || "—",
                status: c.adminStatus || "—",
                severity: c.severity || "—",
                determination: c.determination || "—",
                date: c.saleDate || "—"
            }));

            if (format === "csv") {
                exportToCSV(dataToExport, "cases_report.csv");
            } else {
                exportToPDF(dataToExport, "Cases Management Report");
            }
        } catch (error) {
            toast.error(extractErrorMessage(error, "Failed to export cases. Please try again."))
        } finally {
            setIsExporting(false)
        }
    }

    const handleExport = (format: "csv" | "pdf") => {
        setPendingFormat(format)
        if (dateFrom || dateTo) {
            // Filter row already has a date range set — use it directly,
            // no need to prompt again.
            void runExport(format, dateFrom, dateTo)
            return
        }
        setExportDateFrom("")
        setExportDateTo("")
        setExportDialogOpen(true)
    }

    const handleConfirmExport = async (mode: "all" | "range") => {
        if (!pendingFormat) return
        if (mode === "range") {
            await runExport(pendingFormat, exportDateFrom, exportDateTo)
        } else {
            await runExport(pendingFormat, "", "")
        }
        setExportDialogOpen(false)
        setPendingFormat(null)
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Case Management" />

            <DashboardPageContent>
                <DashboardPanel
                    title="Case List"
                    description="Monitor property-related fraud cases on Property Eye System"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex w-full flex-col gap-2.5">
                            {/* Row 1 — Search + Primary Filters + Icons */}
                            <div className="flex gap-2 items-center flex-wrap">
                                <div className="relative flex-1 min-w-[200px] lg:max-w-md">
                                    <SearchNormal
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        placeholder="Search by ID, Address, or Parties..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setPage(1)
                                        }}
                                        className="h-8 rounded-full border-border bg-background pl-9 text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                </div>

                                <Select value={selectedStatus} onValueChange={(v) => { setSelectedStatus(v); setPage(1) }}>
                                    <SelectTrigger className="h-8 w-fit min-w-[100px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Case Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Case Statuses</SelectItem>
                                        {statusOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                                    <SelectTrigger className="h-8 w-fit min-w-[100px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Timing Risk" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Timing Risk</SelectItem>
                                        {severityOptions.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="h-8 w-8 p-0 shrink-0"
                                        title="Clear all filters"
                                    >
                                        <CloseCircle size={16} variant="Linear" />
                                    </Button>
                                )}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 shrink-0"
                                            title="Export results"
                                            disabled={isExporting}
                                        >
                                            {isExporting ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <ArrowDown2 size={16} variant="Linear" />
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Row 2 — Secondary Filters + Date Range */}
                            <div className="flex gap-2 items-center flex-wrap">
                                <Select value={selectedAgency} onValueChange={(v) => { setSelectedAgency(v); setPage(1) }}>
                                    <SelectTrigger className="h-8 w-fit min-w-[100px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Agency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Agencies</SelectItem>
                                        {(agencies ?? []).map((agency) => (
                                            <SelectItem key={agency.id} value={agency.id}>
                                                {agency.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedDetermination} onValueChange={setSelectedDetermination}>
                                    <SelectTrigger className="h-8 w-fit min-w-[140px] shrink-0 rounded-full border-border bg-background px-3 text-xs focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Determination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Determinations</SelectItem>
                                        {determinationOptions.map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-1.5 ml-auto">
                                    <Calendar size={16} variant="Linear" className="text-muted-foreground" />
                                    <Input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="h-8 px-2 text-xs rounded border border-border bg-background w-28 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        title="Sale date from"
                                    />
                                    <span className="text-xs text-muted-foreground">–</span>
                                    <Input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="h-8 px-2 text-xs rounded border border-border bg-background w-28 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        title="Sale date to"
                                    />
                                </div>
                            </div>
                        </div>
                    }
                >
                    {isLoading ? (
                        <p className="p-6 text-sm text-muted-foreground">Loading cases…</p>
                    ) : (
                        <AdminCasesTable
                            data={filteredCases}
                            page={casesResponse?.page ?? 1}
                            totalPages={Math.ceil((casesResponse?.total ?? 0) / (casesResponse?.page_size ?? 20)) || 1}
                            onPageChange={setPage}
                        />
                    )}
                </DashboardPanel>
            </DashboardPageContent>

            <Dialog open={exportDialogOpen} onOpenChange={(open) => !isExporting && setExportDialogOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export Cases</DialogTitle>
                        <DialogDescription>
                            No date range is set in the filters above. Choose a detection-date range to export, or export all matching cases (up to 10,000 rows).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="case-export-from">Detected from</Label>
                            <input
                                id="case-export-from"
                                type="date"
                                value={exportDateFrom}
                                onChange={(e) => setExportDateFrom(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="case-export-to">Detected to</Label>
                            <input
                                id="case-export-to"
                                type="date"
                                value={exportDateTo}
                                onChange={(e) => setExportDateTo(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button variant="outline" onClick={() => handleConfirmExport("all")} disabled={isExporting}>
                            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Export all
                        </Button>
                        <Button onClick={() => handleConfirmExport("range")} disabled={isExporting || (!exportDateFrom && !exportDateTo)}>
                            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Export date range
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    )
}

export default AdminCaseManagement
