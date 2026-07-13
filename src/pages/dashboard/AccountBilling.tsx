import { useState } from "react"
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
import { currentPlan, paymentHistory } from "@/data/billing-data"

const AccountBilling = () => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const hasActivePlan = currentPlan !== null
    const hasPaymentHistory = paymentHistory.length > 0

    const handleCancelPlanClick = () => {
        setIsConfirmModalOpen(true)
    }

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false)
        setIsFormModalOpen(true)
    }

    const handleFormSubmit = async (values: CancelSubscriptionFormValues) => {
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Cancelling subscription:", values)
        setIsSubmitting(false)
        setIsFormModalOpen(false)
        toast.success("Subscription cancelled successfully", {
            description: "Your subscription has been cancelled",
        })
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Account & Billing" />
            <DashboardPageContent>
                {hasActivePlan ? (
                    <CurrentPlanCard onCancelPlan={handleCancelPlanClick} />
                ) : (
                    <EmptyPlanCard onChoosePlan={() => {}} />
                )}

                {hasPaymentHistory ? (
                    <PaymentHistoryTable />
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
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default AccountBilling
