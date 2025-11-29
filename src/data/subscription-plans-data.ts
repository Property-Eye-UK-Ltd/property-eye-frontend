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
        id: "basic",
        name: "BASIC PLAN",
        priceRange: "£300 - £700",
        priceSubtext: "per month",
        description: "For small local agencies or independent branches",
        features: [
            { text: "Full 6-year Historic Fraud Audit" },
            { text: "Automated fraud detection & alerts" },
            { text: "Basic analytics dashboard" },
            { text: "Self-managed recovery tracking tools", badge: { text: "optional", color: "optional" } },
            { text: "CRM Integration", badge: { text: "3 Users", color: "blue" } },
            { text: "Email support" },
            { text: "Additional checks after maximum of 350 checks at £1.80 per property" },
        ],
    },
    {
        id: "pro",
        name: "PRO PLAN",
        priceRange: "£900 - £1,350",
        priceSubtext: "per month",
        description: "For growing multi-branch or mid-volume agencies",
        features: [
            { text: "Everything in the Basic Plan, plus:" },
            { text: "Extended reporting and analytics tool" },
            { text: "Priority support response" },
            { text: "CRM Integration", badge: { text: "5 Users", color: "blue" } },
            { text: "Early access to new fraud intelligence updates" },
            { text: "Additional checks after maximum of 750 checks at £1.60 per property" },
        ],
        isCurrent: true,
    },
    {
        id: "premium",
        name: "PREMIUM PLAN",
        priceRange: "£1,600 - £2,400",
        priceSubtext: "per month",
        description: "For Established regional agencies and portfolio managers",
        features: [
            { text: "Everything in the Pro Plan, plus:" },
            { text: "Early access to new tools" },
            { text: "Regional and agent-level fraud trend analytics" },
            { text: "CRM Integration", badge: { text: "10 Users", color: "blue" } },
            { text: "Additional checks after maximum of 1500 checks for new tools at £1.40 per property" },
            { text: "Premium SLA (24/7 support)" },
        ],
    },
    {
        id: "enterprise",
        name: "ENTERPRISE PLAN",
        priceRange: "£2,800+",
        priceSubtext: "per month",
        description: "For National real estate networks, lenders and corporate property firms",
        features: [
            { text: "Everything in the Premium Plan, plus:" },
            { text: "Enterprise-level fraud monitoring dashboard" },
            { text: "Full SLA with dedicated technical support" },
            { text: "CRM Integration", badge: { text: "Unlimited Users", color: "purple" } },
            { text: "Additional checks at £1.40 per property" },
            { text: "Custom integrations & higher checks (Contact Sales)" },
        ],
    },
]
