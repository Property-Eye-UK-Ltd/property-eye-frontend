import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AgencyCase, adminCaseStatusStyles, caseSeverityStyles } from "@/data/agencyCasesData"
import { ScanIndicator } from "@/components/case-management/ScanIndicator"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface AdminCasesTableProps {
    data: (AgencyCase & { verification_status?: string; register_extract_fetched_at?: string | null })[]
    /** Server-side pagination (falls back to client-side single-page display when omitted) */
    page?: number
    totalPages?: number
    onPageChange?: (page: number) => void
}

export const AdminCasesTable = ({ data, page, totalPages, onPageChange }: AdminCasesTableProps) => {
    const navigate = useNavigate()
    const [sortColumn, setSortColumn] = useState<keyof AgencyCase | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [localPage, setLocalPage] = useState(1)

    const handleSort = (column: keyof AgencyCase) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleViewCase = (caseId: string) => {
        navigate(`/admin/cases/${encodeURIComponent(caseId)}`)
    }

    const sortedCases = useMemo(() => {
        if (!sortColumn) return data

        return [...data].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]
            const direction = sortDirection === "asc" ? 1 : -1

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * direction
            }
            return 0
        })
    }, [data, sortColumn, sortDirection])

    const currentPage = page ?? localPage
    const resolvedTotalPages = totalPages ?? 1
    const handlePageChange = onPageChange ?? setLocalPage

    const sortBtnClass =
        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[1100px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={cn(th, "w-8")}>Scan</TableHead>
                            <TableHead className={th}>Case ID</TableHead>
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Address</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("buyerName")}>
                                    Buyer
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>Withdrawal</TableHead>
                            <TableHead className={th}>Sale Date</TableHead>
                            <TableHead className={th}>Timing Risk</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={th}>Determination</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedCases.map((caseItem) => (
                            <TableRow
                                key={caseItem.id}
                                onClick={() => handleViewCase(caseItem.caseId)}
                                className="border-b border-border cursor-pointer hover:bg-slate-50/60"
                            >
                                <TableCell className={cn(td, "w-8 text-center")}>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <ScanIndicator
                                            verification_status={caseItem.verification_status as "suspicious" | "confirmed_fraud" | "not_fraud" | "error" | null}
                                            scan_date={caseItem.register_extract_fetched_at}
                                            onClick={() => handleViewCase(caseItem.caseId)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className={td}>
                                    <div className="flex items-center gap-2">
                                        <Checkbox className="data-[state=checked]:border-progress data-[state=checked]:bg-progress" onClick={(e) => e.stopPropagation()} />
                                        <span className="whitespace-nowrap text-muted-foreground">
                                            {caseItem.caseId}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {caseItem.agencyName}
                                </TableCell>
                                <TableCell className={cn(td, "max-w-[140px] truncate text-muted-foreground lg:max-w-none")}>
                                    {caseItem.propertyAddress}
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {caseItem.buyerName}
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {caseItem.withdrawalDate}
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {caseItem.saleDate}
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs", caseSeverityStyles[caseItem.severity])}>
                                        {caseItem.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs",
                                            adminCaseStatusStyles[caseItem.adminStatus]
                                        )}
                                    >
                                        {caseItem.adminStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {caseItem.determination ?? "—"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={resolvedTotalPages}
                onPageChange={handlePageChange}
            />
        </>
    )
}
