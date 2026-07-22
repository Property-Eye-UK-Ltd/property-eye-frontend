import { useState, useMemo, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminAgencyListItem } from "@/features/agencies/api/agencyService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface AgenciesTablePanelProps {
    data: AdminAgencyListItem[]
    onViewAgency?: (agencyId: string) => void
}

export const AgenciesTablePanel = ({ data, onViewAgency }: AgenciesTablePanelProps) => {
    const [sortColumn, setSortColumn] = useState<keyof AdminAgencyListItem | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSort = (column: keyof AdminAgencyListItem) => {
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
            if (typeof aValue === "number" && typeof bValue === "number") {
                return (aValue - bValue) * direction
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
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency Name</TableHead>
                            <TableHead className={th}>Plan</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("users")}>
                                    Users
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>Integration</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("fraud_detected")}>
                                    Fraud
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((agency) => (
                            <TableRow key={agency.id} className="border-b border-border">
                                <TableCell className={td}>
                                    <div className="flex items-center gap-2">
                                        <Checkbox className="data-[state=checked]:border-progress data-[state=checked]:bg-progress" />
                                        <span className="whitespace-nowrap font-normal">{agency.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{agency.plan_name ?? "—"}</TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{agency.users}</TableCell>
                                <TableCell className={td}>
                                    {agency.integration_type ? (
                                        <Badge className="rounded-full border border-primary/10 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary lg:px-3 lg:text-xs">
                                            {agency.integration_type}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{agency.fraud_detected}</TableCell>
                                <TableCell className={td}>
                                    <button
                                        onClick={() => onViewAgency?.(agency.id)}
                                        className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
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
