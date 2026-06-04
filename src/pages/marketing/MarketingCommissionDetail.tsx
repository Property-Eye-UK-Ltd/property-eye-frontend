import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { cn } from "@/lib/utils"
import { commissionLines, commissionLineStatusStyles } from "@/data/marketing-data"

const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
)

const MarketingCommissionDetail = () => {
    const { lineId } = useParams<{ lineId: string }>()
    const line = commissionLines.find((l) => l.id === lineId)

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

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title="Commission Detail"
                breadcrumbs={[
                    { label: "Commissions", href: "/marketing/commissions" },
                    { label: line.fraudCase },
                ]}
            />

            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <Field label="Agency" value={line.agency} />
                            <Field label="Fraud Case" value={line.fraudCase} />
                            <Field label="Commission Rate" value={line.commissionPct} />
                        </div>
                        <div className="space-y-6">
                            <Field label="Commission Amount" value={line.amount} />
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                                        commissionLineStatusStyles[line.status]
                                    )}
                                >
                                    {line.status}
                                </span>
                            </div>
                            <Field
                                label="Eligibility"
                                value={
                                    line.status === "Pending"
                                        ? "Awaiting admin approval"
                                        : line.status === "Approved"
                                          ? "Approved — awaiting payout"
                                          : "Paid out"
                                }
                            />
                        </div>
                    </div>
                </div>
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingCommissionDetail
