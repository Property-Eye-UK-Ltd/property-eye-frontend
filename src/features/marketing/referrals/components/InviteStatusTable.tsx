import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { cn } from "@/lib/utils"
import { RecentInvite } from "@/features/marketing/api/marketerService"

const statusStyles: Record<string, string> = {
    signed_up: "bg-green-50 text-green-600 border border-green-100",
    opened: "bg-blue-50 text-blue-600 border border-blue-100",
    sent: "bg-amber-50 text-amber-600 border border-amber-100",
}

const formatStatus = (status: string) =>
    status
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

interface InviteStatusTableProps {
    data: RecentInvite[]
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
                    <Table className="min-w-[480px]">
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">
                                    Invited Email
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
                            {rows.map((invite, index) => (
                                <TableRow key={`${invite.invited_email}-${index}`} className="border-b border-border">
                                    <TableCell className="px-2 py-2 text-xs font-medium text-foreground lg:px-4 lg:py-3 lg:text-sm">
                                        {invite.invited_email}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">
                                        {formatDate(invite.created_at)}
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-right lg:px-4 lg:py-3">
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                                statusStyles[invite.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                                            )}
                                        >
                                            {formatStatus(invite.status)}
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
