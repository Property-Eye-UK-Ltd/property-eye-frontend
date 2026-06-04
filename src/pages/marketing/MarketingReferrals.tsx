import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import {
    InviteAgencyModal,
    InviteAgencyFormValues,
} from "@/features/marketing/referrals/components/InviteAgencyModal"
import { agencyInvites, AgencyInvite, marketerReferralMetrics } from "@/data/marketing-data"

const formatToday = () =>
    new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const MarketingReferrals = () => {
    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [invites, setInvites] = useState<AgencyInvite[]>(agencyInvites)

    const handleInviteSubmit = (values: InviteAgencyFormValues) => {
        setIsSubmitting(true)

        const newInvite: AgencyInvite = {
            id: `inv-${Date.now()}`,
            agencyName: values.agencyName,
            agencyEmail: values.agencyEmail,
            status: "Sent",
            dateSent: formatToday(),
        }

        setInvites((prev) => [newInvite, ...prev])
        setIsSubmitting(false)
        setIsInviteOpen(false)
        toast.success(`Invite sent to ${values.agencyName}`)
    }

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Referrals"
                filters={<ReferralLinkField onInvite={() => setIsInviteOpen(true)} />}
            />

            <DashboardPageContent>
                <MetricCards metrics={marketerReferralMetrics} columns={3} />

                <InviteStatusTable
                    data={invites}
                    title="Invite tracking"
                    description="Every invite you've sent, from delivery through to signup."
                />
            </DashboardPageContent>

            <InviteAgencyModal
                open={isInviteOpen}
                onClose={() => setIsInviteOpen(false)}
                onSubmit={handleInviteSubmit}
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default MarketingReferrals
