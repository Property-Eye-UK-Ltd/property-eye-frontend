import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AgencyCase, caseSeverityStyles, caseFraudTypeStyles } from "@/data/agencyCasesData"

interface AgencyCasesTableProps {
    data: AgencyCase[]
    onSort?: (column: keyof AgencyCase) => void
}

export const AgencyCasesTable = ({ data, onSort }: AgencyCasesTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="px-4 font-medium">Case ID</TableHead>
                        <TableHead className="px-4 font-medium">Property Address</TableHead>
                        <TableHead className="px-4 font-medium">
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("fraudType")}
                                >
                                    Fraud Type
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "Fraud Type"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">Score</TableHead>
                        <TableHead className="px-4 font-medium">
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("severity")}
                                >
                                    Severity
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "Severity"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">Date Detected</TableHead>
                        <TableHead className="px-4 font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((caseItem) => (
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
    )
}
