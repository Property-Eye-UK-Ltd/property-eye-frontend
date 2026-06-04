import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { ReferralLinkCard } from "@/features/marketing/referrals/components/ReferralLinkCard"
import { InviteStatusTable } from "@/features/marketing/referrals/components/InviteStatusTable"
import {
    InviteAgencyModal,
    InviteAgencyFormValues,
} from "@/features/marketing/referrals/components/InviteAgencyModal"
import { agencyInvites, AgencyInvite } from "@/data/marketing-data"

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
                actions={[
                    {
                        label: "Invite Agency",
                        onClick: () => setIsInviteOpen(true),
                    },
                ]}
            />

            <DashboardPageContent>
                <ReferralLinkCard onInvite={() => setIsInviteOpen(true)} />

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
