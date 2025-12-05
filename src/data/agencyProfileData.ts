export interface AgencyProfileData {
    id: string
    name: string
    logo?: string
    address: string
    email: string
    phone: string
    subscriptionPlan: string
    checksUsed: number
    checksTotal: number
    checksPercentage: number
    lastDataPull: string
    dataPullStatus: "Active" | "Inactive"
    openCases: number
    recoveredCommission: string
    overdueInvoices: number
    nextBillingDate: string
    landRegistry: string
    completionDate: string
    buyerName: string
}

export interface TransactionMetadata {
    paymentDate: string
    payer: string
    recipient: string
    amount: string
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
    checksUsed: 318,
    checksTotal: 500,
    checksPercentage: 60,
    lastDataPull: "21 Oct, 2025, 14:23",
    dataPullStatus: "Active",
    openCases: 43,
    recoveredCommission: "£45,317",
    overdueInvoices: 7,
    nextBillingDate: "2 Nov, 2025",
    landRegistry: "Land Registry",
    completionDate: "2 Nov, 2025",
    buyerName: "Kris Luther",
}

export const mockTransactionMetadata: TransactionMetadata = {
    paymentDate: "2 Nov, 2025",
    payer: "Kris Luther",
    recipient: "Ryan Petz",
    amount: "£135,325",
}

export const mockTimeline: TimelineEvent[] = [
    { timestamp: "2025-11-08 14:29", event: "Push" },
    { timestamp: "2025-11-08 14:29", event: "Case Opens" },
    { timestamp: "2025-11-08 14:29", event: "Billing" },
    { timestamp: "2025-11-08 14:29", event: "Pull" },
    { timestamp: "2025-11-08 14:29", event: "Billing" },
]
