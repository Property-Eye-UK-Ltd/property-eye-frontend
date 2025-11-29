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
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-medium text-foreground">
                                Current Plan ({currentPlan.name})
                            </h3>
                            <Badge className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-purple-100">
                                {currentPlan.billingCycle}
                            </Badge>
                        </div>
                        <p className="text-3xl font-medium text-foreground">
                            £{currentPlan.price}
                            <span className="text-base font-normal text-muted-foreground">/month</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-sm text-muted-foreground">
                            Next billing date: <span className="text-foreground">{currentPlan.nextBillingDate}</span>
                        </p>
                        <DonutChart value={75} size={25} strokeWidth={3} />
                    </div>
                </div>

                {/* Progress Bars - Side by Side */}
                <div className="flex items-center gap-6">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {currentPlan.checksUsed} checks out of {currentPlan.checksTotal} checks remaining
                            </span>
                            <span className="font-medium text-foreground">{checksPercentage}%</span>
                        </div>
                        <Progress value={checksPercentage} className="h-1.5 [&>div]:bg-primary [&>div]:rounded-full" />
                    </div>

                    <div className="h-12 w-px bg-border" />

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                CRM Integration: {currentPlan.crmUsersUsed} Users out of {currentPlan.crmUsersTotal} remaining
                            </span>
                            <span className="font-medium text-foreground">{crmPercentage}%</span>
                        </div>
                        <Progress value={crmPercentage} className="h-1.5 [&>div]:bg-primary [&>div]:rounded-full" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onCancelPlan}
                        className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        Cancel Plan
                    </Button>
                    <Button
                        onClick={onChangePlan}
                        className="rounded-full bg-[#00072C] hover:bg-[#00072C]/90"
                    >
                        Change Plan
                    </Button>
                </div>
            </div>
        </DashboardPanel>
    )
}
