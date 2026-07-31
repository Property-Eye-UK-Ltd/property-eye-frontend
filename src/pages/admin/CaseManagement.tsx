import { useMemo, useState } from "react"
import { isAxiosError } from "axios"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchNormal, Filter, ExportSquare } from "iconsax-react"
import { AdminCasesTable } from "@/features/admincases/components/AdminCasesTable"
import { AdminCasesFilterModal } from "@/features/admincases/components/AdminCasesFilterModal"
import { AdminCaseStatus } from "@/data/agencyCasesData"
import { useAdminCaseAgencies, useAdminCases } from "@/features/admincases/api/useAdminCases"
import { adminStatusToCaseStatus, getAdminCasesForExport } from "@/features/admincases/api/adminCasesService"
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"
import { AdminCasesFilters, emptyAdminCasesFilters, countActiveFilters } from "@/features/admincases/types/adminCasesFilters.types"
import type { FraudReportAgencyOption } from "@/features/casescans/api/scanService"

const extractErrorMessage = (error: unknown, fallback: string): string => {
    if (!isAxiosError(error)) return fallback
    const detail = (error.response?.data as { detail?: string } | undefined)?.detail
    return typeof detail === "string" ? detail : fallback
}

const AdminCaseManagement = () => {
    const { toast } = useToast()
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState<AdminCasesFilters>(emptyAdminCasesFilters)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [isExporting, setIsExporting] = useState(false)
    const [agencyOptions, setAgencyOptions] = useState<FraudReportAgencyOption[]>([])

    const handleClearFilters = () => {
        setSearchQuery("")
        setFilters(emptyAdminCasesFilters)
        setPage(1)
    }

    // Only fetch agencies when filter modal is needed (already lazy in CaseManagement pattern)
    const { data: agencies } = useAdminCaseAgencies()

    // Convert agencies from useAdminCaseAgencies to FraudReportAgencyOption format
    const fraudReportAgencies = (agencies || []).map(agency => ({
      id: agency.id,
      name: agency.name,
    }))

    // Populate agency options for filter modal
    if (fraudReportAgencies.length > 0 && agencyOptions.length === 0) {
      setAgencyOptions(fraudReportAgencies)
    }

    const { data: casesResponse, isLoading } = useAdminCases({
        page,
        page_size: 20,
        search: searchQuery || undefined,
        status: filters.status.length > 0 ? adminStatusToCaseStatus[filters.status[0] as AdminCaseStatus] : undefined,
        agency_ids: filters.agencyIds.length > 0 ? filters.agencyIds : undefined,
    })

    const parseLooseDate = (value: string) => {
        const t = Date.parse(value)
        return Number.isNaN(t) ? null : t
    }

    // Apply client-side filters (severity, determination, sale-date range)
    const filteredCases = useMemo(() => {
        const items = casesResponse?.items ?? []
        return items.filter((c) => {
            const matchesSeverity = filters.riskLevels.length === 0 || filters.riskLevels.includes(c.severity)
            const matchesDetermination =
                filters.determinations.length === 0 || filters.determinations.includes(c.determination || "")

            const saleTs = parseLooseDate(c.saleDate)
            const fromTs = filters.saleFromDate ? Date.parse(filters.saleFromDate) : null
            const toTs = filters.saleToDate ? Date.parse(filters.saleToDate) : null
            const matchesDate =
                (!fromTs || (saleTs !== null && saleTs >= fromTs)) &&
                (!toTs || (saleTs !== null && saleTs <= toTs))

            return matchesSeverity && matchesDetermination && matchesDate
        })
    }, [casesResponse, filters.riskLevels, filters.determinations, filters.saleFromDate, filters.saleToDate])

    const handleExport = async (format: "csv" | "pdf") => {
        setIsExporting(true)
        try {
            // Export the full filtered result set (server-capped at 10,000), not
            // just the currently visible page.
            const response = await getAdminCasesForExport({
                search: searchQuery || undefined,
                status: filters.status.length > 0 ? adminStatusToCaseStatus[filters.status[0] as AdminCaseStatus] : undefined,
                agency_ids: filters.agencyIds.length > 0 ? filters.agencyIds : undefined,
            })

            // Apply client-side filters (severity, determination, sale-date range)
            const items = response.items.filter((c) => {
                const matchesSeverity = filters.riskLevels.length === 0 || filters.riskLevels.includes(c.severity)
                const matchesDetermination =
                    filters.determinations.length === 0 || filters.determinations.includes(c.determination || "")

                const saleTs = parseLooseDate(c.saleDate)
                const fromTs = filters.saleFromDate ? Date.parse(filters.saleFromDate) : null
                const toTs = filters.saleToDate ? Date.parse(filters.saleToDate) : null
                const matchesDate =
                    (!fromTs || (saleTs !== null && saleTs >= fromTs)) &&
                    (!toTs || (saleTs !== null && saleTs <= toTs))

                return matchesSeverity && matchesDetermination && matchesDate
            })

            const dataToExport = items.map((c) => ({
                address: c.propertyAddress || "—",
                purchaser: c.purchaserName || "—",
                agency: c.agencyName || "—",
                timingRisk: c.severity || "—",
                caseStatus: c.adminStatus || "—",
                determination: c.determination || "—",
                withdrawal: c.withdrawalDate || "—",
                saleDate: c.saleDate || "—",
            }))

            if (format === "csv") {
                exportToCSV(dataToExport, "cases_management_report.csv")
            } else {
                exportToPDF(dataToExport, "Cases Management Report")
            }
        } catch (error) {
            toast({
                title: "Export failed",
                description: extractErrorMessage(error, "Failed to export cases"),
                variant: "destructive",
            })
        } finally {
            setIsExporting(false)
        }
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

                            {(searchQuery || countActiveFilters(filters) > 0) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearFilters}
                                    className="h-8 shrink-0 text-xs"
                                >
                                    Clear filters
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsFilterModalOpen(true)}
                                className="h-8 shrink-0 rounded-full gap-2 text-xs"
                            >
                                <Filter size={16} variant="Linear" />
                                Filter
                                {countActiveFilters(filters) > 0 && (
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                        {countActiveFilters(filters)}
                                    </span>
                                )}
                            </Button>

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
                                            <ExportSquare size={16} variant="Linear" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem className="cursor-pointer text-xs" disabled={isExporting} onClick={() => handleExport("csv")}>
                                        <ExportSquare size={14} variant="Linear" className="mr-2" />
                                        {isExporting ? "Exporting..." : "Export as CSV"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-xs" disabled={isExporting} onClick={() => handleExport("pdf")}>
                                        <ExportSquare size={14} variant="Linear" className="mr-2" />
                                        {isExporting ? "Exporting..." : "Export as PDF"}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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

            <AdminCasesFilterModal
                open={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                filters={filters}
                onApply={(nextFilters) => {
                    setFilters(nextFilters)
                    setPage(1)
                }}
                agencyOptions={agencyOptions}
            />
        </DashboardLayout>
    )
}

export default AdminCaseManagement
