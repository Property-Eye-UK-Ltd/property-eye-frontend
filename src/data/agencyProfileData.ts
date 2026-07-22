export interface AgencyProfileData {
    id: string
    name: string
    logo?: string
    address: string | null
    email: string | null
    phone: string | null
    subscriptionPlan: string | null
    integrationType: "ALTO" | "CSV" | "PDF" | "API" | "Reapit" | null
    openCases: number
    recoveredCommission: string
    nextBillingDate: string | null
}
