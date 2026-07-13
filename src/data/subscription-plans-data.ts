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

/** Banded by agency size — Starter / Enterprise only (redesign 4.5 / subscription model) */
export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: "starter",
        name: "STARTER",
        priceRange: "£300 - £900",
        priceSubtext: "per month",
        description: "Monthly fee covering Land Registry check costs for smaller agencies. Plan assigned by seat count and check volume.",
        features: [
            { text: "Bi-annual commission check sweeps" },
            { text: "Case status visibility (restricted)" },
            { text: "Integration with supported CRMs" },
            { text: "Email & in-app notifications" },
            { text: "50% recovery split on confirmed recovered fraud (standing)" },
        ],
    },
    {
        id: "enterprise",
        name: "ENTERPRISE",
        priceRange: "£1,400+",
        priceSubtext: "per month",
        description: "For larger multi-branch agencies with higher check volume. Assigned by Property Eye — not self-serve.",
        features: [
            { text: "Everything in Starter" },
            { text: "Higher included check capacity for bi-annual sweeps" },
            { text: "Priority support" },
            { text: "Dedicated onboarding for integrations" },
            { text: "50% recovery split on confirmed recovered fraud (standing)" },
        ],
        isCurrent: true,
    },
]
