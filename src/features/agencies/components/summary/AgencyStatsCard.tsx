import { Badge } from "@/components/ui/badge"
import { AgencyProfileData } from "@/data/agencyProfileData"

interface AgencyStatsCardProps {
    data: AgencyProfileData
}

export const AgencyStatsCard = ({ data }: AgencyStatsCardProps) => {
    return (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground mb-4">Agency Stats</p>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Subscription Plan</p>
                            <p className="text-sm text-primary">{data.subscriptionPlan ?? "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Integration Type</p>
                            {data.integrationType ? (
                                <Badge className="rounded-full px-3 py-0.5 text-xs font-medium bg-primary/5 text-primary border border-primary/10">
                                    {data.integrationType}
                                </Badge>
                            ) : (
                                <p className="text-sm text-muted-foreground">—</p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Next Billing Date</p>
                            <p className="text-sm text-primary">{data.nextBillingDate ?? "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Open Cases</p>
                            <p className="text-sm text-primary">{data.openCases}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Recovered Commission</p>
                            <p className="text-sm text-primary">{data.recoveredCommission}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
