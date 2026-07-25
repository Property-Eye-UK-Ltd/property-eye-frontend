import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { DocumentText } from "iconsax-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Payout } from "@/features/marketing/api/marketerService"
import { getMarketerPayoutStatement } from "@/features/marketing/api/marketerService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const ITEMS_PER_PAGE = 7

const statusStyles: Record<string, string> = {
    paid: "bg-green-50 text-green-600 border border-green-100",
    scheduled: "bg-amber-50 text-amber-600 border border-amber-100",
    rejected: "bg-red-50 text-red-600 border border-red-100",
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

interface PaymentsHistoryTableProps {
    data: Payout[]
    isLoading?: boolean
}

export const PaymentsHistoryTable = ({ data, isLoading }: PaymentsHistoryTableProps) => {
    const navigate = useNavigate()
    const statusOptions = useMemo(() => ["All", ...Array.from(new Set(data.map((p) => p.status)))], [data])
    const [statusFilter, setStatusFilter] = useState<string>("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [downloadingId, setDownloadingId] = useState<string | null>(null)

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

    const handleDownload = async (payoutId: string) => {
        setDownloadingId(payoutId)
        try {
            const { statement_url } = await getMarketerPayoutStatement(payoutId)
            window.open(statement_url, "_blank", "noopener,noreferrer")
        } catch {
            toast.error("Couldn't fetch that statement. Try again.")
        } finally {
            setDownloadingId(null)
        }
    }

    return (
        <DashboardPanel
            title="Payment History"
            description="Your payout history. Download a statement for any period."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[130px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status === "All" ? "All statuses" : status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Payment Date</TableHead>
                            <TableHead className={cn(th, "text-right")}>Amount</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Statement</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    Loading payments…
                                </TableCell>
                            </TableRow>
                        ) : paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No payments match this filter.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((payment) => (
                                <TableRow key={payment.id} className="border-b border-border">
                                    <TableCell className={cn(td, "whitespace-nowrap font-medium text-foreground")}>
                                        {formatDate(payment.created_at)}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right font-medium text-foreground")}>
                                        {formatCurrency(payment.amount)}
                                    </TableCell>
                                    <TableCell className={td}>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize lg:text-xs",
                                                statusStyles[payment.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                                            )}
                                        >
                                            {payment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right")}>
                                        <button
                                            onClick={() => handleDownload(payment.id)}
                                            disabled={downloadingId === payment.id}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-progress hover:underline disabled:opacity-60 lg:text-sm"
                                        >
                                            <DocumentText size={16} variant="Bulk" />
                                            {downloadingId === payment.id ? "Fetching…" : "Download"}
                                        </button>
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right")}>
                                        <button
                                            onClick={() => navigate(`/marketing/payments/${payment.id}`)}
                                            className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                        >
                                            View
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
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
