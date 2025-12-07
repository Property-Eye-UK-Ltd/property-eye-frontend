import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"
import { AgencyCase, caseSeverityStyles, caseFraudTypeStyles } from "@/data/agencyCasesData"

interface AgencyCasesTablePanelProps {
    data: AgencyCase[]
}

export const AgencyCasesTablePanel = ({ data }: AgencyCasesTablePanelProps) => {
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

    const sortedCases = useMemo(() => {
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
                            <TableHead className="px-4 font-medium">Case ID</TableHead>
                            <TableHead className="px-4 font-medium">Property Address</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("fraudType")}
                                >
                                    Fraud Type
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">Score</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("severity")}
                                >
                                    Severity
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">Date Detected</TableHead>
                            <TableHead className="px-4 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedCases.map((caseItem) => (
                            <TableRow key={caseItem.id} className="border-b border-border">
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.caseId}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.propertyAddress}</TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", caseFraudTypeStyles[caseItem.fraudType])}>
                                        {caseItem.fraudType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.score}%</TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", caseSeverityStyles[caseItem.severity])}>
                                        {caseItem.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{caseItem.dateDetected}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <button
                                        onClick={() => navigate(`/admin/cases/${encodeURIComponent(caseItem.caseId)}`, {
                                            state: {
                                                returnPath: window.location.pathname,
                                                returnLabel: "Agency Profile",
                                                activeTab: "cases"
                                            }
                                        })}
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
