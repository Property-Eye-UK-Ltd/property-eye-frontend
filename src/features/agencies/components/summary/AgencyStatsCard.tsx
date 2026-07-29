import { AgencyProfileData } from "@/data/agencyProfileData"

interface AgencyStatsCardProps {
    data: AgencyProfileData
}

const formatDate = (value?: string | null) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return "—"
    return `£${value.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export const AgencyStatsCard = ({ data }: AgencyStatsCardProps) => {
    return (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-4">Agency Stats</p>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Subscription Plan</p>
                            <p className="text-sm font-medium text-primary">{data.subscriptionPlan ?? "—"}</p>
                        </div>
                        
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Next Billing Date</p>
                            <p className="text-sm font-medium text-primary">{formatDate(data.nextBillingDate)}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Total Listings</p>
                            <p className="text-sm font-medium text-primary">{data.totalListings.toLocaleString()}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Open Cases</p>
                            <p className="text-sm font-medium text-primary">{data.openCases.toLocaleString()}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Confirmed Fraud Cases</p>
                            <p className="text-sm font-medium text-primary">{data.confirmedFraud.toLocaleString()}</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Recovered Commission</p>
                            <p className="text-sm font-medium text-primary">{formatCurrency(data.recoveredCommission)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
