import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    AdminDispute,
    DisputeStatus,
    disputeStatusStyles,
    disputeTypeStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7
const STATUS_FILTERS: Array<DisputeStatus | "All"> = ["All", "Open", "Under Review", "Resolved"]

interface AdminDisputesTableProps {
    data: AdminDispute[]
}

export const AdminDisputesTable = ({ data }: AdminDisputesTableProps) => {
    const [statusFilter, setStatusFilter] = useState<DisputeStatus | "All">("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((d) => d.status === statusFilter)),
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
            title="Dispute Resolution"
            description="Marketer disputes linked to agencies and commission records."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as DisputeStatus | "All")}>
                    <SelectTrigger className="h-8 w-[140px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
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
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Reference</TableHead>
                            <TableHead className={th}>Marketer</TableHead>
                            <TableHead className={th}>Type</TableHead>
                            <TableHead className={th}>Linked Record</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((dispute) => (
                            <TableRow key={dispute.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>{dispute.reference}</TableCell>
                                <TableCell className={td}>{dispute.marketer}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", disputeTypeStyles[dispute.type])}>
                                        {dispute.type}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{dispute.linkedRecord}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", disputeStatusStyles[dispute.status])}>
                                        {dispute.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    {dispute.status !== "Resolved" ? (
                                        <button
                                            onClick={() => toast.success(`Resolved ${dispute.reference}`)}
                                            className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                        >
                                            Resolve
                                        </button>
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
