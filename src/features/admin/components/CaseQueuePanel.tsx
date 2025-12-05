import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Fatrows } from "iconsax-react"

export interface CaseQueueRecord {
    caseId: string
    fraudType: string
    severity: "Critical" | "High" | "Medium" | "Low"
    dateDetected: string
}

interface CaseQueuePanelProps {
    data: CaseQueueRecord[]
    severityStyles: Record<CaseQueueRecord["severity"], string>
    fraudTypeStyles: Record<string, string>
}

export const CaseQueuePanel = ({
    data,
    severityStyles,
    fraudTypeStyles,
}: CaseQueuePanelProps) => {
    return (
        <DashboardPanel
            title="Case Queue"
            icon={<Fatrows size={18} variant="TwoTone" className="text-muted-foreground" />}
            className="overflow-hidden lg:col-span-3"
            noPadding
            hasBorder
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Case ID</TableHead>
                            <TableHead className="px-4 font-medium">Fraud Type</TableHead>
                            <TableHead className="px-4 font-medium">Severity</TableHead>
                            <TableHead className="px-4 font-medium">Date Detected</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={`${item.caseId}-${index}`}
                                className="border-b border-border"
                            >
                                <TableCell className="px-4 py-3 font-normal text-muted-foreground">#{item.caseId}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", fraudTypeStyles[item.fraudType])}>
                                        {item.fraudType}
                                    </span>
                                </TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", severityStyles[item.severity])}>
                                        {item.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{item.dateDetected}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
