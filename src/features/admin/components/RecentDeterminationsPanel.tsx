import { useNavigate } from "react-router-dom"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TickCircle } from "iconsax-react"
import { adminCaseStatusStyles, AgencyCase } from "@/data/agencyCasesData"
import { useAdminCases } from "@/features/admincases/api/useAdminCases"

import { Skeleton } from "@/components/ui/skeleton"

const determinationStyles: Record<string, string> = {
    "Fraudulent (Confirmed)": "bg-red-50 text-red-600 border border-red-100",
    "Not Fraudulent (Cleared)": "bg-green-50 text-green-600 border border-green-100",
}

const formatSubmittedAt = (iso?: string): string => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export const RecentDeterminationsPanel = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useAdminCases({ page: 1, page_size: 20 })

    const recentDeterminations: AgencyCase[] = (data?.items ?? [])
        .filter((item) => Boolean(item.determination))
        .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""))
        .slice(0, 5)

    return (
        <DashboardPanel
            title="Recent Determinations"
            icon={<TickCircle size={18} variant="TwoTone" className="text-muted-foreground" />}
            className="overflow-hidden lg:col-span-5"
            noPadding
            hasBorder
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[640px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Case ID</TableHead>
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Agency</TableHead>
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Determination</TableHead>
                            <TableHead className="px-2 py-2 text-center text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Status</TableHead>
                            <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Submitted</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                        <Skeleton className="h-4 w-12" />
                                    </TableCell>
                                    <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                        <Skeleton className="h-4 w-28" />
                                    </TableCell>
                                    <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                        <Skeleton className="h-5 w-24 rounded-full" />
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-center lg:px-4 lg:py-3">
                                        <Skeleton className="inline-block h-5 w-20 rounded-full" />
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-right lg:px-4 lg:py-3">
                                        <Skeleton className="ml-auto h-4 w-16" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : recentDeterminations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-2 py-4 text-center text-xs text-muted-foreground lg:px-4 lg:text-sm">
                                    No determinations yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            recentDeterminations.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="cursor-pointer border-b border-border transition-colors hover:bg-muted/40"
                                    onClick={() => navigate(`/admin/cases/${item.caseId}`)}
                                >
                                    <TableCell className="px-2 py-2 text-xs font-normal text-progress lg:px-4 lg:py-3 lg:text-sm">#{item.caseId.slice(-4)}</TableCell>
                                    <TableCell className="px-2 py-2 text-xs font-medium text-primary lg:px-4 lg:py-3 lg:text-sm">{item.agencyName}</TableCell>
                                    <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                        <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs", determinationStyles[item.determination ?? ""])}>
                                            {item.determination}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-center lg:px-4 lg:py-3">
                                        <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1 lg:text-xs", adminCaseStatusStyles[item.adminStatus])}>
                                            {item.adminStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-2 py-2 text-right text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{formatSubmittedAt(item.submittedAt)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
