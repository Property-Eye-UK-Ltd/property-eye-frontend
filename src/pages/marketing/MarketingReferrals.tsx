import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import {
    InviteAgencyModal,
    InviteAgencyFormValues,
} from "@/features/marketing/referrals/components/InviteAgencyModal"
import { useMarketerReferralStats, useSendMarketerInvite } from "@/features/marketing/api/useMarketer"

const MarketingReferrals = () => {
    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const { data: stats, isLoading } = useMarketerReferralStats()
    const sendInvite = useSendMarketerInvite()

    const handleInviteSubmit = (values: InviteAgencyFormValues) => {
        sendInvite.mutate(
            { invited_email: values.agencyEmail },
            {
                onSuccess: () => {
                    setIsInviteOpen(false)
                    toast.success(`Invite sent to ${values.agencyEmail}`)
                },
                onError: () => {
                    toast.error("Couldn't send that invite. Try again.")
                },
            }
        )
    }

    const metrics: MetricCard[] = [
        {
            title: "Invites Sent",
            value: isLoading ? "—" : String(stats?.invites_sent ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-progress",
        },
        {
            title: "Agencies Signed Up",
            value: isLoading ? "—" : String(stats?.agencies_signed_up ?? 0),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
        {
            title: "Conversion Rate",
            value: isLoading ? "—" : `${Math.round((stats?.conversion_rate ?? 0) * 100) / 100}%`,
            period: "Signups / invites",
            change: "",
            topBarClass: "bg-secondary",
        },
    ]

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Referrals"
                filters={
                    <ReferralLinkField url={stats?.referral_link} onInvite={() => setIsInviteOpen(true)} />
                }
            />

            <DashboardPageContent>
                <MetricCards metrics={metrics} columns={3} />

                <InviteStatusTable
                    data={stats?.invites ?? []}
                    title="Invite tracking"
                    description="Every invite you've sent, from delivery through to signup."
                />
            </DashboardPageContent>

            <InviteAgencyModal
                open={isInviteOpen}
                onClose={() => setIsInviteOpen(false)}
                onSubmit={handleInviteSubmit}
                isSubmitting={sendInvite.isPending}
            />
        </DashboardLayout>
    )
}

export default MarketingReferrals
