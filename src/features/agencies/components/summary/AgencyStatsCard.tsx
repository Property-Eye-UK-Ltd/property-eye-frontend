import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
                            <p className="text-xs text-muted-foreground mb-1">Checks Used</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-primary font-medium">{data.checksUsed}</p>
                                <Progress
                                    value={data.checksPercentage}
                                    className="flex-1 h-1.5 max-w-[120px] rounded-full [&>div]:bg-[#B694FF] [&>div]:rounded-full"
                                />
                                <span className="text-sm text-muted-foreground">{data.checksPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Last Data Pull</p>
                            <p className="text-sm text-primary">{data.lastDataPull}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Data Pull Status</p>
                            <Badge
                                className={cn(
                                    "rounded-full px-3 py-0.5 text-xs font-normal",
                                    data.dataPullStatus === "Active"
                                        ? "bg-green-50 text-green-600 border border-green-100"
                                        : "bg-red-50 text-red-600 border border-red-100"
                                )}
                            >
                                {data.dataPullStatus}
                            </Badge>
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

                <div>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Overdue Invoices</p>
                            <p className="text-sm text-primary">{data.overdueInvoices}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Next Billing Date</p>
                            <p className="text-sm text-primary">{data.nextBillingDate}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground mb-4">Land Registry</p>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Completion Date</p>
                            <p className="text-sm text-primary">{data.completionDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Buyer Name</p>
                            <p className="text-sm text-primary">{data.buyerName}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground mb-4">Transaction Metadata</p>
                    <div className="grid gap-y-4 gap-x-12 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Payment Date</p>
                            <p className="text-sm text-primary">{data.nextBillingDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Payer</p>
                            <p className="text-sm text-primary">{data.buyerName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Recipient</p>
                            <p className="text-sm text-primary">Ryan Petz</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Amount</p>
                            <p className="text-sm text-primary">£135,325</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
