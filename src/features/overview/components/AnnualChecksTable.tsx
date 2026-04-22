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
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-6 font-medium">Agency Name</TableHead>
                            <TableHead className="px-6 font-medium text-center">First Half Checks</TableHead>
                            <TableHead className="px-6 font-medium text-center">Second Half Checks</TableHead>
                            <TableHead className="px-6 font-medium text-right">Total Annual Checks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((record) => (
                            <TableRow key={record.id} className="border-b border-border">
                                <TableCell className="px-6 py-3 font-medium text-foreground">
                                    {record.agencyName}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-center text-muted-foreground">
                                    {record.period1Checks.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-center text-muted-foreground">
                                    {record.period2Checks.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right font-medium text-primary">
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
