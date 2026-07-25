import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import { useMarketerOverview } from "@/features/marketing/api/useMarketer"

const MarketingOverview = () => {
    const navigate = useNavigate()
    const { data: overview, isLoading } = useMarketerOverview()

    const metrics: MetricCard[] = [
        {
            title: "Total Agencies Referred",
            value: isLoading ? "—" : String(overview?.total_agencies_referred ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-progress",
        },
        {
            title: "Active Agencies",
            value: isLoading ? "—" : String(overview?.active_agencies ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
        {
            title: "Fraud Cases Identified",
            value: isLoading ? "—" : String(overview?.fraud_cases_identified ?? 0),
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
                    <ReferralLinkField
                        url={overview?.referral_link}
                        onInvite={() => navigate("/marketing/referrals")}
                    />
                }
            />

            <DashboardPageContent>
                <MetricCards metrics={metrics} columns={3} />

                <InviteStatusTable
                    data={overview?.recent_invites ?? []}
                    title="Recent invites"
                    description="Your latest agency invitations and their status."
                    limit={6}
                    viewAllHref="/marketing/referrals"
                />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingOverview
