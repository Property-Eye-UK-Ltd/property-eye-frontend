import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AgencyCase, adminCaseStatusStyles, caseSeverityStyles } from "@/data/agencyCasesData"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface AdminCasesTableProps {
    data: AgencyCase[]
}

export const AdminCasesTable = ({ data }: AdminCasesTableProps) => {
    const navigate = useNavigate()
    const [sortColumn, setSortColumn] = useState<keyof AgencyCase | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

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

    const paginatedCases = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return sortedCases.slice(start, start + itemsPerPage)
    }, [sortedCases, currentPage, itemsPerPage])

    const totalPages = Math.ceil(sortedCases.length / itemsPerPage) || 1

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [totalPages, currentPage])

    const sortBtnClass =
        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[1100px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
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
                            <TableHead className={th}>Severity</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={th}>Determination</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCases.map((caseItem) => (
                            <TableRow key={caseItem.id} className="border-b border-border">
                                <TableCell className={td}>
                                    <div className="flex items-center gap-2">
                                        <Checkbox className="data-[state=checked]:border-progress data-[state=checked]:bg-progress" />
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
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <Badge
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs",
                                                adminCaseStatusStyles[caseItem.adminStatus]
                                            )}
                                        >
                                            {caseItem.adminStatus}
                                        </Badge>
                                        {caseItem.agencyDispute === "Open" && (
                                            <Badge className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 lg:px-3 lg:py-1 lg:text-xs">
                                                Dispute
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {caseItem.determination ?? "—"}
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    <button
                                        onClick={() => handleViewCase(caseItem.caseId)}
                                        className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    )
}
