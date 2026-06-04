import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { DocumentText } from "iconsax-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { AdminPayoutRecord, PaymentStatus, paymentStatusStyles } from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7
const STATUS_FILTERS: Array<PaymentStatus | "All"> = ["All", "Paid", "Scheduled", "Rejected"]

interface AdminPayoutsTableProps {
    data: AdminPayoutRecord[]
}

export const AdminPayoutsTable = ({ data }: AdminPayoutsTableProps) => {
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | "All">("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((p) => p.status === statusFilter)),
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
            title="Payout History"
            description="Batch payments across all marketers."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PaymentStatus | "All")}>
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
                <Table className="min-w-[680px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Marketer</TableHead>
                            <TableHead className={th}>Period</TableHead>
                            <TableHead className={cn(th, "text-right")}>Amount</TableHead>
                            <TableHead className={th}>Date</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((payout) => (
                            <TableRow key={payout.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>{payout.marketer}</TableCell>
                                <TableCell className={td}>{payout.period}</TableCell>
                                <TableCell className={cn(td, "text-right font-medium")}>{payout.amount}</TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{payout.date}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", paymentStatusStyles[payout.status])}>
                                        {payout.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    <button
                                        onClick={() => toast.success(`Exported payout for ${payout.marketer}`)}
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-progress hover:underline lg:text-sm"
                                    >
                                        <DocumentText size={16} variant="Bulk" />
                                        Export
                                    </button>
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
