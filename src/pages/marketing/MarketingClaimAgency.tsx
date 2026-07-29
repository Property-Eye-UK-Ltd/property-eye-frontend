import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ContactSupportPanel } from "@/features/marketing/support/components/ContactSupportPanel"
import { SearchNormal, TickCircle, MessageQuestion } from "iconsax-react"

const steps = [
    {
        icon: SearchNormal,
        title: "Check My Agencies first",
        body: "Give it a moment — new signups from your referral link or an invite can take a little while to appear.",
    },
    {
        icon: MessageQuestion,
        title: "Still not there?",
        body: "Tell support which agency you referred and how (your link, an invite, or a manual introduction). They'll verify it on their side.",
    },
    {
        icon: TickCircle,
        title: "We link it to your account",
        body: "Once verified, an admin attributes the agency to you directly — it'll then appear in My Agencies with all future fraud activity counted toward your commission.",
    },
]

const MarketingClaimAgency = () => {
    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Claim an Agency"
                breadcrumbs={[
                    { label: "My Agencies", href: "/marketing/agencies" },
                    { label: "Claim an Agency" },
                ]}
            />

            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <DashboardPanel
                    title="Referred an agency you don't see listed?"
                    description="Attribution isn't something you set yourself in the app — it's verified and linked by our team."
                    hasBorder
                >
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={step.title} className="flex gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                                    {index + 1}
                                </div>
                                <div className="pt-1">
                                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                                    <p className="mt-0.5 text-sm text-muted-foreground">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardPanel>

                <ContactSupportPanel
                    title="Claim this agency"
                    description="Send support the agency's name and how you referred them — they'll take it from there."
                    lockedSubject="Agency Ownership Dispute"
                    hideDetails={true}
                />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingClaimAgency
