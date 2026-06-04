import { useState, useMemo, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    MarketerFraudCase,
    MarketerFraudStatus,
    marketerFraudStatusStyles,
    commissionEligibilityStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const ITEMS_PER_PAGE = 8

const STATUS_FILTERS: Array<MarketerFraudStatus | "All"> = [
    "All",
    "Detected",
    "Under Review",
    "Confirmed",
    "Recovered",
]

interface MarketerFraudCasesTableProps {
    data: MarketerFraudCase[]
}

export const MarketerFraudCasesTable = ({ data }: MarketerFraudCasesTableProps) => {
    const [statusFilter, setStatusFilter] = useState<MarketerFraudStatus | "All">("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((c) => c.status === statusFilter)),
        [data, statusFilter]
    )

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [totalPages, currentPage])

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filtered.slice(start, start + ITEMS_PER_PAGE)
    }, [filtered, currentPage])

    return (
        <DashboardPanel
            title="Fraud Cases"
            description="Cases generating your commission. Read-only — statuses are managed by Property Eye."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as MarketerFraudStatus | "All")}>
                    <SelectTrigger className="h-8 w-[150px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_FILTERS.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status === "All" ? "All statuses" : status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Case Ref</TableHead>
                            <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Commission</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((fraudCase) => (
                            <TableRow key={fraudCase.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>
                                    {fraudCase.agency}
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {fraudCase.caseRef}
                                </TableCell>
                                <TableCell className={cn(td, "text-right text-muted-foreground")}>
                                    {fraudCase.fraudValue}
                                </TableCell>
                                <TableCell className={td}>
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                            marketerFraudStatusStyles[fraudCase.status]
                                        )}
                                    >
                                        {fraudCase.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                            commissionEligibilityStyles[fraudCase.commissionStatus]
                                        )}
                                    >
                                        {fraudCase.commissionStatus}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginated.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No fraud cases match this filter.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {filtered.length > 0 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </DashboardPanel>
    )
}
