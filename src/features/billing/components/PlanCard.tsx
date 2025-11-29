import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SubscriptionPlan } from "@/data/subscription-plans-data"

interface PlanCardProps {
    plan: SubscriptionPlan
    onSelectPlan: (planId: string) => void
}

export const PlanCard = ({ plan, onSelectPlan }: PlanCardProps) => {
    return (
        <div className="relative flex flex-col rounded-2xl bg-muted p-6">
            {/* Current Plan Badge */}
            {plan.isCurrent && (
                <div className="absolute right-4 top-4">
                    <Badge className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-normal text-purple-700 hover:bg-purple-100">
                        Current Plan
                    </Badge>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-4">
                <h3 className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                    {plan.name}
                </h3>
            </div>

            {/* Price */}
            <div className="mb-2">
                <p className="text-2xl font-medium text-foreground">{plan.priceRange}</p>
                <p className="text-sm mb-6 text-muted-foreground">{plan.priceSubtext}</p>
            </div>

            {/* Description */}
            <p className="mb-6 text-xs text-foreground">{plan.description}</p>

            {/* Features List */}
            <div className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{feature.text}</span>
                        {feature.badge && (
                            <Badge
                                className={cn(
                                    "shrink-0 rounded-full px-1.5 py-0 text-[10px] font-normal",
                                    feature.badge.color === "blue" &&
                                    "bg-blue-100 text-blue-700 hover:bg-blue-100",
                                    feature.badge.color === "purple" &&
                                    "bg-blue-100 text-blue-700 hover:bg-blue-100",
                                    feature.badge.color === "optional" &&
                                    "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                )}
                            >
                                {feature.badge.text}
                            </Badge>
                        )}
                    </div>
                ))}
            </div>

            {/* Select Plan Button */}
            {!plan.isCurrent && (
                <Button
                    onClick={() => onSelectPlan(plan.id)}
                    className="w-full rounded-full bg-primary py-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Select Plan
                </Button>
            )}
        </div>
    )
}
