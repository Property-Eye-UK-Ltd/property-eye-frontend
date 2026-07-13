import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { EventLogEntry } from "@/data/reportsData"
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"

interface EventLogTableProps {
    data: EventLogEntry[]
}

const ITEMS_PER_PAGE = 9

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-6 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-6 lg:py-3 lg:text-sm"

const actionTypeStyles: Record<string, string> = {
    "Determination Submitted": "bg-indigo-50 text-indigo-600 border border-indigo-100",
    "Case Approved & Closed": "bg-green-50 text-green-600 border border-green-100",
    "Determination Returned": "bg-amber-50 text-amber-600 border border-amber-100",
    "Agency Dispute Raised": "bg-orange-50 text-orange-600 border border-orange-100",
    "Case Reopened": "bg-blue-50 text-blue-600 border border-blue-100",
    "Attribution Claim Submitted": "bg-purple-50 text-purple-600 border border-purple-100",
    "Attribution Conflict Detected": "bg-red-50 text-red-600 border border-red-100",
    "Commission Approved": "bg-green-50 text-green-600 border border-green-100",
    "Suspension": "bg-purple-50 text-purple-600 border border-purple-100",
}

const targetObjectStyles: Record<string, string> = {
    Case: "bg-purple-50 text-purple-600 border border-purple-100",
    Agency: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Invoice: "bg-blue-50 text-blue-600 border border-blue-100",
}

type SortField = "actor" | "role" | "actionType" | "targetObject" | "date"
type SortDirection = "asc" | "desc"

export const EventLogTable = ({ data }: EventLogTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState<SortField | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedData = useMemo(() => {
        if (!sortField) return data

        return [...data].sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            if (sortField === "date") {
                const aDate = new Date(aValue)
                const bDate = new Date(bValue)
                return sortDirection === "asc" ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
            }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
            return 0
        })
    }, [data, sortField, sortDirection])

    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const sortBtnClass =
        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={cn(th, "text-muted-foreground")}>Actor</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("role")}>
                                    Role
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("actionType")}>
                                    Action
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("targetObject")}>
                                    Target
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("date")}>
                                    Date
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((entry, index) => (
                            <TableRow key={index} className="border-b border-border">
                                <TableCell className={cn(td, "text-foreground")}>{entry.actor}</TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{entry.role}</TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs",
                                            actionTypeStyles[entry.actionType]
                                        )}
                                    >
                                        {entry.actionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs",
                                            targetObjectStyles[entry.targetObject]
                                        )}
                                    >
                                        {entry.targetObject}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {entry.date}
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
        </>
    )
}
