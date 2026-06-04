import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    AdminCommissionApproval,
    CommissionLineStatus,
    commissionLineStatusStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7
const STATUS_FILTERS: Array<CommissionLineStatus | "All"> = ["All", "Pending", "Approved", "Paid"]

interface CommissionApprovalTableProps {
    data: AdminCommissionApproval[]
}

export const CommissionApprovalTable = ({ data }: CommissionApprovalTableProps) => {
    const [statusFilter, setStatusFilter] = useState<CommissionLineStatus | "All">("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((r) => r.status === statusFilter)),
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
            title="Commission Approval Queue"
            description="Pending commissions awaiting admin approval before payout."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as CommissionLineStatus | "All")}>
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
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Marketer</TableHead>
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Fraud Case</TableHead>
                            <TableHead className={cn(th, "text-right")}>Amount</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((row) => (
                            <TableRow key={row.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>{row.marketer}</TableCell>
                                <TableCell className={td}>{row.agency}</TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{row.fraudCase}</TableCell>
                                <TableCell className={cn(td, "text-right font-medium")}>{row.amount}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", commissionLineStatusStyles[row.status])}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    {row.status === "Pending" ? (
                                        <button
                                            onClick={() => toast.success(`Approved commission ${row.fraudCase}`)}
                                            className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <span className="text-xs text-muted-foreground lg:text-sm">—</span>
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
