import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MarketingAuditRecord } from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3"
const td = "px-2 py-2 text-xs whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm lg:whitespace-normal"

interface MarketingAuditLogPanelProps {
    data: MarketingAuditRecord[]
}

export const MarketingAuditLogPanel = ({ data }: MarketingAuditLogPanelProps) => (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:space-y-4 lg:p-6">
        <p className="text-xs text-muted-foreground sm:text-sm">Audit Log</p>
        <div className="overflow-x-auto rounded-xl border border-border">
            <Table className="min-w-[640px] text-sm">
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={th}>Timestamp</TableHead>
                        <TableHead className={th}>Event</TableHead>
                        <TableHead className={th}>Actor</TableHead>
                        <TableHead className={th}>Entity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((record, index) => (
                        <TableRow key={index} className="border-t border-border/70">
                            <TableCell className={td}>{record.timestamp}</TableCell>
                            <TableCell className={td}>{record.event}</TableCell>
                            <TableCell className={td}>{record.actor}</TableCell>
                            <TableCell className={td}>{record.entity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
)
