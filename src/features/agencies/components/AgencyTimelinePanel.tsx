import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TimelineEvent } from "@/data/agencyProfileData"

interface AgencyTimelinePanelProps {
    data: TimelineEvent[]
}

export const AgencyTimelinePanel = ({ data }: AgencyTimelinePanelProps) => {
    return (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
            <p className="text-sm text-muted-foreground">Timeline</p>
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} className="border-t border-border/70">
                                <TableCell className="px-4 py-4 text-sm text-foreground/80">{item.timestamp}</TableCell>
                                <TableCell className="px-4 py-4 text-sm text-foreground">{item.event}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
