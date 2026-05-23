import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AgencyPerformanceReport } from "@/data/reportsData"

interface DetailedPerformanceTableProps {
    data: AgencyPerformanceReport[]
}

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

export const DetailedPerformanceTable = ({ data }: DetailedPerformanceTableProps) => {
    return (
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <Table className="min-w-[800px]">
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={th}>Agency</TableHead>
                        <TableHead className={th}>Type</TableHead>
                        <TableHead className={th}>Checks</TableHead>
                        <TableHead className={th}>Fraud</TableHead>
                        <TableHead className={th}>Recovered</TableHead>
                        <TableHead className={th}>Rev.</TableHead>
                        <TableHead className={th}>Health</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((agency, index) => (
                        <TableRow key={index} className="border-b border-border">
                            <TableCell className={cn(td, "font-medium text-foreground")}>
                                {agency.agencyName}
                            </TableCell>
                            <TableCell className={td}>
                                <Badge className="rounded-full border border-primary/10 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary lg:px-2.5 lg:text-xs">
                                    {agency.integrationType}
                                </Badge>
                            </TableCell>
                            <TableCell className={cn(td, "text-muted-foreground")}>
                                {agency.totalChecks.toLocaleString()}
                            </TableCell>
                            <TableCell className={cn(td, "text-muted-foreground")}>
                                {agency.fraudDetected}
                            </TableCell>
                            <TableCell className={cn(td, "font-medium text-green-600")}>
                                {agency.commissionRecovered}
                            </TableCell>
                            <TableCell className={cn(td, "font-medium text-primary")}>
                                {agency.revenueGenerated}
                            </TableCell>
                            <TableCell className={td}>
                                <Badge
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-[10px] font-normal lg:px-3 lg:py-1 lg:text-xs",
                                        agency.syncHealth === "Healthy"
                                            ? "bg-green-50 text-green-600 border border-green-100"
                                            : agency.syncHealth === "Unhealthy"
                                              ? "bg-red-50 text-red-600 border border-red-100"
                                              : "bg-gray-50 text-gray-400 border border-gray-100"
                                    )}
                                >
                                    {agency.syncHealth === "-" ? "Offline" : agency.syncHealth}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
