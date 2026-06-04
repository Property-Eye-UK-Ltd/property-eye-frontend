import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { MarketerFraudCasesTable } from "@/features/marketing/fraud-cases/components/MarketerFraudCasesTable"
import { CommissionLinesTable } from "@/features/marketing/commissions/components/CommissionLinesTable"
import { cn } from "@/lib/utils"
import {
    marketerAgencies,
    marketerAgencyStatusStyles,
    attributionMethodStyles,
    marketerFraudCases,
    commissionLines,
} from "@/data/marketing-data"

const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
)

const MarketingAgencyDetail = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const agency = marketerAgencies.find((a) => a.id === agencyId)

    if (!agency) {
        return (
            <DashboardLayout variant="marketer">
                <DynamicPageHeader
                    title="Agency Detail"
                    breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: "Not found" }]}
                />
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">This agency could not be found.</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const relatedFraud = marketerFraudCases.filter((c) => c.agency === agency.name)
    const relatedCommissions = commissionLines.filter((l) => l.agency === agency.name)

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader
                title={agency.name}
                breadcrumbs={[{ label: "My Agencies", href: "/marketing/agencies" }, { label: agency.name }]}
            />

            <DashboardPageContent>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                                        marketerAgencyStatusStyles[agency.status]
                                    )}
                                >
                                    {agency.status}
                                </span>
                            </div>
                            <Field label="Date Added" value={agency.dateAdded} />
                            <div>
                                <p className="text-sm text-muted-foreground">Attribution Method</p>
                                <span
                                    className={cn(
                                        "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                                        attributionMethodStyles[agency.attributionMethod]
                                    )}
                                >
                                    {agency.attributionMethod}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <Field label="Total Fraud Value" value={agency.totalFraudValue} />
                            <Field label="Commission Earned" value={agency.totalCommission} />
                            <Field
                                label="Attribution"
                                value={agency.attributed ? "Locked to you" : "Pending — claim submitted"}
                            />
                        </div>
                    </div>
                </div>

                <MarketerFraudCasesTable data={relatedFraud} />

                <CommissionLinesTable data={relatedCommissions} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencyDetail
