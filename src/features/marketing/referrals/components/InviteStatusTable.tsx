import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { cn } from "@/lib/utils"
import { AgencyInvite, inviteStatusStyles } from "@/data/marketing-data"

interface InviteStatusTableProps {
    data: AgencyInvite[]
    title?: string
    description?: string
    /** Show only the first N rows (used for the overview snapshot). */
    limit?: number
    viewAllHref?: string
    className?: string
}

export const InviteStatusTable = ({
    data,
    title = "Invite tracking",
    description = "Track every invite from sent through to signup.",
    limit,
    viewAllHref,
    className,
}: InviteStatusTableProps) => {
    const rows = limit ? data.slice(0, limit) : data

    return (
        <DashboardPanel
            title={title}
            description={description}
            noPadding
            hasBorder
            className={className}
            actions={
                viewAllHref ? (
                    <Link
                        to={viewAllHref}
                        className="shrink-0 rounded-full border border-primary px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 lg:text-sm"
                    >
                        View all
                    </Link>
                ) : undefined
            }
        >
            {rows.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No invites yet. Use “Invite agency” to send your first one.
                </div>
            ) : (
                <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                    <Table className="min-w-[520px]">
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">
                                    Agency
                                </TableHead>
                                <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">
                                    Contact Email
                                </TableHead>
                                <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">
                                    Date Sent
                                </TableHead>
                                <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((invite) => (
                                <TableRow key={invite.id} className="border-b border-border">
                                    <TableCell className="px-2 py-2 text-xs font-medium text-foreground lg:px-4 lg:py-3 lg:text-sm">
                                        {invite.agencyName}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">
                                        {invite.agencyEmail}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">
                                        {invite.dateSent}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-right lg:px-4 lg:py-3">
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                                inviteStatusStyles[invite.status]
                                            )}
                                        >
                                            {invite.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </DashboardPanel>
    )
}
