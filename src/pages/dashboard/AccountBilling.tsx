import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CurrentPlanCard } from "@/features/billing/components/CurrentPlanCard"
import { PaymentHistoryTable } from "@/features/billing/components/PaymentHistoryTable"
import { CancelSubscriptionConfirmModal } from "@/features/billing/components/modals/CancelSubscriptionConfirmModal"
import { CancelSubscriptionFormModal, CancelSubscriptionFormValues } from "@/features/billing/components/modals/CancelSubscriptionFormModal"
import { toast } from "sonner"

const AccountBilling = () => {
    const navigate = useNavigate()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCancelPlanClick = () => {
        setIsConfirmModalOpen(true)
    }

    const handleChangePlanClick = () => {
        navigate("/dashboard/billing/plans")
    }

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false)
        setIsFormModalOpen(true)
    }

    const handleFormSubmit = async (values: CancelSubscriptionFormValues) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Cancelling subscription:", values)
        setIsSubmitting(false)
        setIsFormModalOpen(false)

        // Show success toast
        toast.success("Subscription cancelled successfully", {
            description: "Your subscription has been cancelled",
        })
    }

    return (
        <DashboardLayout>
            <PageHeader title="Account & Billing" />
            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                {/* Current Plan */}
                <CurrentPlanCard
                    onCancelPlan={handleCancelPlanClick}
                    onChangePlan={handleChangePlanClick}
                />

                {/* Payment History */}
                <PaymentHistoryTable />
            </div>

            {/* Cancel Subscription Confirm Modal */}
            <CancelSubscriptionConfirmModal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmCancel}
            />

            {/* Cancel Subscription Form Modal */}
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
