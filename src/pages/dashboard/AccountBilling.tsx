import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardDetailsSkeleton } from "@/components/dashboard"
import { PlanCard } from "@/features/billing/components/PlanCard"
import { PaymentHistoryTable } from "@/features/billing/components/PaymentHistoryTable"
import { EmptyPaymentHistory } from "@/features/billing/components/EmptyPaymentHistory"
import { CancelSubscriptionConfirmModal } from "@/features/billing/components/modals/CancelSubscriptionConfirmModal"
import { CancelSubscriptionFormModal, CancelSubscriptionFormValues } from "@/features/billing/components/modals/CancelSubscriptionFormModal"
import { toast } from "sonner"
import { useSubscription, useInvoices, useCancelPlan } from "@/features/billing/api/useBilling"
import { usePlan } from "@/features/billing/api/usePlans"
import { confirmCheckout, downloadInvoice, subscribeToPlan } from "@/features/billing/api/billingService"
import { queryKeys } from "@/lib/queryKeys"

type CheckoutConfirmState = "idle" | "confirming" | "confirmed"

const AccountBilling = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [checkoutConfirmState, setCheckoutConfirmState] = useState<CheckoutConfirmState>("idle")

    const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription()
    const { data: invoices = [], isLoading: isInvoicesLoading } = useInvoices()
    const { data: plan, isLoading: isPlanLoading } = usePlan()
    const cancelPlanMutation = useCancelPlan()

    useEffect(() => {
        const sessionId = searchParams.get("session_id")
        if (sessionId) {
            setCheckoutConfirmState("confirming")
            confirmCheckout(sessionId)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: queryKeys.billing.currentPlan() })
                    setCheckoutConfirmState("confirmed")
                    setTimeout(() => {
                        setCheckoutConfirmState("idle")
                        navigate("/dashboard/billing", { replace: true })
                    }, 1500)
                })
                .catch((error) => {
                    console.error("Failed to confirm checkout session:", error)
                    toast.error("Could not confirm your subscription. Please contact support if this persists.")
                    setCheckoutConfirmState("idle")
                    navigate("/dashboard/billing", { replace: true })
                })
            return
        }

        if (searchParams.get("checkout") === "cancelled") {
            toast.info("Checkout cancelled", {
                description: "No payment was taken. You can subscribe again whenever you're ready.",
            })
            navigate("/dashboard/billing", { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const hasActivePlan = subscription?.status === "active"
    const hasPaymentHistory = invoices.length > 0

    const handleCancelPlanClick = () => {
        setIsConfirmModalOpen(true)
    }

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false)
        setIsFormModalOpen(true)
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

    const handleDownloadInvoice = async (invoiceNumber: string) => {
        try {
            const url = await downloadInvoice(invoiceNumber)
            window.open(url, "_blank")
        } catch (error) {
            console.error("Failed to download invoice:", error)
            toast.error("Failed to download invoice.")
        }
    }

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

    if (checkoutConfirmState !== "idle") {
        return (
            <DashboardLayout>
                <DynamicPageHeader title="Account & Billing" />
                <DashboardPageContent>
                    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                        {checkoutConfirmState === "confirming" ? (
                            <>
                                <Loader2 className="h-14 w-14 animate-spin text-primary" />
                                <p className="text-base text-muted-foreground">Confirming your subscription...</p>
                            </>
                        ) : (
                            <>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                                        <TickCircle size={28} variant="Bold" className="text-success" />
                                    </div>
                                </div>
                                <p className="text-base font-medium text-foreground">Subscription confirmed</p>
                            </>
                        )}
                    </div>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (isSubscriptionLoading || isInvoicesLoading || isPlanLoading) {
        return (
            <DashboardLayout>
                <DynamicPageHeader title="Account & Billing" />
                <DashboardPageContent>
                    <DashboardDetailsSkeleton layoutType="billing" />
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Account & Billing" />
            <DashboardPageContent>
                {plan && (
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
                                      onCancelPlan: handleCancelPlanClick,
                                      isCancelling: cancelPlanMutation.isPending,
                                      cancelAtPeriodEnd: subscription.cancel_at_period_end,
                                  }
                                : undefined
                        }
                    />
                )}

                {hasPaymentHistory ? (
                    <PaymentHistoryTable invoices={invoices} onDownload={handleDownloadInvoice} />
                ) : (
                    <EmptyPaymentHistory />
                )}
            </DashboardPageContent>

            <CancelSubscriptionConfirmModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmCancel}
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

export default AccountBilling
