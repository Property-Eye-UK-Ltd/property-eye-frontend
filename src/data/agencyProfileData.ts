export interface AgencyProfileData {
    id: string
    name: string
    logo?: string
    address: string
    email: string
    phone: string
    subscriptionPlan: string
    integrationType: "ALTO" | "CSV" | "PDF" | "API" | "Reapit"
    integrationStatus: "Active" | "Inactive"
    openCases: number
    recoveredCommission: string
    nextBillingDate: string
}

export interface TimelineEvent {
    timestamp: string
    event: string
}

export const mockAgencyProfile: AgencyProfileData = {
    id: "1",
    name: "Solict Homes",
    address: "22 Ashfield Road, Leicester",
    email: "solicthomes@example.com",
    phone: "+44 207132 4567",
    subscriptionPlan: "Pro Plan",
    integrationType: "ALTO",
    integrationStatus: "Active",
    openCases: 43,
    recoveredCommission: "£45,317",
    nextBillingDate: "2 Nov, 2025",
}

export const mockTimeline: TimelineEvent[] = [
    { timestamp: "2025-11-08 14:29", event: "Push" },
    { timestamp: "2025-11-08 14:29", event: "Case Opens" },
    { timestamp: "2025-11-08 14:29", event: "Billing" },
    { timestamp: "2025-11-08 14:29", event: "Pull" },
    { timestamp: "2025-11-08 14:29", event: "Billing" },
]
