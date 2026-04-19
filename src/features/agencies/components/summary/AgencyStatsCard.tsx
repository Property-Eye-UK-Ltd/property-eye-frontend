import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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
                            <p className="text-sm text-primary">{data.subscriptionPlan}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Integration Type</p>
                            <Badge className="rounded-full px-3 py-0.5 text-xs font-medium bg-primary/5 text-primary border border-primary/10">
                                {data.integrationType}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Integration Status</p>
                            <Badge
                                className={cn(
                                    "rounded-full px-3 py-0.5 text-xs font-normal",
                                    data.integrationStatus === "Active"
                                        ? "bg-green-50 text-green-600 border border-green-100"
                                        : "bg-red-50 text-red-600 border border-red-100"
                                )}
                            >
                                {data.integrationStatus}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Next Billing Date</p>
                            <p className="text-sm text-primary">{data.nextBillingDate}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Open Cases</p>
                            <p className="text-sm text-primary">{data.openCases}</p>
                        </div>
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
