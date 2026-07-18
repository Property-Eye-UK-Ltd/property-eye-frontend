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
import { Filter, ArrowDown2 } from "iconsax-react"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { InvoiceResponse } from "@/features/billing/api/billingService"

const ITEMS_PER_PAGE = 7

interface PaymentHistoryTableProps {
    invoices: InvoiceResponse[]
    onDownload?: (invoiceNumber: string) => void
}

export const PaymentHistoryTable = ({ invoices, onDownload }: PaymentHistoryTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<"billingDate" | "amount" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const sortedPayments = useMemo(() => {
        if (!sortColumn) return invoices
        const direction = sortDirection === "asc" ? 1 : -1

        return [...invoices].sort((a, b) => {
            if (sortColumn === "billingDate") {
                return (new Date(a.billing_date).getTime() - new Date(b.billing_date).getTime()) * direction
            }
            if (sortColumn === "amount") {
                return (a.amount_gbp - b.amount_gbp) * direction
            }
            if (sortColumn === "status") {
                return a.status.localeCompare(b.status) * direction
            }
            return 0
        })
    }, [sortColumn, sortDirection, invoices])

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
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Invoice Number</TableHead>
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
                            <TableRow key={payment.invoice_number} className="border-b border-border">
                                <TableCell className="px-4 py-3 text-foreground">
                                    {payment.invoice_number}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">
                                    {new Date(payment.billing_date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">
                                    £{payment.amount_gbp.toFixed(2)}
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge
                                        className={cn(
                                            "rounded-full px-3 py-1 text-xs font-normal",
                                            payment.status === "paid" || payment.status === "Successful"
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
                                        onClick={() => onDownload?.(payment.invoice_number)}
                                    >
                                        Download
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </DashboardPanel>
    )
}
