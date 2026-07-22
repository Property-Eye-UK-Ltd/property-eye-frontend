import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PlanCardProps {
    name: string
    description: string
    priceGbp: number
    billingInterval: string
    features: string[]
    /** When set, the card renders as "already subscribed": a Current Plan
     * badge + next billing date instead of the Subscribe CTA. */
    subscription?: {
        nextBillingDate: string
        onCancelPlan: () => void
        isCancelling?: boolean
        /** True once cancel-plan has been called — access continues until
         * nextBillingDate but the subscription will not renew. */
        cancelAtPeriodEnd?: boolean
    }
    onSubscribe?: () => void
    isSubscribing?: boolean
}

export const PlanCard = ({
    name,
    description,
    priceGbp,
    billingInterval,
    features,
    subscription,
    onSubscribe,
    isSubscribing,
}: PlanCardProps) => {
    const isSubscribed = !!subscription
    const isCancelled = !!subscription?.cancelAtPeriodEnd

    return (
        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:flex-row">
            {isSubscribed && (
                <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                    <Badge
                        className={
                            isCancelled
                                ? "rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-medium text-amber-700 hover:bg-amber-100"
                                : "rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700 hover:bg-purple-100"
                        }
                    >
                        {isCancelled ? "Cancellation Scheduled" : "Current Plan"}
                    </Badge>
                </div>
            )}

            {/* Left column: name, description, price, CTA */}
            <div className="flex flex-col justify-between gap-8 p-6 sm:w-[38%] sm:p-8">
                <div className="space-y-2">
                    <h3 className="text-xl font-medium text-foreground sm:text-2xl">{name}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="flex items-baseline gap-1">
                            <span className="text-3xl font-medium text-foreground sm:text-4xl">
                                £{priceGbp}
                            </span>
                            <span className="text-sm text-muted-foreground">/{billingInterval}</span>
                        </p>
                        {isSubscribed && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                {isCancelled ? "Access ends" : "Next billing"}:{" "}
                                <span className="text-foreground">{subscription.nextBillingDate}</span>
                            </p>
                        )}
                    </div>

                    {isSubscribed && !isCancelled && (
                        <Button
                            variant="outline"
                            onClick={subscription.onCancelPlan}
                            disabled={subscription.isCancelling}
                            className="w-full rounded-full border-red-200 py-6 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            Cancel Plan
                        </Button>
                    )}
                    {!isSubscribed && (
                        <Button
                            onClick={onSubscribe}
                            disabled={isSubscribing}
                            className="w-full rounded-full bg-primary py-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Subscribe
                        </Button>
                    )}
                </div>
            </div>

            {/* Right column: feature rows separated by hairline dividers */}
            <div className="border-t border-border sm:w-[62%] sm:border-l sm:border-t-0">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border-b border-border px-6 py-4 text-sm text-muted-foreground last:border-b-0 sm:px-8"
                    >
                        {feature}
                    </div>
                ))}
            </div>
        </div>
    )
}
