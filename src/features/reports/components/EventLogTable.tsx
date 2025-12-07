import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, ArrowRight } from "iconsax-react"
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

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-6 py-3 font-medium text-muted-foreground">Actor</TableHead>
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
                                <TableCell className="px-6 py-4 text-sm text-foreground">{entry.actor}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-muted-foreground">{entry.role}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal shadow-none", actionTypeStyles[entry.actionType])}>
                                        {entry.actionType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal shadow-none", targetObjectStyles[entry.targetObject])}>
                                        {entry.targetObject}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-muted-foreground">{entry.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "h-9 w-9 rounded-full border text-sm font-medium transition-colors",
                                currentPage === page
                                    ? "bg-primary text-secondary border-primary"
                                    : "text-primary border-transparent hover:border-primary"
                            )}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={16} variant="Outline" className="text-primary" />
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        Next
                        <ArrowRight size={16} variant="Outline" className="text-primary" />
                    </button>
                </div>
            </div>
        </>
    )
}
