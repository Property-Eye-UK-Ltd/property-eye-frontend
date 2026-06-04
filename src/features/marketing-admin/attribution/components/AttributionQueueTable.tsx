import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    AttributionClaim,
    AttributionClaimStatus,
    attributionClaimStatusStyles,
    attributionMethodStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7
const STATUS_FILTERS: Array<AttributionClaimStatus | "All"> = ["All", "Pending", "Conflict", "Approved", "Rejected"]

interface AttributionQueueTableProps {
    data: AttributionClaim[]
}

export const AttributionQueueTable = ({ data }: AttributionQueueTableProps) => {
    const [statusFilter, setStatusFilter] = useState<AttributionClaimStatus | "All">("All")
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
            title="Attribution Queue"
            description="Claims awaiting approval, conflict resolution, or lock."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AttributionClaimStatus | "All")}>
                    <SelectTrigger className="h-8 w-[130px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_FILTERS.map((s) => (
                            <SelectItem key={s} value={s}>{s === "All" ? "All statuses" : s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[880px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Claimant</TableHead>
                            <TableHead className={th}>Method</TableHead>
                            <TableHead className={th}>Conflict</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((claim) => (
                            <TableRow key={claim.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>{claim.agency}</TableCell>
                                <TableCell className={td}>{claim.claimant}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", attributionMethodStyles[claim.method])}>
                                        {claim.method}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{claim.conflictWith ?? "—"}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", attributionClaimStatusStyles[claim.status])}>
                                        {claim.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    {(claim.status === "Pending" || claim.status === "Conflict") ? (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toast.success(`Approved attribution for ${claim.agency}`)}
                                                className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => toast.error(`Rejected claim for ${claim.agency}`)}
                                                className="text-xs font-medium text-red-600 hover:underline lg:text-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted-foreground lg:text-sm">Closed</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {filtered.length > 0 && (
                <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
        </DashboardPanel>
    )
}
