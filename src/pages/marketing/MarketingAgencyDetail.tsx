import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { cn } from "@/lib/utils"
import {
    marketerAgencies,
    marketerAgencyStatusStyles,
    attributionMethodStyles,
} from "@/data/marketing-data"

const badge = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium lg:text-xs"

const OverviewRow = ({ label, value }: { label: string; value: string | number }) => (
    <div>
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-primary">{value}</p>
    </div>
)

const MarketingAgencyDetail = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const agency = marketerAgencies.find((a) => a.id === agencyId)

    if (!agency) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader
                    title="Agency Detail"
                    breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This agency could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title={agency.name}
                breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: agency.name }]}
            />

            <DashboardPageContent>
                <div className="mx-auto max-w-lg">
                    <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
                        <p className="mb-3 text-xs text-muted-foreground sm:mb-4">Agency Overview</p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">Status</p>
                                <span className={cn(badge, marketerAgencyStatusStyles[agency.status])}>
                                    {agency.status}
                                </span>
                            </div>
                            <OverviewRow label="Date Added" value={agency.dateAdded} />
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">Attribution Method</p>
                                <span className={cn(badge, attributionMethodStyles[agency.attributionMethod])}>
                                    {agency.attributionMethod}
                                </span>
                            </div>
                            <OverviewRow
                                label="Attribution"
                                value={agency.attributed ? "Locked to you" : "Pending — contact support"}
                            />
                            <OverviewRow label="Total Fraud Value" value={agency.totalFraudValue} />
                            <OverviewRow label="Commission Earned" value={agency.totalCommission} />
                            <OverviewRow label="Cases Found" value={agency.casesFound} />
                            <OverviewRow label="Confirmed Fraud" value={agency.confirmedFraud} />
                            <OverviewRow label="Cleared" value={agency.cleared} />
                            <OverviewRow label="In Progress" value={agency.inProgress} />
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencyDetail
