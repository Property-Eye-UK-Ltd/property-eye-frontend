export interface PlanFeature {
    text: string
    badge?: {
        text: string
        color: "blue" | "purple" | "optional"
    }
}

export interface SubscriptionPlan {
    id: string
    name: string
    priceRange: string
    priceSubtext: string
    description: string
    features: PlanFeature[]
    isCurrent?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: "standard",
        name: "STANDARD PLAN",
        priceRange: "£500",
        priceSubtext: "per month",
        description: "Flat monthly fee covering the cost of running Land Registry checks. Commission recovery is split 50/50 with the agency.",
        features: [
            { text: "Bi-annual commission check sweeps" },
            { text: "Case status visibility (restricted)" },
            { text: "Integration with supported CRMs" },
            { text: "Email & in-app notifications" },
            { text: "50% recovery split on confirmed recovered fraud (standing)" },
        ],
    },
]
