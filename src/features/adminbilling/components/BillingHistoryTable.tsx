import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { BillingTransaction, billingStatusStyles } from "@/data/adminBillingData"
import { Skeleton } from "@/components/ui/skeleton"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface BillingHistoryTableProps {
    data: BillingTransaction[]
    isLoading?: boolean
}

export const BillingHistoryTable = ({ data, isLoading = false }: BillingHistoryTableProps) => {
    const navigate = useNavigate()
    const [sortColumn, setSortColumn] = useState<keyof BillingTransaction | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSort = (column: keyof BillingTransaction) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedData = useMemo(() => {
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

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return sortedData.slice(start, start + itemsPerPage)
    }, [sortedData, currentPage, itemsPerPage])

    const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [totalPages, currentPage])

    const sortBtnClass =
        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[760px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Transaction</TableHead>
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Plan</TableHead>
                            <TableHead className={th}>Amount</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("transactionDate")}>
                                    Date
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("status")}>
                                    Status
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-40" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-16" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    No transaction records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((transaction) => (
                            <TableRow 
                                key={transaction.id} 
                                onClick={() => navigate(`/admin/billing/transaction/${transaction.id}`)}
                                className="border-b border-border cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {transaction.transactionId}
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {transaction.agencyName}
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {transaction.planTier}
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>
                                    {transaction.amount}
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {transaction.transactionDate}
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-normal lg:px-3 lg:py-1 lg:text-xs",
                                            billingStatusStyles[transaction.status]
                                        )}
                                    >
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )))}
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
