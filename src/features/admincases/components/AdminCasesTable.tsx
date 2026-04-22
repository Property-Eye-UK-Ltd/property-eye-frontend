import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"
import { AgencyCase } from "@/data/agencyCasesData"

interface AdminCasesTableProps {
    data: AgencyCase[]
}

export const AdminCasesTable = ({ data }: AdminCasesTableProps) => {
    const navigate = useNavigate()
    const [sortColumn, setSortColumn] = useState<keyof AgencyCase | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)

    const handleSort = (column: keyof AgencyCase) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleViewCase = (caseId: string) => {
        navigate(`/admin/cases/${encodeURIComponent(caseId)}`)
    }

    const sortedCases = useMemo(() => {
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

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Case ID</TableHead>
                            <TableHead className="px-4 font-medium">Agency Name</TableHead>
                            <TableHead className="px-4 font-medium">Property Address</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("completionDate")}
                                >
                                    Completion Date
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("buyerName")}
                                >
                                    Buyer Name
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">Status</TableHead>
                            <TableHead className="px-4 font-medium text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedCases.map((caseItem) => (
                            <TableRow key={caseItem.id} className="border-b border-border">
                                <TableCell className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Checkbox className="data-[state=checked]:bg-progress data-[state=checked]:border-progress" />
                                        <span className="text-muted-foreground">{caseItem.caseId}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.agencyName}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.propertyAddress}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.completionDate}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.buyerName}</TableCell>
                                <TableCell className="px-4 py-4">
                                    {caseItem.status === "CHECKED" ? (
                                        <Badge className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 border border-green-100">
                                            CHECKED
                                        </Badge>
                                    ) : (
                                        <Badge className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600 border border-amber-100">
                                            PENDING
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => handleViewCase(caseItem.caseId)}
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
