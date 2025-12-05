import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AgencyRecord, accountStatusStyles, syncStatusStyles } from "@/data/agenciesData"

interface AgenciesTableProps {
    data: AgencyRecord[]
    onSort?: (column: keyof AgencyRecord) => void
    onViewAgency?: (agencyId: string) => void
}

export const AgenciesTable = ({ data, onSort, onViewAgency }: AgenciesTableProps) => {
    return (
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
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("accountStatus")}
                                >
                                    Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "Status"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((agency) => (
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
                                    <Badge className={cn("rounded-full px-3 py-0.5 text-xs font-medium w-fit", syncStatusStyles[agency.syncStatus])}>
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
    )
}
