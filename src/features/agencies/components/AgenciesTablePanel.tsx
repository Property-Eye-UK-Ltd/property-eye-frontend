import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"
import { AgencyRecord, accountStatusStyles, syncStatusStyles } from "@/data/agenciesData"

interface AgenciesTablePanelProps {
    data: AgencyRecord[]
    onViewAgency?: (agencyId: string) => void
}

export const AgenciesTablePanel = ({ data, onViewAgency }: AgenciesTablePanelProps) => {
    const [sortColumn, setSortColumn] = useState<keyof AgencyRecord | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)

    const handleSort = (column: keyof AgencyRecord) => {
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

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Agency Name</TableHead>
                            <TableHead className="px-4 font-medium">Plan Tier</TableHead>
                            <TableHead className="px-4 font-medium">Users</TableHead>
                            <TableHead className="px-4 font-medium">Open Cases</TableHead>
                            <TableHead className="px-4 font-medium">Last Data Sync & Status</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("accountStatus")}
                                >
                                    Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((agency) => (
                            <TableRow key={agency.id} className="border-b border-border">
                                <TableCell className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Checkbox className="data-[state=checked]:bg-progress data-[state=checked]:border-progress" />
                                        <span className="font-normal">{agency.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{agency.planTier}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{agency.users}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{agency.openCases}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm text-muted-foreground">{agency.lastDataSync}</span>
                                        <Badge
                                            className={cn("rounded-full px-3 py-0.5 text-xs font-medium w-fit", syncStatusStyles[agency.syncStatus])}
                                        >
                                            {agency.syncStatus}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", accountStatusStyles[agency.accountStatus])}>
                                        {agency.accountStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <button
                                        onClick={() => onViewAgency?.(agency.id)}
                                        className="text-sm font-medium transition-colors hover:underline"
                                        style={{ color: "var(--progress)" }}
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={cn(
                            "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                            currentPage === 1 ? "bg-primary text-secondary" : "text-primary"
                        )}
                    >
                        1
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={16} variant="Outline" className="text-primary" />
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ArrowRight size={16} variant="Outline" className="text-primary" />
                    </button>
                </div>
            </div>
        </>
    )
}
