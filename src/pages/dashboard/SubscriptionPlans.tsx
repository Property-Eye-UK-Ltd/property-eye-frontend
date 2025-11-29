import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PlanCard } from "@/features/billing/components/PlanCard"
import { subscriptionPlans } from "@/data/subscription-plans-data"
import { toast } from "sonner"

const SubscriptionPlans = () => {
    const navigate = useNavigate()

    const handleSelectPlan = (planId: string) => {
        // Handle plan selection
        console.log("Selected plan:", planId)
        toast.success("Plan selection initiated", {
            description: "Redirecting to checkout...",
        })
        // In a real app, this would navigate to checkout or show a confirmation modal
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
            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                {/* Plans Container - White Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {subscriptionPlans.map((plan) => (
                            <PlanCard key={plan.id} plan={plan} onSelectPlan={handleSelectPlan} />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default SubscriptionPlans
