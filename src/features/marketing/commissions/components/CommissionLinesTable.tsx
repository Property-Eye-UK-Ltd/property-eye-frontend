import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CommissionRow } from "@/features/marketing/api/marketerService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const ITEMS_PER_PAGE = 7

const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    approved: "bg-blue-50 text-blue-600 border border-blue-100",
    paid: "bg-green-50 text-green-600 border border-green-100",
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

interface CommissionLinesTableProps {
    data: CommissionRow[]
    isLoading?: boolean
}

export const CommissionLinesTable = ({ data, isLoading }: CommissionLinesTableProps) => {
    const navigate = useNavigate()
    const statusOptions = useMemo(() => ["All", ...Array.from(new Set(data.map((line) => line.status)))], [data])
    const [statusFilter, setStatusFilter] = useState<string>("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((line) => line.status === statusFilter)),
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
            title="Commission Breakdown"
            description="Every commission line tied to a recovered fraud case."
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
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                            <TableHead className={cn(th, "text-right")}>Commission %</TableHead>
                            <TableHead className={cn(th, "text-right")}>Amount</TableHead>
                            <TableHead className={th}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    Loading commissions…
                                </TableCell>
                            </TableRow>
                        ) : paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No commission lines match this filter.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((line) => (
                                <TableRow 
                                    key={line.id} 
                                    onClick={() => navigate(`/marketing/commissions/${line.id}`)}
                                    className="border-b border-border cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                    <TableCell className={cn(td, "font-medium text-foreground")}>
                                        {line.agency_name}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right text-muted-foreground")}>
                                        {formatCurrency(line.fraud_value)}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right text-muted-foreground")}>
                                        {line.commission_percent}%
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right font-medium text-foreground")}>
                                        {formatCurrency(line.commission_amount)}
                                    </TableCell>
                                    <TableCell className={td}>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize lg:text-xs",
                                                statusStyles[line.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                                            )}
                                        >
                                            {line.status}
                                        </span>
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
