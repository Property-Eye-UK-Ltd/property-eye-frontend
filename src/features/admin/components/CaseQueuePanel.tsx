import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()

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
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[520px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Case ID</TableHead>
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Agency</TableHead>
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Period</TableHead>
                            <TableHead className="px-2 py-2 text-center text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Severity</TableHead>
                            <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Detected</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...data].sort((a, b) => a.agencyName.localeCompare(b.agencyName)).map((item, index) => (
                            <TableRow
                                key={`${item.caseId}-${index}`}
                                className="cursor-pointer border-b border-border transition-colors hover:bg-muted/40"
                                onClick={() => navigate(`/admin/cases/${encodeURIComponent(`#${item.caseId}`)}`)}
                            >
                                <TableCell className="px-2 py-2 text-xs font-normal text-progress lg:px-4 lg:py-3 lg:text-sm">#{item.caseId}</TableCell>
                                <TableCell className="px-2 py-2 text-xs font-medium text-primary lg:px-4 lg:py-3 lg:text-sm">{item.agencyName}</TableCell>
                                <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{item.periodFound}</TableCell>
                                <TableCell className="px-2 py-2 text-center lg:px-4 lg:py-3">
                                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs", severityStyles[item.severity])}>
                                        {item.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-2 py-2 text-right text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{item.dateDetected}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
