import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface TimelineRecord {
  timestamp: string
  event: string
  actor: string
}

interface TimelineAuditTrailPanelProps {
  data: TimelineRecord[]
}

export const TimelineAuditTrailPanel = ({ data }: TimelineAuditTrailPanelProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
      <p className="text-sm text-muted-foreground">Timeline/Audit Trail</p>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Timestamp
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Event
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Actor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow key={index} className="border-t border-border/70">
                <TableCell className="px-4 py-4 text-sm text-foreground">{record.timestamp}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground/80">{record.event}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground/80">{record.actor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

