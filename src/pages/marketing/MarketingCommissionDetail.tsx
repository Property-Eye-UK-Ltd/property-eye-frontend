import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { cn } from "@/lib/utils"
import { useMarketerCommissions } from "@/features/marketing/api/useMarketer"

import { Skeleton } from "@/components/ui/skeleton"

const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600 border border-amber-100",
    approved: "bg-blue-50 text-blue-600 border border-blue-100",
    paid: "bg-green-50 text-green-600 border border-green-100",
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

const MarketingCommissionDetail = () => {
    const { lineId } = useParams<{ lineId: string }>()
    const { data, isLoading } = useMarketerCommissions()
    const line = data?.commissions.find((l) => l.id === lineId)

    if (isLoading) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader title="Commission Detail" breadcrumbs={[{ label: "Commissions", href: "/marketing/commissions" }]} />
                <DashboardPageContent>
                    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="space-y-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (!line) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader
                    title="Commission Detail"
                    breadcrumbs={[{ label: "Commissions", href: "/marketing/commissions" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This commission line could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const eligibilityLabel =
        line.status === "pending"
            ? "Awaiting admin approval"
            : line.status === "approved"
              ? "Approved — awaiting payout"
              : "Paid out"

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Commission Detail"
                breadcrumbs={[
                    { label: "Commissions", href: "/marketing/commissions" },
                    { label: line.agency_name },
                ]}
            />

            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <Field label="Agency" value={line.agency_name} />
                            <Field label="Fraud Value" value={formatCurrency(line.fraud_value)} />
                            <Field label="Commission Rate" value={`${line.commission_percent}%`} />
                        </div>
                        <div className="space-y-6">
                            <Field label="Commission Amount" value={formatCurrency(line.commission_amount)} />
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
                                        statusStyles[line.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                                    )}
                                >
                                    {line.status}
                                </span>
                            </div>
                            <Field label="Eligibility" value={eligibilityLabel} />
                            <Field label="Created" value={formatDate(line.created_at)} />
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingCommissionDetail
