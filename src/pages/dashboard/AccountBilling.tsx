import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CurrentPlanCard } from "@/features/billing/components/CurrentPlanCard"
import { PaymentHistoryTable } from "@/features/billing/components/PaymentHistoryTable"
import { EmptyPlanCard } from "@/features/billing/components/EmptyPlanCard"
import { EmptyPaymentHistory } from "@/features/billing/components/EmptyPaymentHistory"
import { CancelSubscriptionConfirmModal } from "@/features/billing/components/modals/CancelSubscriptionConfirmModal"
import { CancelSubscriptionFormModal, CancelSubscriptionFormValues } from "@/features/billing/components/modals/CancelSubscriptionFormModal"
import { toast } from "sonner"
import { useSubscription, useInvoices, useCancelPlan } from "@/features/billing/api/useBilling"
import { downloadInvoice } from "@/features/billing/api/billingService"
import { queryKeys } from "@/lib/queryKeys"
import { useState } from "react"

const AccountBilling = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)

    const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription()
    const { data: invoices = [], isLoading: isInvoicesLoading } = useInvoices()
    const cancelPlanMutation = useCancelPlan()

    useEffect(() => {
        const checkout = searchParams.get("checkout")
        if (checkout === "success") {
            toast.success("Subscription completed successfully!", {
                description: "Welcome to Property Eye.",
            })
            queryClient.invalidateQueries({ queryKey: queryKeys.billing.currentPlan() })
            navigate("/dashboard/billing", { replace: true })
        } else if (checkout === "cancelled") {
            navigate("/dashboard/billing", { replace: true })
        }
    }, [searchParams, queryClient, navigate])

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

    if (isSubscriptionLoading || isInvoicesLoading) {
        return (
            <DashboardLayout>
                <DynamicPageHeader title="Account & Billing" />
                <DashboardPageContent>
                    <div className="py-12 text-center text-sm text-muted-foreground">Loading billing details...</div>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Account & Billing" />
            <DashboardPageContent>
                {hasActivePlan && subscription ? (
                    <CurrentPlanCard
                        planName={subscription.plan_name}
                        priceGbp={subscription.price_gbp}
                        billingInterval={subscription.billing_interval}
                        nextBillingDate={new Date(subscription.next_billing_date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                        onCancelPlan={handleCancelPlanClick}
                    />
                ) : (
                    <EmptyPlanCard onChoosePlan={() => navigate("/dashboard/billing/plans")} />
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
