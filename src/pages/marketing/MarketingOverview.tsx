import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import { useMarketerOverview } from "@/features/marketing/api/useMarketer"
import { Skeleton } from "@/components/ui/skeleton"

const MarketingOverview = () => {
    const navigate = useNavigate()
    const { data: overview, isLoading } = useMarketerOverview()

    const getReferralCode = (link?: string) => {
        if (!link) return "—"
        try {
            const urlObj = new URL(link)
            return urlObj.searchParams.get("ref") || "—"
        } catch {
            const match = link.match(/[?&]ref=([^&]+)/)
            return match ? match[1] : "—"
        }
    }

    const metrics: MetricCard[] = [
        {
            title: "Total Agencies Referred",
            value: String(overview?.total_agencies_referred ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-progress",
        },
        {
            title: "Active Agencies",
            value: String(overview?.active_agencies ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
        {
            title: "Fraud Cases Identified",
            value: String(overview?.fraud_cases_identified ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-red-500",
        },
    ]

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Overview"
                filters={
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative w-full sm:w-[140px]">
                            <span className="absolute -top-2 left-3 z-10 bg-white px-1 text-[10px] font-medium text-muted-foreground lg:text-xs">
                                Referral Code
                            </span>
                            <div className="flex h-11 items-center rounded-xl border border-border bg-muted/30 px-3 select-all">
                                {isLoading ? (
                                    <Skeleton className="h-4 w-16" />
                                ) : (
                                    <code className="font-mono text-sm font-semibold text-foreground">
                                        {getReferralCode(overview?.referral_link)}
                                    </code>
                                )}
                            </div>
                        </div>
                        <ReferralLinkField
                            url={overview?.referral_link}
                            onInvite={() => navigate("/marketing/referrals")}
                        />
                    </div>
                }
            />

            <DashboardPageContent>
                <MetricCards metrics={metrics} columns={3} isLoading={isLoading} />

                <InviteStatusTable
                    data={overview?.recent_invites ?? []}
                    title="Recent invites"
                    description="Your latest agency invitations and their status."
                    limit={6}
                    viewAllHref="/marketing/referrals"
                    isLoading={isLoading}
                />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingOverview

