import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AgencyPerformanceReport } from "@/data/reportsData"

interface DetailedPerformanceTableProps {
    data: AgencyPerformanceReport[]
}

export const DetailedPerformanceTable = ({ data }: DetailedPerformanceTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="px-4 font-medium">Agency Name</TableHead>
                        <TableHead className="px-4 font-medium">Type</TableHead>
                        <TableHead className="px-4 font-medium">Total Checks</TableHead>
                        <TableHead className="px-4 font-medium">Fraud Detected</TableHead>
                        <TableHead className="px-4 font-medium">Commission Recovered</TableHead>
                        <TableHead className="px-4 font-medium">Subscription Rev.</TableHead>
                        <TableHead className="px-4 font-medium">Health</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((agency, index) => (
                        <TableRow key={index} className="border-b border-border">
                            <TableCell className="px-4 py-3 font-medium text-foreground">
                                {agency.agencyName}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                <Badge className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-primary/5 text-primary border border-primary/10">
                                    {agency.integrationType}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-muted-foreground">{agency.totalChecks.toLocaleString()}</TableCell>
                            <TableCell className="px-4 py-3 text-muted-foreground">{agency.fraudDetected}</TableCell>
                            <TableCell className="px-4 py-3 text-green-600 font-medium">{agency.commissionRecovered}</TableCell>
                            <TableCell className="px-4 py-3 text-primary font-medium">{agency.revenueGenerated}</TableCell>
                            <TableCell className="px-4 py-4">
                                <Badge
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs font-normal",
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
