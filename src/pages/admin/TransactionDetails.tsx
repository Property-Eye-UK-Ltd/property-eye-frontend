import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router-dom"
import { billingStatusStyles } from "@/data/adminBillingData"
import { useAdminInvoiceDetail } from "@/features/adminbilling/api/useAdminBilling"
import { cn } from "@/lib/utils"

const TransactionDetails = () => {
    const { transactionId } = useParams<{ transactionId: string }>()
    const { data: transaction, isLoading } = useAdminInvoiceDetail(transactionId ?? "")

    if (isLoading) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Loading...</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (!transaction) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Transaction not found</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Transaction Details"
                breadcrumbs={[{ label: "Billing & Finance", href: "/admin/billing" }, { label: transaction.transactionId }]}
                actions={
                    <Button
                        onClick={handlePrint}
                        className="h-9 rounded-full bg-primary px-4 text-sm text-white lg:h-10 lg:px-6"
                    >
                        Print Transaction
                    </Button>
                }
            />

            {/* Page Content */}
            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Transaction ID */}
                            <div>
                                <p className="text-sm text-muted-foreground">Transaction ID</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.transactionId}</p>
                            </div>

                            {/* Subscription Plan */}
                            <div>
                                <p className="text-sm text-muted-foreground">Subscription Plan</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.planTier}</p>
                            </div>

                            {/* Transaction Date */}
                            <div>
                                <p className="text-sm text-muted-foreground">Transaction Date</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.transactionDate}</p>
                            </div>

                            {/* Agency Name */}
                            <div>
                                <p className="text-sm text-muted-foreground">Agency Name</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.agencyName}</p>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.agencyEmail}</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge
                                    className={cn("mt-1 rounded-full px-3 py-1 text-xs font-normal", billingStatusStyles[transaction.status])}
                                >
                                    {transaction.status}
                                </Badge>
                            </div>

                            {/* Amount */}
                            <div>
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.amount}</p>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="mt-1 text-base font-medium text-foreground">Stripe</p>
                            </div>

                            {/* Agency Address */}
                            <div>
                                <p className="text-sm text-muted-foreground">Agency Address</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.agencyAddress}</p>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <p className="text-sm text-muted-foreground">Phone Number</p>
                                <p className="mt-1 text-base font-medium text-foreground">{transaction.agencyPhoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default TransactionDetails
