import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { DocumentText } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { payments, paymentStatusStyles } from "@/data/marketing-data"

const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
)

const MarketingPaymentDetail = () => {
    const { paymentId } = useParams<{ paymentId: string }>()
    const payment = payments.find((p) => p.id === paymentId)

    if (!payment) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader
                    title="Payment Detail"
                    breadcrumbs={[{ label: "Payments", href: "/marketing/payments" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This payment could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const handleDownload = () => toast.success(`Downloading statement ${payment.statementId}`)

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Payment Detail"
                breadcrumbs={[
                    { label: "Payments", href: "/marketing/payments" },
                    { label: payment.statementId },
                ]}
                actions={
                    <Button
                        onClick={handleDownload}
                        className="h-9 gap-2 rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/70 hover:text-white lg:h-10 lg:px-6"
                    >
                        <DocumentText size={18} variant="Bulk" />
                        Download Statement
                    </Button>
                }
            />

            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <Field label="Statement ID" value={payment.statementId} />
                            <Field label="Payment Date" value={payment.date} />
                            <Field label="Period Covered" value={payment.period} />
                        </div>
                        <div className="space-y-6">
                            <Field label="Amount" value={payment.amount} />
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                                        paymentStatusStyles[payment.status]
                                    )}
                                >
                                    {payment.status}
                                </span>
                            </div>
                            <Field label="Payment Method" value="Bank transfer" />
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingPaymentDetail
