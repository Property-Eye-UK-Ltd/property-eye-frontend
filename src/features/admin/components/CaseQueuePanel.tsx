import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Fatrows } from "iconsax-react"
import { CaseQueueRecord } from "@/data/adminOverviewData"

interface CaseQueuePanelProps {
    data: CaseQueueRecord[]
    severityStyles: Record<CaseQueueRecord["severity"], string>
}

export const CaseQueuePanel = ({
    data,
    severityStyles,
}: CaseQueuePanelProps) => {
    return (
        <DashboardPanel
            title="Case Queue"
            icon={<Fatrows size={18} variant="TwoTone" className="text-muted-foreground" />}
            className="overflow-hidden lg:col-span-3"
            noPadding
            hasBorder
            actions={
                <Select defaultValue="2025">
                    <SelectTrigger className="h-8 w-[80px] rounded-full border-border bg-background px-3 text-[10px] focus:ring-0">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Case ID</TableHead>
                            <TableHead className="px-4 font-medium">Agency Name</TableHead>
                            <TableHead className="px-4 font-medium">Period Found</TableHead>
                            <TableHead className="px-4 font-medium text-center">Severity</TableHead>
                            <TableHead className="px-4 font-medium text-right">Date Detected</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...data].sort((a, b) => a.agencyName.localeCompare(b.agencyName)).map((item, index) => (
                            <TableRow
                                key={`${item.caseId}-${index}`}
                                className="border-b border-border"
                            >
                                <TableCell className="px-4 py-3 font-normal text-muted-foreground">#{item.caseId}</TableCell>
                                <TableCell className="px-4 py-3 text-primary font-medium">{item.agencyName}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{item.periodFound}</TableCell>
                                <TableCell className="px-4 py-4 text-center">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", severityStyles[item.severity])}>
                                        {item.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right text-muted-foreground">{item.dateDetected}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
