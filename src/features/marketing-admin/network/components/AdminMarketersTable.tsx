import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Cup } from "iconsax-react"
import { cn } from "@/lib/utils"
import { MarketerLeaderboardRow, marketerLeaderboardStatusStyles } from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface AdminMarketersTableProps {
    data: MarketerLeaderboardRow[]
}

export const AdminMarketersTable = ({ data }: AdminMarketersTableProps) => (
    <DashboardPanel
        title="All Marketers"
        description="Manage marketer status and review performance."
        icon={<Cup size={18} variant="Bulk" className="text-muted-foreground" />}
        noPadding
        hasBorder
    >
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <Table className="min-w-[720px]">
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className={th}>Marketer</TableHead>
                        <TableHead className={cn(th, "text-right")}>Agencies</TableHead>
                        <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                        <TableHead className={cn(th, "text-right")}>Commission</TableHead>
                        <TableHead className={th}>Status</TableHead>
                        <TableHead className={cn(th, "text-right")}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} className="border-b border-border">
                            <TableCell className={cn(td, "font-medium text-foreground")}>{row.name}</TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.agencies}</TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.fraudValue}</TableCell>
                            <TableCell className={cn(td, "text-right")}>{row.commission}</TableCell>
                            <TableCell className={td}>
                                <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", marketerLeaderboardStatusStyles[row.status])}>
                                    {row.status}
                                </span>
                            </TableCell>
                            <TableCell className={cn(td, "text-right")}>
                                <button
                                    onClick={() =>
                                        toast.info(
                                            row.status === "Active"
                                                ? `Suspend ${row.name} — coming soon`
                                                : `Reactivate ${row.name} — coming soon`
                                        )
                                    }
                                    className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                >
                                    {row.status === "Active" ? "Suspend" : "Activate"}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </DashboardPanel>
)
