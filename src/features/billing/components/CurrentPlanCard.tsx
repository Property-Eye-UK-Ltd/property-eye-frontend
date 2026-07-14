import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { currentPlan, COMMISSION_STANDING_DISCLOSURE } from "@/data/billing-data"

interface CurrentPlanCardProps {
    onCancelPlan?: () => void
}

export const CurrentPlanCard = ({ onCancelPlan }: CurrentPlanCardProps) => {
    return (
        <DashboardPanel className="overflow-hidden" hasBorder>
            <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-medium text-foreground lg:text-lg">
                                Current Plan ({currentPlan.name})
                            </h3>
                            <Badge className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 hover:bg-purple-100 lg:px-3 lg:text-xs">
                                {currentPlan.billingCycle}
                            </Badge>
                        </div>
                        <p className="text-2xl font-medium text-foreground lg:text-3xl">
                            £{currentPlan.price}
                            <span className="text-sm font-normal text-muted-foreground lg:text-base">/month</span>
                        </p>
                    </div>

                    <p className="text-xs text-muted-foreground lg:text-sm">
                        Next billing:{" "}
                        <span className="text-foreground">{currentPlan.nextBillingDate}</span>
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/40 px-3 py-3 lg:px-4 lg:py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1 lg:text-sm">
                                Users Included
                            </p>
                            <p className="text-lg font-medium text-foreground lg:text-xl">
                                Up to {currentPlan.maxUsers} {currentPlan.maxUsers === 1 ? "user" : "users"}
                            </p>
                        </div>
                        <Badge className="h-fit w-fit rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 hover:bg-purple-100 lg:px-3 lg:text-xs">
                            {currentPlan.name}
                        </Badge>
                    </div>
                </div>

                <p className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground lg:text-sm">
                    {COMMISSION_STANDING_DISCLOSURE}
                </p>

                <div className="flex w-full flex-row gap-2 pt-1 lg:justify-end">
                    <Button
                        variant="outline"
                        onClick={onCancelPlan}
                        className="h-9 flex-1 rounded-full border-red-200 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 lg:h-10 lg:flex-none lg:px-8"
                    >
                        Cancel Plan
                    </Button>
                </div>
            </div>
        </DashboardPanel>
    )
}
