import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Cup } from "iconsax-react"
import { cn } from "@/lib/utils"
import { AdminMarketerRecord } from "@/features/marketing-admin/network/api/adminMarketersService"
import { Skeleton } from "@/components/ui/skeleton"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const statusLabel: Record<AdminMarketerRecord["status"], string> = {
    active: "Active",
    disabled: "Suspended",
}

const statusStyles: Record<AdminMarketerRecord["status"], string> = {
    active: "bg-green-50 text-green-600 border border-green-100",
    disabled: "bg-red-50 text-red-600 border border-red-100",
}

interface AdminMarketersTableProps {
    data: AdminMarketerRecord[]
    isLoading?: boolean
}

export const AdminMarketersTable = ({ data, isLoading }: AdminMarketersTableProps) => {
    const navigate = useNavigate()

    return (
        <DashboardPanel
            title="All Marketers"
            description="Click a marketer to view their linked agencies and attribute a new one directly."
            icon={<Cup size={18} variant="Bulk" className="text-muted-foreground" />}
            noPadding
            hasBorder
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Marketer</TableHead>
                            <TableHead className={th}>Email</TableHead>
                            <TableHead className={th}>Referral Code</TableHead>
                            <TableHead className={th}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-32" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-40" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                    <TableCell className={td}>
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className={cn(td, "text-center text-muted-foreground")}>
                                    No marketers yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="cursor-pointer border-b border-border hover:bg-gray-50"
                                    onClick={() => navigate(`/admin/affiliates/marketers/${row.id}`)}
                                >
                                    <TableCell className={cn(td, "font-medium text-foreground")}>
                                        {row.name ?? "—"}
                                    </TableCell>
                                    <TableCell className={td}>{row.email}</TableCell>
                                    <TableCell className={td}>{row.referral_code}</TableCell>
                                    <TableCell className={td}>
                                        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs", statusStyles[row.status])}>
                                            {statusLabel[row.status]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
