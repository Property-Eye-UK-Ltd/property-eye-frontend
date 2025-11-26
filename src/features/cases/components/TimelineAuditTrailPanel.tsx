import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
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
    <DashboardPanel
      title="Timeline/Audit Trail"
      hasBorder
      noPadding
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 font-medium">Timestamp</TableHead>
              <TableHead className="px-4 font-medium">Event</TableHead>
              <TableHead className="px-4 font-medium">Actor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((record, index) => (
              <TableRow key={index} className="border-b border-border">
                <TableCell className="px-4 py-3 font-normal">{record.timestamp}</TableCell>
                <TableCell className="px-4 py-3 font-normal">{record.event}</TableCell>
                <TableCell className="px-4 py-3 font-normal">{record.actor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardPanel>
  )
}

