import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionTrackerPanel } from "@/features/marketing/overview/components/CommissionTrackerPanel"
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import {
    marketerOverviewMetrics,
    commissionTracker,
    commissionTrackerTotalLabel,
    agencyInvites,
} from "@/data/marketing-data"

const MarketingOverview = () => {
    const navigate = useNavigate()

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Overview"
                filters={<ReferralLinkField onInvite={() => navigate("/marketing/referrals")} />}
            />

            <DashboardPageContent>
                <MetricCards metrics={marketerOverviewMetrics} columns={3} />

                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-4">
                    <CommissionTrackerPanel
                        data={commissionTracker}
                        totalLabel={commissionTrackerTotalLabel}
                        className="lg:col-span-3"
                    />
                    <InviteStatusTable
                        data={agencyInvites}
                        title="Recent invites"
                        description="Your latest agency invitations and their status."
                        limit={6}
                        viewAllHref="/marketing/referrals"
                        className="lg:col-span-5"
                    />
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingOverview
