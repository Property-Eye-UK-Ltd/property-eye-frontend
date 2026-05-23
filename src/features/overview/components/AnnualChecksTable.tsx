import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnnualChecksRecord } from "@/data/adminOverviewData"
import { agenciesData } from "@/data/agenciesData"

interface AnnualChecksTableProps {
    data: AnnualChecksRecord[]
}

export const AnnualChecksTable = ({ data }: AnnualChecksTableProps) => {
    return (
        <DashboardPanel
            title="Annual Checks Breakdown"
            description="Comparison of LR checks across two annual periods"
            noPadding
            hasBorder
            actions={
                <div className="flex gap-2">
                    <Select defaultValue="2025">
                        <SelectTrigger className="h-8 w-[80px] rounded-full border-border bg-background px-3 text-[10px] focus:ring-0">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="h-8 w-[120px] rounded-full border-border bg-background px-3 text-[10px] focus:ring-0">
                            <SelectValue placeholder="Agency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Agencies</SelectItem>
                            {Array.from(new Set(agenciesData.map((a) => a.name))).map((name) => (
                                <SelectItem key={name} value={name}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[480px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Agency</TableHead>
                            <TableHead className="px-2 py-2 text-center text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">H1</TableHead>
                            <TableHead className="px-2 py-2 text-center text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">H2</TableHead>
                            <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((record) => (
                            <TableRow key={record.id} className="border-b border-border">
                                <TableCell className="px-2 py-2 text-xs font-medium text-foreground lg:px-4 lg:py-3 lg:text-sm">
                                    {record.agencyName}
                                </TableCell>
                                <TableCell className="px-2 py-2 text-center text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">
                                    {record.period1Checks.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-2 py-2 text-center text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">
                                    {record.period2Checks.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-2 py-2 text-right text-xs font-medium text-primary lg:px-4 lg:py-3 lg:text-sm">
                                    {record.totalChecks.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
