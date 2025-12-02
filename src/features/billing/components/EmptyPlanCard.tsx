import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"

interface EmptyPlanCardProps {
    onChoosePlan?: () => void
}

export const EmptyPlanCard = ({ onChoosePlan }: EmptyPlanCardProps) => {
    return (
        <DashboardPanel className="overflow-hidden" hasBorder>
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-xl font-medium text-foreground mb-2">
                    No Active Plan Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md">
                    Start a plan to begin running property checks, access CRM integrations, and managing agency operations
                </p>
                <Button
                    onClick={onChoosePlan}
                    className="rounded-full bg-[#00072C] hover:bg-[#00072C]/90 px-6"
                >
                    Choose a Plan
                </Button>
            </div>
        </DashboardPanel>
    )
}
