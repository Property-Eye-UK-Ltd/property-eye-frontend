import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PlanCard } from "@/features/billing/components/PlanCard"
import { CancelSubscriptionConfirmModal } from "@/features/billing/components/modals/CancelSubscriptionConfirmModal"
import {
    CancelSubscriptionFormModal,
    CancelSubscriptionFormValues,
} from "@/features/billing/components/modals/CancelSubscriptionFormModal"
import { toast } from "sonner"
import { subscribeToPlan } from "@/features/billing/api/billingService"
import { usePlan } from "@/features/billing/api/usePlans"
import { useSubscription, useCancelPlan } from "@/features/billing/api/useBilling"

const SubscriptionPlans = () => {
    const { data: plan, isLoading: isPlanLoading, isError } = usePlan()
    const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription()
    const cancelPlanMutation = useCancelPlan()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)

    const isLoading = isPlanLoading || isSubscriptionLoading
    const hasActivePlan = subscription?.status === "active"

    const handleSubscribe = async () => {
        if (!plan) return
        try {
            toast.info("Plan selection initiated", {
                description: "Redirecting to checkout...",
            })
            const res = await subscribeToPlan(plan.id)
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

    const handleFormSubmit = async (_values: CancelSubscriptionFormValues) => {
        try {
            const result = await cancelPlanMutation.mutateAsync()
            setIsFormModalOpen(false)
            toast.success("Subscription cancelled successfully", {
                description: result.message,
            })
        } catch (error) {
            console.error("Failed to cancel subscription:", error)
            toast.error("Failed to cancel subscription. Please try again.")
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
                        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
                    ) : isError || !plan ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Could not load subscription plan. Please try again shortly.
                        </p>
                    ) : (
                        <PlanCard
                            name={plan.name}
                            description={plan.target_customer_description}
                            priceGbp={plan.price_gbp_monthly}
                            billingInterval={plan.billing_interval}
                            features={plan.feature_list}
                            onSubscribe={handleSubscribe}
                            subscription={
                                hasActivePlan && subscription
                                    ? {
                                          nextBillingDate: new Date(
                                              subscription.next_billing_date
                                          ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric",
                                          }),
                                          onCancelPlan: () => setIsConfirmModalOpen(true),
                                          isCancelling: cancelPlanMutation.isPending,
                                          cancelAtPeriodEnd: subscription.cancel_at_period_end,
                                      }
                                    : undefined
                            }
                        />
                    )}
                </div>
            </DashboardPageContent>

            <CancelSubscriptionConfirmModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={() => {
                    setIsConfirmModalOpen(false)
                    setIsFormModalOpen(true)
                }}
            />

            <CancelSubscriptionFormModal
                open={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                isSubmitting={cancelPlanMutation.isPending}
            />
        </DashboardLayout>
    )
}

export default SubscriptionPlans
