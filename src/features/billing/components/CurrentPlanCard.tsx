import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CurrentPlanCardProps {
    planName: string
    priceGbp: number
    billingInterval: string
    nextBillingDate: string
    onCancelPlan?: () => void
}

export const CurrentPlanCard = ({
    planName,
    priceGbp,
    billingInterval,
    nextBillingDate,
    onCancelPlan,
}: CurrentPlanCardProps) => {
    return (
        <DashboardPanel className="overflow-hidden" hasBorder>
            <div className="space-y-4 lg:space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-medium text-foreground lg:text-lg">
                                Current Plan ({planName})
                            </h3>
                            <Badge className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 hover:bg-purple-100 lg:px-3 lg:text-xs">
                                {billingInterval}
                            </Badge>
                        </div>
                        <p className="text-2xl font-medium text-foreground lg:text-3xl">
                            £{priceGbp}
                            <span className="text-sm font-normal text-muted-foreground lg:text-base">/month</span>
                        </p>
                    </div>

                    <p className="text-xs text-muted-foreground lg:text-sm">
                        Next billing:{" "}
                        <span className="text-foreground">{nextBillingDate}</span>
                    </p>
                </div>


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
