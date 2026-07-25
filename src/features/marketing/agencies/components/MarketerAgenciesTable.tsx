import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ReferredAgency } from "@/features/marketing/api/marketerService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const ITEMS_PER_PAGE = 7

const statusStyles: Record<string, string> = {
    active: "bg-green-50 text-green-600 border border-green-100",
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    rejected: "bg-red-50 text-red-600 border border-red-100",
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

interface MarketerAgenciesTableProps {
    data: ReferredAgency[]
    isLoading?: boolean
}

export const MarketerAgenciesTable = ({ data, isLoading }: MarketerAgenciesTableProps) => {
    const navigate = useNavigate()
    const statusOptions = useMemo(() => ["All", ...Array.from(new Set(data.map((a) => a.status)))], [data])
    const [statusFilter, setStatusFilter] = useState<string>("All")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((a) => a.status === statusFilter)),
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
            title="My Agencies"
            description="Agencies you've referred and their attribution status."
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
                <Table className="min-w-[760px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency Name</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={th}>Attribution</TableHead>
                            <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                            <TableHead className={cn(th, "text-right")}>Commission</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    Loading agencies…
                                </TableCell>
                            </TableRow>
                        ) : paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No agencies match this filter.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((agency) => (
                                <TableRow key={agency.id} className="border-b border-border">
                                    <TableCell className={cn(td, "font-medium text-foreground")}>
                                        {agency.name}
                                    </TableCell>
                                    <TableCell className={td}>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize lg:text-xs",
                                                statusStyles[agency.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                                            )}
                                        >
                                            {agency.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn(td, "capitalize text-muted-foreground")}>
                                        {agency.attribution_method}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right text-muted-foreground")}>
                                        {formatCurrency(agency.total_fraud_value)}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right font-medium text-foreground")}>
                                        {formatCurrency(agency.commission_earned)}
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right")}>
                                        <button
                                            onClick={() => navigate(`/marketing/agencies/${agency.id}`)}
                                            className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                        >
                                            View details
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
