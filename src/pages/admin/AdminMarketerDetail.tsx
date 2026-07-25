import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LinkAgencyModal } from "@/features/marketing-admin/network/components/LinkAgencyModal"
import { cn } from "@/lib/utils"
import {
    marketerLeaderboard,
    marketerLeaderboardStatusStyles,
    adminAgencies,
    AdminAgencyRecord,
    marketerAgencyStatusStyles,
    attributionMethodStyles,
} from "@/data/marketing-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
const badge = "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs"

const AdminMarketerDetail = () => {
    const { marketerId } = useParams<{ marketerId: string }>()
    const marketer = marketerLeaderboard.find((m) => m.id === marketerId)

    const [agencies, setAgencies] = useState<AdminAgencyRecord[]>(() =>
        adminAgencies.filter((a) => a.marketerId === marketerId)
    )
    const [isLinkOpen, setIsLinkOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const unattributedAgencies = useMemo(
        () => adminAgencies.filter((a) => a.marketerId === null && !agencies.some((la) => la.id === a.id)),
        [agencies]
    )

    const handleLinkAgency = (agencyId: string) => {
        const agency = adminAgencies.find((a) => a.id === agencyId)
        if (!agency || !marketer) return

        setIsSubmitting(true)
        const linked: AdminAgencyRecord = {
            ...agency,
            marketerId: marketer.id,
            marketer: marketer.name,
            attributed: true,
            attributionMethod: "Manual",
        }
        setAgencies((prev) => [linked, ...prev])
        setIsSubmitting(false)
        setIsLinkOpen(false)
        toast.success(`${agency.name} attributed to ${marketer.name} — approved immediately`)
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

    const metrics = [
        { title: "Linked Agencies", value: String(agencies.length), period: "Currently attributed", change: "", topBarClass: "bg-progress" },
        { title: "Total Fraud Value", value: marketer.fraudValue, period: "All time", change: "", topBarClass: "bg-red-500" },
        { title: "Commission Earned", value: marketer.commission, period: "All time", change: "", topBarClass: "bg-green-500" },
    ]

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title={marketer.name}
                breadcrumbs={[{ label: "Affiliates", href: "/admin/affiliates" }, { label: marketer.name }]}
                actions={[{ label: "Link Agency", onClick: () => setIsLinkOpen(true) }]}
            />

            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3">
                    <span className={cn(badge, marketerLeaderboardStatusStyles[marketer.status])}>{marketer.status}</span>
                    <span className="text-sm text-muted-foreground">{marketer.email}</span>
                </div>

                <MetricCards metrics={metrics} columns={3} />

                <DashboardPanel
                    title="Linked Agencies"
                    description="Agencies currently attributed to this marketer. Use Link Agency to attribute a verified referral directly — it's approved the moment you confirm it, since verification happens outside the platform."
                    noPadding
                    hasBorder
                >
                    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                        <Table className="min-w-[720px]">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className={th}>Agency</TableHead>
                                    <TableHead className={th}>Method</TableHead>
                                    <TableHead className={cn(th, "text-right")}>Fraud Value</TableHead>
                                    <TableHead className={th}>Status</TableHead>
                                    <TableHead className={th}>Date Linked</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agencies.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className={cn(td, "text-center text-muted-foreground")}>
                                            No agencies linked yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    agencies.map((agency) => (
                                        <TableRow key={agency.id} className="border-b border-border">
                                            <TableCell className={cn(td, "font-medium text-foreground")}>{agency.name}</TableCell>
                                            <TableCell className={td}>
                                                <span className={cn(badge, attributionMethodStyles[agency.attributionMethod])}>
                                                    {agency.attributionMethod}
                                                </span>
                                            </TableCell>
                                            <TableCell className={cn(td, "text-right")}>{agency.totalFraudValue}</TableCell>
                                            <TableCell className={td}>
                                                <span className={cn(badge, marketerAgencyStatusStyles[agency.status])}>
                                                    {agency.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className={td}>{agency.dateAdded}</TableCell>
                                        </TableRow>
                                    ))
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
                marketerName={marketer.name}
                onConfirm={handleLinkAgency}
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default AdminMarketerDetail
