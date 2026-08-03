import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { cn } from "@/lib/utils"
import { useMarketerAgencyDetail } from "@/features/marketing/api/useMarketer"

import { Skeleton } from "@/components/ui/skeleton"

const badge = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize lg:text-xs"

const statusStyles: Record<string, string> = {
    active: "bg-green-50 text-green-600 border border-green-100",
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    rejected: "bg-red-50 text-red-600 border border-red-100",
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const OverviewRow = ({ label, value }: { label: string; value: string | number }) => (
    <div>
        <p className="mb-1 text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-primary">{value}</p>
    </div>
)

const MarketingAgencyDetail = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const { data: agency, isLoading, isError } = useMarketerAgencyDetail(agencyId)

    if (isLoading) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader title="Agency Detail" breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }]} />
                <DashboardPageContent>
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="space-y-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (isError || !agency) {
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
                                <span className={cn(badge, statusStyles[agency.status] ?? "bg-gray-100 text-gray-600 border border-gray-200")}>
                                    {agency.status}
                                </span>
                            </div>
                            <OverviewRow label="Date Added" value={formatDate(agency.created_at)} />
                            <div>
                                <p className="mb-1 text-xs text-muted-foreground">Attribution Method</p>
                                <span className="inline-flex items-center rounded-full border border-border bg-gray-50 px-2.5 py-0.5 text-[10px] font-medium capitalize text-foreground lg:text-xs">
                                    {agency.attribution_method}
                                </span>
                            </div>
                            <OverviewRow label="Total Fraud Value" value={formatCurrency(agency.total_fraud_value)} />
                            <OverviewRow label="Commission Earned" value={formatCurrency(agency.commission_earned)} />
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencyDetail
