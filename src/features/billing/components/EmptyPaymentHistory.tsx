import { DashboardPanel } from "@/components/dashboard/DashboardPanel"

export const EmptyPaymentHistory = () => {
    return (
        <DashboardPanel
            title="Payment History"
            description="View all past billing transactions and payment records."
            className="overflow-hidden"
            hasBorder
        >
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="text-lg font-medium text-foreground mb-2">
                    No billing records yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                    Once you're subscribed, you'll be able to see all your invoices here.
                </p>
            </div>
        </DashboardPanel>
    )
}
