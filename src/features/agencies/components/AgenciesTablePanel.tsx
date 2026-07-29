import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { AdminAgencyListItem } from "@/features/agencies/api/agencyService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface AgenciesTablePanelProps {
    data: AdminAgencyListItem[]
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    onViewAgency?: (agencyId: string) => void
}

export const AgenciesTablePanel = ({
    data,
    total,
    page,
    pageSize,
    onPageChange,
    onViewAgency,
}: AgenciesTablePanelProps) => {
    const totalPages = Math.ceil(total / pageSize) || 1

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency Name</TableHead>
                            <TableHead className={th}>Plan</TableHead>
                            <TableHead className={th}>Users</TableHead>
                            <TableHead className={th}>Integration</TableHead>
                            <TableHead className={th}>Fraud</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((agency) => (
                            <TableRow 
                                key={agency.id} 
                                onClick={() => onViewAgency?.(agency.id)}
                                className="border-b border-border cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <TableCell className={td}>
                                    <div className="flex items-center gap-2">
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <Checkbox className="data-[state=checked]:border-progress data-[state=checked]:bg-progress" />
                                        </div>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <TablePagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </>
    )
}
