import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CurrentPlanCard } from "@/features/billing/components/CurrentPlanCard"
import { PaymentHistoryTable } from "@/features/billing/components/PaymentHistoryTable"

const AccountBilling = () => {
    return (
        <DashboardLayout>
            <PageHeader title="Account & Billing" />
            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                {/* Current Plan */}
                <CurrentPlanCard />

                {/* Payment History */}
                <PaymentHistoryTable />
            </div>
        </DashboardLayout>
    )
}

export default AccountBilling
