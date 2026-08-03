import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { LinkAgencyModal } from "@/features/marketing-admin/network/components/LinkAgencyModal"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
    useAdminMarketerAgencies,
    useAdminMarketerDetail,
    useLinkAgencyToMarketer,
    useUnattributedAgencies,
    useUpdateMarketerStatus,
} from "@/features/marketing-admin/network/api/useAdminMarketers"
import { useApproveAttribution, useRejectAttribution } from "@/features/marketing-admin/attribution/api/useAdminAttributions"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const formatGbp = (amount: number) => `£${amount.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const badge = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs"

const statusStyles = {
    active: "bg-green-50 text-green-600 border border-green-100",
    disabled: "bg-red-50 text-red-600 border border-red-100",
}

const statusLabel = {
    active: "Active",
    disabled: "Suspended",
}

const AdminMarketerDetail = () => {
    const { marketerId } = useParams<{ marketerId: string }>()
    const { data: marketer, isLoading } = useAdminMarketerDetail(marketerId)
    const { data: linkedAgencies = [], isLoading: isLoadingAgencies } = useAdminMarketerAgencies(marketerId)
    const { data: unattributedAgencies = [] } = useUnattributedAgencies()
    const updateStatus = useUpdateMarketerStatus(marketerId ?? "")
    const linkAgency = useLinkAgencyToMarketer(marketerId ?? "")

    const [isLinkOpen, setIsLinkOpen] = useState(false)

    const approveMutation = useApproveAttribution()
    const rejectMutation = useRejectAttribution()

    const handleApproveAttribution = (attributionId: string, agencyName: string) => {
        approveMutation.mutate(attributionId, {
            onSuccess: () => toast.success(`Attribution approved for ${agencyName}`),
            onError: () => toast.error("Failed to approve attribution"),
        })
    }

    const handleRejectAttribution = (attributionId: string, agencyName: string) => {
        rejectMutation.mutate(
            { attributionId, reason: "Rejected by admin" },
            {
                onSuccess: () => toast.success(`Attribution rejected for ${agencyName}`),
                onError: () => toast.error("Failed to reject attribution"),
            }
        )
    }

    const handleToggleStatus = () => {
        if (!marketer) return
        const nextStatus = marketer.status === "active" ? "disabled" : "active"
        updateStatus.mutate(nextStatus, {
            onSuccess: () => {
                toast.success(
                    nextStatus === "disabled"
                        ? `${marketer.name ?? marketer.email} suspended — they can no longer log in`
                        : `${marketer.name ?? marketer.email} reactivated`
                )
            },
            onError: () => {
                toast.error("Couldn't update marketer status. Try again.")
            },
        })
    }

    const handleLinkAgency = (agencyId: string) => {
        linkAgency.mutate(agencyId, {
            onSuccess: (attribution) => {
                setIsLinkOpen(false)
                toast.success(`${attribution.claimed_agency_name} attributed `)
            },
            onError: () => {
                toast.error("Couldn't link that agency. Try again.")
            },
        })
    }

    if (isLoading) {
        return (
            <DashboardLayout variant="super-admin">
                <DynamicPageHeader title="Marketer" breadcrumbs={[{ label: "Affiliates", href: "/admin/affiliates" }]} />
                <DashboardPageContent className="space-y-4 lg:space-y-6">
                    <DashboardPanel title="Marketer Overview" hasBorder>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 animate-pulse">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="space-y-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ))}
                        </div>
                    </DashboardPanel>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (!marketer) {
        return (
            <DashboardLayout variant="super-admin">
                <DynamicPageHeader
                    title="Marketer"
                    breadcrumbs={[{ label: "Affiliates", href: "/admin/affiliates" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This marketer could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title={marketer.name ?? marketer.email}
                breadcrumbs={[{ label: "Affiliates", href: "/admin/affiliates" }, { label: marketer.name ?? marketer.email }]}
                actions={[
                    {
                        label: marketer.status === "active" ? "Suspend Marketer" : "Reactivate Marketer",
                        onClick: handleToggleStatus,
                        variant: marketer.status === "active" ? "destructive" : "default",
                    },
                    { label: "Link Agency", onClick: () => setIsLinkOpen(true) },
                ]}
            />

            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <DashboardPanel title="Marketer Overview" hasBorder>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Status</p>
                            <span className={cn(badge, statusStyles[marketer.status])}>{statusLabel[marketer.status]}</span>
                        </div>
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Email</p>
                            <p className="text-sm text-primary">{marketer.email}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm text-primary">{marketer.phone_number ?? "—"}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Referral Code</p>
                            <p className="text-sm text-primary">{marketer.referral_code}</p>
                        </div>
                    </div>
                </DashboardPanel>

                {marketer.status === "disabled" && (
                    <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600 lg:p-4">
                        This marketer is suspended and cannot log in to the portal.
                    </div>
                )}

                <DashboardPanel
                    title="Referrals"
                    description="Agencies referred by this marketer and their attribution status."
                    noPadding
                    hasBorder
                >
                    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                        <Table className="min-w-[640px]">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className={th}>Agency</TableHead>
                                    <TableHead className={th}>Method</TableHead>
                                    <TableHead className={th}>Attribution Status</TableHead>
                                    <TableHead className={th}>Linked Since</TableHead>
                                    <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                                    <TableHead className={cn(th, "text-right")}>Commission Earned</TableHead>
                                    <TableHead className={cn(th, "text-right")}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingAgencies ? (
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className={td}>
                                                <Skeleton className="h-4 w-32" />
                                            </TableCell>
                                            <TableCell className={td}>
                                                <Skeleton className="h-4 w-20" />
                                            </TableCell>
                                            <TableCell className={td}>
                                                <Skeleton className="h-5 w-16 rounded-full" />
                                            </TableCell>
                                            <TableCell className={td}>
                                                <Skeleton className="h-4 w-24" />
                                            </TableCell>
                                            <TableCell className={cn(td, "text-right")}>
                                                <Skeleton className="ml-auto h-4 w-16" />
                                            </TableCell>
                                            <TableCell className={cn(td, "text-right")}>
                                                <Skeleton className="ml-auto h-4 w-16" />
                                            </TableCell>
                                            <TableCell className={cn(td, "text-right")}>
                                                <Skeleton className="ml-auto h-4 w-16" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : linkedAgencies.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className={cn(td, "text-center text-muted-foreground")}>
                                            No agencies linked yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    linkedAgencies.map((agency) => {
                                        const attrStatus = agency.attribution_status
                                        const attrId = agency.attribution_id
                                        return (
                                            <TableRow key={agency.id} className="border-b border-border">
                                                <TableCell className={cn(td, "font-medium text-foreground")}>{agency.name}</TableCell>
                                                <TableCell className={cn(td, "capitalize text-muted-foreground")}>{agency.attribution_method}</TableCell>
                                                <TableCell className={td}>
                                                    {attrStatus ? (
                                                        <span className={cn(
                                                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs",
                                                            attrStatus === "approved" ? "bg-green-50 text-green-600 border border-green-100" :
                                                            attrStatus === "denied" ? "bg-gray-100 text-gray-600 border border-gray-200" :
                                                            attrStatus === "locked" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                                            "bg-amber-50 text-amber-600 border border-amber-100"
                                                        )}>
                                                            {attrStatus === "denied" ? "Rejected" : attrStatus.charAt(0).toUpperCase() + attrStatus.slice(1)}
                                                        </span>
                                                    ) : "—"}
                                                </TableCell>
                                                <TableCell className={cn(td, "text-muted-foreground")}>{formatDate(agency.created_at)}</TableCell>
                                                <TableCell className={cn(td, "text-right")}>{formatGbp(agency.total_fraud_value)}</TableCell>
                                                <TableCell className={cn(td, "text-right font-medium")}>{formatGbp(agency.commission_earned)}</TableCell>
                                                <TableCell className={cn(td, "text-right")}>
                                                    {attrId ? (
                                                        <div className="flex justify-end gap-2">
                                                            {(attrStatus === "pending" || attrStatus === "locked" || attrStatus === "denied") && (
                                                                <button
                                                                    onClick={() => handleApproveAttribution(attrId, agency.name)}
                                                                    disabled={approveMutation.isPending}
                                                                    className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}
                                                            {(attrStatus === "pending" || attrStatus === "locked" || attrStatus === "approved") && (
                                                                <button
                                                                    onClick={() => handleRejectAttribution(attrId, agency.name)}
                                                                    disabled={rejectMutation.isPending}
                                                                    className="text-xs font-medium text-red-600 hover:underline lg:text-sm"
                                                                >
                                                                    Reject
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : "—"}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </DashboardPanel>
            </DashboardPageContent>

            <LinkAgencyModal
                open={isLinkOpen}
                onClose={() => setIsLinkOpen(false)}
                availableAgencies={unattributedAgencies}
                marketerName={marketer.name ?? marketer.email}
                onConfirm={handleLinkAgency}
                isSubmitting={linkAgency.isPending}
            />
        </DashboardLayout>
    )
}

export default AdminMarketerDetail
