import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { AdminAttributionApi } from "@/features/marketing-admin/attribution/api/adminAttributionsService"
import { useApproveAttribution, useRejectAttribution } from "@/features/marketing-admin/attribution/api/useAdminAttributions"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7

type StatusFilter = "All" | "Pending" | "Approved" | "Rejected"
const STATUS_FILTERS: StatusFilter[] = ["All", "Pending", "Approved", "Rejected"]

const statusLabel: Record<AdminAttributionApi["status"], string> = {
    pending: "Pending",
    approved: "Approved",
    denied: "Rejected",
    locked: "Locked",
}

const statusStyles: Record<AdminAttributionApi["status"], string> = {
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    approved: "bg-green-50 text-green-600 border border-green-100",
    denied: "bg-gray-100 text-gray-600 border border-gray-200",
    locked: "bg-blue-50 text-blue-600 border border-blue-100",
}

const methodStyles: Record<string, string> = {
    manual: "bg-purple-50 text-purple-600 border border-purple-100",
    link: "bg-blue-50 text-blue-600 border border-blue-100",
    invite: "bg-cyan-50 text-cyan-600 border border-cyan-100",
}

interface AttributionQueueTableProps {
    data: AdminAttributionApi[]
}

export const AttributionQueueTable = ({ data }: AttributionQueueTableProps) => {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")
    const [currentPage, setCurrentPage] = useState(1)

    const approveMutation = useApproveAttribution()
    const rejectMutation = useRejectAttribution()

    const filtered = useMemo(() => {
        if (statusFilter === "All") return data
        if (statusFilter === "Rejected") return data.filter((a) => a.status === "denied")
        return data.filter((a) => statusLabel[a.status] === statusFilter)
    }, [data, statusFilter])

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1
    const safePage = Math.min(currentPage, totalPages)

    const paginated = useMemo(() => {
        const start = (safePage - 1) * ITEMS_PER_PAGE
        return filtered.slice(start, start + ITEMS_PER_PAGE)
    }, [filtered, safePage])

    const handleApprove = (attribution: AdminAttributionApi) => {
        approveMutation.mutate(attribution.id, {
            onSuccess: () => toast.success(`Approved attribution for ${attribution.claimed_agency_name ?? "agency"}`),
            onError: () => toast.error("Failed to approve attribution"),
        })
    }

    const handleReject = (attribution: AdminAttributionApi) => {
        rejectMutation.mutate(
            { attributionId: attribution.id, reason: "Rejected by admin" },
            {
                onSuccess: () => toast.success(`Rejected claim for ${attribution.claimed_agency_name ?? "agency"}`),
                onError: () => toast.error("Failed to reject attribution"),
            }
        )
    }

    return (
        <DashboardPanel
            title="Attribution Queue"
            description="Legacy claims awaiting approval or conflict resolution. New attributions are created directly from the Marketers tab."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                    <SelectTrigger className="h-8 w-[130px] rounded-full border-border bg-background px-3 text-xs focus:ring-0 lg:h-9">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_FILTERS.map((s) => (
                            <SelectItem key={s} value={s}>{s === "All" ? "All statuses" : s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[880px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Marketer</TableHead>
                            <TableHead className={th}>Method</TableHead>
                            <TableHead className={th}>Conflict</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className={cn(td, "text-center text-muted-foreground")}>
                                    No attribution claims.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((attribution) => (
                                <TableRow key={attribution.id} className="border-b border-border">
                                    <TableCell className={cn(td, "font-medium text-foreground")}>
                                        {attribution.claimed_agency_name ?? "—"}
                                    </TableCell>
                                    <TableCell className={td}>{attribution.marketer_name ?? "—"}</TableCell>
                                    <TableCell className={td}>
                                        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize lg:text-xs", methodStyles[attribution.method] ?? "bg-gray-100 text-gray-600 border border-gray-200")}>
                                            {attribution.method}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn(td, "text-muted-foreground")}>
                                        {attribution.has_conflict ? "Yes" : "—"}
                                    </TableCell>
                                    <TableCell className={td}>
                                        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", statusStyles[attribution.status])}>
                                            {statusLabel[attribution.status]}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn(td, "text-right")}>
                                        {attribution.status === "pending" || attribution.status === "locked" ? (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleApprove(attribution)}
                                                    disabled={approveMutation.isPending}
                                                    className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(attribution)}
                                                    disabled={rejectMutation.isPending}
                                                    className="text-xs font-medium text-red-600 hover:underline lg:text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground lg:text-sm">Closed</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {filtered.length > 0 && (
                <TablePagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
        </DashboardPanel>
    )
}
