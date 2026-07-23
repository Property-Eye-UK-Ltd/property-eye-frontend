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
import { cn } from "@/lib/utils"
import type { InvoiceResponse } from "@/features/billing/api/billingService"

interface PaymentHistoryTableProps {
    invoices: InvoiceResponse[]
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onDownload?: (invoiceNumber: string) => void
}

export const PaymentHistoryTable = ({
    invoices,
    total,
    page,
    pageSize,
    onPageChange,
    onDownload,
}: PaymentHistoryTableProps) => {
    const totalPages = Math.ceil(total / pageSize) || 1

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
                            <TableHead className="px-4 font-medium">Billing Date</TableHead>
                            <TableHead className="px-4 font-medium">Amount</TableHead>
                            <TableHead className="px-4 font-medium">Status</TableHead>
                            <TableHead className="px-4 font-medium text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((payment) => (
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
                <TablePagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </DashboardPanel>
    )
}
