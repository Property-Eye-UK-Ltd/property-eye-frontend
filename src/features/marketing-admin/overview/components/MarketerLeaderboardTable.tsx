import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Cup } from "iconsax-react"
import { cn } from "@/lib/utils"
import { MarketerLeaderboardRow, marketerLeaderboardStatusStyles } from "@/data/marketing-data"

interface MarketerLeaderboardTableProps {
    data: MarketerLeaderboardRow[]
}

const th = "px-4 py-3 text-left text-xs font-medium text-muted-foreground"
const td = "px-4 py-3 text-sm text-foreground"

export const MarketerLeaderboardTable = ({ data }: MarketerLeaderboardTableProps) => (
    <DashboardPanel
        title="Top Marketers"
        description="Ranked by total fraud value detected"
        icon={<Cup size={18} variant="Bulk" className="text-muted-foreground" />}
        hasBorder
        compactContent
    >
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                        <TableHead className={th}>Marketer</TableHead>
                        <TableHead className={cn(th, "text-right")}>Agencies</TableHead>
                        <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                        <TableHead className={cn(th, "text-right")}>Commission</TableHead>
                        <TableHead className={th}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.id} className="border-border">
                            <TableCell className={cn(td, "font-medium")}>
                                <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                                {row.name}
                            </TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.agencies}</TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.fraudValue}</TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.commission}</TableCell>
                            <TableCell className={td}>
                                <span
                                    className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                        marketerLeaderboardStatusStyles[row.status]
                                    )}
                                >
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </DashboardPanel>
)
