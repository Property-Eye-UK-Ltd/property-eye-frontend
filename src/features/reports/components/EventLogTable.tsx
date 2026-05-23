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

// Badge styles for different action types
const actionTypeStyles: Record<string, string> = {
    "Triggered Case": "bg-red-50 text-red-600 border border-red-100",
    "Closed Case": "bg-red-50 text-red-600 border border-red-100",
    "Suspension": "bg-purple-50 text-purple-600 border border-purple-100",
    "Role Override": "bg-purple-50 text-purple-600 border border-purple-100",
    "Printed Invoice": "bg-gray-50 text-gray-600 border border-gray-200",
}

// Badge styles for different target objects
const targetObjectStyles: Record<string, string> = {
    "Case": "bg-purple-50 text-purple-600 border border-purple-100",
    "Agency": "bg-yellow-50 text-yellow-600 border border-yellow-100",
    "Invoice": "bg-blue-50 text-blue-600 border border-blue-100",
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
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentData = sortedData.slice(startIndex, endIndex)

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[700px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-2 py-2 text-xs font-medium text-muted-foreground lg:px-6 lg:py-3 lg:text-sm">Actor</TableHead>
                            <TableHead className="px-6 py-3 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("role")}
                                >
                                    Role
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-6 py-3 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("actionType")}
                                >
                                    Action Type
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-6 py-3 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("targetObject")}
                                >
                                    Target Object
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-6 py-3 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("date")}
                                >
                                    Date
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((entry, index) => (
                            <TableRow key={index} className="border-b border-border">
                                <TableCell className="px-2 py-2 text-xs text-foreground lg:px-6 lg:py-3 lg:text-sm">{entry.actor}</TableCell>
                                <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-6 lg:py-3 lg:text-sm">{entry.role}</TableCell>
                                <TableCell className="px-2 py-2 lg:px-6 lg:py-3">
                                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs", actionTypeStyles[entry.actionType])}>
                                        {entry.actionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-2 py-2 lg:px-6 lg:py-3">
                                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs", targetObjectStyles[entry.targetObject])}>
                                        {entry.targetObject}
                                    </Badge>
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-2 py-2 text-xs text-muted-foreground lg:px-6 lg:py-3 lg:text-sm">{entry.date}</TableCell>
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
