import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { AdminAgencyRecoveryRow, AgencyRecoveryStatus } from "@/features/adminbilling/api/adminAgencyRecoveriesService"
import {
    useMarkAgencyRecoveryPaid,
    useMarkAgencyRecoveryUnpaid,
    useUpdateAgencyRecoveryAmount,
} from "@/features/adminbilling/api/useAdminAgencyRecoveries"
import { EditAmountDialog } from "@/features/adminbilling/components/EditAmountDialog"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const ITEMS_PER_PAGE = 7
const STATUS_FILTERS: Array<AgencyRecoveryStatus | "All"> = ["All", "Pending", "Paid"]

const statusStyles: Record<AgencyRecoveryStatus, string> = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    Paid: "bg-green-50 text-green-600 border border-green-100",
}

interface AgencyRecoveriesTableProps {
    data: AdminAgencyRecoveryRow[]
}

export const AgencyRecoveriesTable = ({ data }: AgencyRecoveriesTableProps) => {
    const [statusFilter, setStatusFilter] = useState<AgencyRecoveryStatus | "All">("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [editing, setEditing] = useState<AdminAgencyRecoveryRow | null>(null)

    const markPaidMutation = useMarkAgencyRecoveryPaid()
    const markUnpaidMutation = useMarkAgencyRecoveryUnpaid()
    const updateAmountMutation = useUpdateAgencyRecoveryAmount()

    const filtered = useMemo(
        () => (statusFilter === "All" ? data : data.filter((r) => r.status === statusFilter)),
        [data, statusFilter]
    )
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1
    const safePage = Math.min(currentPage, totalPages)

    const paginated = useMemo(() => {
        const start = (safePage - 1) * ITEMS_PER_PAGE
        return filtered.slice(start, start + ITEMS_PER_PAGE)
    }, [filtered, safePage])

    const handleMarkPaid = (row: AdminAgencyRecoveryRow) => {
        markPaidMutation.mutate(row.id, {
            onSuccess: () => toast.success(`Recovery for ${row.agency} marked as paid`),
            onError: () => toast.error("Failed to mark recovery as paid"),
        })
    }

    const handleMarkUnpaid = (row: AdminAgencyRecoveryRow) => {
        markUnpaidMutation.mutate(row.id, {
            onSuccess: () => toast.success(`Recovery for ${row.agency} marked as not paid`),
            onError: () => toast.error("Failed to update recovery"),
        })
    }

    const handleSaveAmount = (amount: number) => {
        if (!editing) return
        updateAmountMutation.mutate(
            { recoveryId: editing.id, amount },
            {
                onSuccess: () => {
                    toast.success("Recovery amount updated")
                    setEditing(null)
                },
                onError: () => toast.error("Failed to update amount"),
            }
        )
    }

    return (
        <DashboardPanel
            title="Agencies Recoveries"
            description="Each agency's 50% share of a recovered fraud case. Payment happens outside the app — mark it here once sent."
            noPadding
            hasBorder
            actions={
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AgencyRecoveryStatus | "All")}>
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
                <Table className="min-w-[680px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Agency</TableHead>
                            <TableHead className={th}>Fraud Case</TableHead>
                            <TableHead className={cn(th, "text-right")}>Amount</TableHead>
                            <TableHead className={th}>Date</TableHead>
                            <TableHead className={th}>Status</TableHead>
                            <TableHead className={cn(th, "text-right")}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((row) => (
                            <TableRow key={row.id} className="border-b border-border">
                                <TableCell className={cn(td, "font-medium text-foreground")}>{row.agency}</TableCell>
                                <TableCell className={cn(td, "text-muted-foreground")}>{row.fraudCase}</TableCell>
                                <TableCell className={cn(td, "text-right font-medium")}>{row.amountLabel}</TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>{row.createdAt}</TableCell>
                                <TableCell className={td}>
                                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", statusStyles[row.status])}>
                                        {row.status}
                                    </span>
                                </TableCell>
                                <TableCell className={cn(td, "text-right")}>
                                    <div className="flex items-center justify-end gap-3">
                                        {row.status !== "Paid" && (
                                            <button
                                                onClick={() => setEditing(row)}
                                                className="text-xs font-medium text-muted-foreground hover:underline lg:text-sm"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {row.status === "Pending" ? (
                                            <button
                                                onClick={() => handleMarkPaid(row)}
                                                disabled={markPaidMutation.isPending}
                                                className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                            >
                                                Mark as Paid
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkUnpaid(row)}
                                                disabled={markUnpaidMutation.isPending}
                                                className="text-xs font-medium text-muted-foreground hover:underline lg:text-sm"
                                            >
                                                Mark as Not Paid
                                            </button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {filtered.length > 0 && (
                <TablePagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}

            <EditAmountDialog
                open={!!editing}
                onClose={() => setEditing(null)}
                title="Edit Recovery Amount"
                description={editing ? `Update the recovery amount owed to ${editing.agency}.` : ""}
                initialAmount={editing?.amount ?? 0}
                isSubmitting={updateAmountMutation.isPending}
                onSubmit={handleSaveAmount}
            />
        </DashboardPanel>
    )
}
