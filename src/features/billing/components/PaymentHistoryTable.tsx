import { useMemo, useState } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, ArrowDown2, ArrowLeft, ArrowRight } from "iconsax-react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { paymentHistory } from "@/data/billing-data"

const ITEMS_PER_PAGE = 7

export const PaymentHistoryTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<"billingDate" | "amount" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const sortedPayments = useMemo(() => {
        if (!sortColumn) return paymentHistory
        const direction = sortDirection === "asc" ? 1 : -1

        return [...paymentHistory].sort((a, b) => {
            if (sortColumn === "billingDate") {
                return (new Date(a.billingDate).getTime() - new Date(b.billingDate).getTime()) * direction
            }
            if (sortColumn === "amount") {
                const amountA = parseFloat(a.amount.replace(/[£,]/g, ""))
                const amountB = parseFloat(b.amount.replace(/[£,]/g, ""))
                return (amountA - amountB) * direction
            }
            if (sortColumn === "status") {
                return a.status.localeCompare(b.status) * direction
            }
            return 0
        })
    }, [sortColumn, sortDirection])

    const handleSort = (column: "billingDate" | "amount" | "status") => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    // Pagination logic
    const totalPages = Math.ceil(sortedPayments.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedPayments = sortedPayments.slice(startIndex, endIndex)

    return (
        <DashboardPanel
            title="Payment History"
            description="View all past billing transactions and payment records."
            className="overflow-hidden"
            noPadding
            hasBorder
            actions={
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-muted-foreground hover:bg-transparent hover:border-[var(--progress)]">
                        <Filter size={16} />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-muted-foreground hover:bg-transparent hover:border-[var(--progress)]">
                        Export
                        <ArrowDown2 size={16} />
                    </Button>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Invoice Number</TableHead>
                            <TableHead className="px-4 font-medium">Payment Type</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("billingDate")}
                                >
                                    Billing Date
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("amount")}
                                >
                                    Amount
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("status")}
                                >
                                    Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedPayments.map((payment) => (
                            <TableRow key={payment.id} className="border-b border-border">
                                <TableCell className="px-4 py-3 text-foreground">
                                    {payment.invoiceNumber}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">
                                    {payment.paymentType}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">
                                    {payment.billingDate}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">
                                    {payment.amount}
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge
                                        className={cn(
                                            "rounded-full px-3 py-1 text-xs font-normal",
                                            payment.status === "Successful"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"
                                        )}
                                    >
                                        {payment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                    <button
                                        className="text-sm font-normal transition-colors hover:underline"
                                        style={{ color: "var(--progress)" }}
                                    >
                                        Download
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex flex-col gap-4 border-t border-border px-4 py-4 text-white md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {[1].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={cn(
                                    "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                                    currentPage === page ? "bg-primary text-secondary" : "text-primary"
                                )}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50"
                        >
                            <ArrowLeft size={16} variant="Outline" className="text-primary" />
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50"
                        >
                            Next
                            <ArrowRight size={16} variant="Outline" className="text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
