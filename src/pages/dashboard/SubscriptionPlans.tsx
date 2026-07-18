import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PlanCard } from "@/features/billing/components/PlanCard"
import { SubscriptionPlan } from "@/data/subscription-plans-data"
import { toast } from "sonner"
import { subscribeToPlan } from "@/features/billing/api/billingService"
import { usePlans } from "@/features/billing/api/usePlans"

const SubscriptionPlans = () => {
    const navigate = useNavigate()
    const { data: plans, isLoading, isError } = usePlans()

    const mappedPlans: SubscriptionPlan[] = (plans ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        priceRange: `£${p.price_gbp_monthly}`,
        priceSubtext: `per ${p.billing_interval}`,
        description: p.target_customer_description,
        features: p.feature_list.map((text) => ({ text })),
    }))

    const handleSelectPlan = async (planId: string) => {
        try {
            toast.info("Plan selection initiated", {
                description: "Redirecting to checkout...",
            })
            const res = await subscribeToPlan(planId)
            if (res.checkout_url) {
                window.location.href = res.checkout_url
            } else {
                toast.error("Could not initiate checkout redirect")
            }
        } catch (error) {
            toast.error("An error occurred during plan selection")
            console.error(error)
        }
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Subscription Plans"
                breadcrumbs={[
                    { label: "Account & Billing", href: "/dashboard/billing" },
                    { label: "Subscription Plans" },
                ]}
            />
            <DashboardPageContent>
                <div className="rounded-2xl bg-white p-3 shadow-sm sm:p-4 lg:p-6">
                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
                            ))}
                        </div>
                    ) : isError ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Could not load subscription plans. Please try again shortly.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {mappedPlans.map((plan) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    onSelectPlan={handleSelectPlan}
                                    ctaText="Subscribe"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default SubscriptionPlans
