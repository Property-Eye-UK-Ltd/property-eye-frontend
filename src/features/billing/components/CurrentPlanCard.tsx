import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DonutChart } from "@/components/ui/donut-chart"
import { currentPlan } from "@/data/billing-data"

interface CurrentPlanCardProps {
    onCancelPlan?: () => void
    onChangePlan?: () => void
}

export const CurrentPlanCard = ({ onCancelPlan, onChangePlan }: CurrentPlanCardProps) => {
    const checksPercentage = Math.round((currentPlan.checksUsed / currentPlan.checksTotal) * 100)
    const crmPercentage = Math.round((currentPlan.crmUsersUsed / currentPlan.crmUsersTotal) * 100)

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

                    <div className="flex items-center gap-2 sm:gap-3">
                        <p className="text-xs text-muted-foreground lg:text-sm">
                            Next billing:{" "}
                            <span className="text-foreground">{currentPlan.nextBillingDate}</span>
                        </p>
                        <DonutChart value={75} size={25} strokeWidth={3} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-xs lg:text-sm">
                            <span className="text-muted-foreground">
                                {currentPlan.checksUsed}/{currentPlan.checksTotal} checks
                            </span>
                            <span className="font-medium text-foreground">{checksPercentage}%</span>
                        </div>
                        <Progress value={checksPercentage} className="h-1.5 [&>div]:rounded-full [&>div]:bg-primary" />
                    </div>

                    <div className="hidden h-12 w-px bg-border lg:block" />

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-xs lg:text-sm">
                            <span className="text-muted-foreground">
                                CRM: {currentPlan.crmUsersUsed}/{currentPlan.crmUsersTotal} users
                            </span>
                            <span className="font-medium text-foreground">{crmPercentage}%</span>
                        </div>
                        <Progress value={crmPercentage} className="h-1.5 [&>div]:rounded-full [&>div]:bg-primary" />
                    </div>
                </div>

                <div className="flex w-full flex-row gap-2 pt-1 lg:justify-end">
                    <Button
                        variant="outline"
                        onClick={onCancelPlan}
                        className="h-9 flex-1 rounded-full border-red-200 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 lg:h-10 lg:flex-none lg:px-8"
                    >
                        Cancel Plan
                    </Button>
                    <Button
                        onClick={onChangePlan}
                        className="h-9 flex-1 rounded-full bg-[#00072C] text-sm hover:bg-[#00072C]/90 lg:h-10 lg:flex-none lg:px-8"
                    >
                        Change Plan
                    </Button>
                </div>
            </div>
        </DashboardPanel>
    )
}
