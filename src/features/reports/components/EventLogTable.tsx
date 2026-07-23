import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { AdminEventLogEntry } from "@/features/reports/api/reportsService"

interface EventLogTableProps {
    data: AdminEventLogEntry[]
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
}

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-6 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-6 lg:py-3 lg:text-sm"

const actionStyles: Record<AdminEventLogEntry["action"], string> = {
    login: "bg-blue-50 text-blue-600 border border-blue-100",
    logout: "bg-gray-50 text-gray-600 border border-gray-100",
    create_case: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    update_case: "bg-green-50 text-green-600 border border-green-100",
    export_report: "bg-purple-50 text-purple-600 border border-purple-100",
}

const actionLabels: Record<AdminEventLogEntry["action"], string> = {
    login: "Login",
    logout: "Logout",
    create_case: "Case Created",
    update_case: "Case Updated",
    export_report: "Report Exported",
}

const targetTypeStyles: Record<string, string> = {
    User: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Case: "bg-purple-50 text-purple-600 border border-purple-100",
}

export const EventLogTable = ({ data, total, page, pageSize, onPageChange }: EventLogTableProps) => {
    const totalPages = Math.ceil(total / pageSize) || 1

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={cn(th, "text-muted-foreground")}>Actor</TableHead>
                            <TableHead className={th}>Role</TableHead>
                            <TableHead className={th}>Action</TableHead>
                            <TableHead className={th}>Target</TableHead>
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className={cn(td, "text-center text-muted-foreground")}>
                                    No events found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((entry, index) => (
                                <TableRow key={index} className="border-b border-border">
                                    <TableCell className={cn(td, "text-foreground")}>{entry.actor_name}</TableCell>
                                    <TableCell className={cn(td, "text-muted-foreground")}>{entry.actor_role}</TableCell>
                                    <TableCell className={td}>
                                        <Badge
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs",
                                                actionStyles[entry.action]
                                            )}
                                        >
                                            {actionLabels[entry.action]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Badge
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-[10px] font-normal shadow-none lg:px-3 lg:py-1 lg:text-xs",
                                                targetTypeStyles[entry.target_type] ??
                                                    "bg-gray-50 text-gray-600 border border-gray-100"
                                            )}
                                        >
                                            {entry.target_type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={cn(td, "text-muted-foreground")}>
                                        {entry.agency_name ?? "—"}
                                    </TableCell>
                                    <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                        {new Date(entry.date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <TablePagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </>
    )
}
