import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
    MarketerAgency,
    MarketerAgencyStatus,
    marketerAgencyStatusStyles,
    attributionMethodStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const ITEMS_PER_PAGE = 7

const STATUS_FILTERS: Array<MarketerAgencyStatus | "All"> = ["All", "Active", "Pending", "Rejected"]

interface MarketerAgenciesTableProps {
    data: MarketerAgency[]
}

export const MarketerAgenciesTable = ({ data }: MarketerAgenciesTableProps) => {
    const [statusFilter, setStatusFilter] = useState<MarketerAgencyStatus | "All">("All")
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
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as MarketerAgencyStatus | "All")}>
                    <SelectTrigger className="h-8 w-[130px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_FILTERS.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status === "All" ? "All statuses" : status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[820px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency Name</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={th}>Date Added</TableHead>
                            <TableHead className={th}>Attribution</TableHead>
                            <TableHead className={cn(th, "text-right")}>Total Fraud Value</TableHead>
                            <TableHead className={cn(th, "text-right")}>Commission Earned</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((agency) => (
                            <TableRow key={agency.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>
                                    {agency.name}
                                </TableCell>
                                <TableCell className={td}>
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                            marketerAgencyStatusStyles[agency.status]
                                        )}
                                    >
                                        {agency.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {agency.dateAdded}
                                </TableCell>
                                <TableCell className={td}>
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                            attributionMethodStyles[agency.attributionMethod]
                                        )}
                                    >
                                        {agency.attributionMethod}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right text-muted-foreground")}>
                                    {agency.totalFraudValue}
                                </TableCell>
                                <TableCell className={cn(td, "text-right font-medium text-foreground")}>
                                    {agency.totalCommission}
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    {agency.attributed ? (
                                        <button
                                            onClick={() => toast.info(`Agency detail for ${agency.name} is coming soon`)}
                                            className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                        >
                                            View details
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => toast.info(`Submit a claim for ${agency.name} — coming soon`)}
                                            className="text-xs font-medium text-secondary-foreground/80 hover:underline lg:text-sm"
                                        >
                                            Submit claim
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginated.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No agencies match this filter.
                                </TableCell>
                            </TableRow>
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
