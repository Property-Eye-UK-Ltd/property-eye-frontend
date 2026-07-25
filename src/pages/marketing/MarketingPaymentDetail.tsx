import { useParams } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import { DocumentText } from "iconsax-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMarketerPayments } from "@/features/marketing/api/useMarketer"
import { getMarketerPayoutStatement } from "@/features/marketing/api/marketerService"

const statusStyles: Record<string, string> = {
    paid: "bg-green-50 text-green-600 border border-green-100",
    scheduled: "bg-amber-50 text-amber-600 border border-amber-100",
    rejected: "bg-red-50 text-red-600 border border-red-100",
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value)

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
)

const MarketingPaymentDetail = () => {
    const { paymentId } = useParams<{ paymentId: string }>()
    const { data, isLoading } = useMarketerPayments()
    const [isDownloading, setIsDownloading] = useState(false)
    const payment = data?.payments.find((p) => p.id === paymentId)

    const handleDownload = async () => {
        if (!payment) return
        setIsDownloading(true)
        try {
            const { statement_url } = await getMarketerPayoutStatement(payment.id)
            window.open(statement_url, "_blank", "noopener,noreferrer")
        } catch {
            toast.error("Couldn't fetch that statement. Try again.")
        } finally {
            setIsDownloading(false)
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader title="Payment Detail" breadcrumbs={[{ label: "Payments", href: "/marketing/payments" }]} />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">Loading…</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

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

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Payment Detail"
                breadcrumbs={[
                    { label: "Payments", href: "/marketing/payments" },
                    { label: formatDate(payment.created_at) },
                ]}
                actions={
                    <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="h-9 gap-2 rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/70 hover:text-white disabled:opacity-60 lg:h-10 lg:px-6"
                    >
                        <DocumentText size={18} variant="Bulk" />
                        {isDownloading ? "Fetching…" : "Download Statement"}
                    </Button>
                }
            />

            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <Field label="Payment Date" value={formatDate(payment.created_at)} />
                            <Field label="Amount" value={formatCurrency(payment.amount)} />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
                                        statusStyles[payment.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
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
