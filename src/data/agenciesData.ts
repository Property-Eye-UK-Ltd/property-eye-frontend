import { MetricCard } from "@/features/overview/components/MetricCards"

export interface AgencyRecord {
    id: string
    name: string
    planName: string
    users: number
    integrationType: "ALTO" | "CSV" | "PDF" | "API" | "Reapit" | null
    fraudDetected: number
}

export const agenciesMetricsData: Record<string, MetricCard[]> = {
    "All Time": [
        {
            title: "Total Agencies",
            value: "1,459",
            period: "All time",
            change: "+321",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Agency Users",
            value: "280",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: "94",
            period: "Non-closed cases",
            change: "+2%",
            topBarClass: "bg-purple-500",
        },
    ],
    "This Month": [
        {
            title: "Total Agencies",
            value: "1,480",
            period: "This Month",
            change: "+21",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Agency Users",
            value: "285",
            period: "This Month",
            change: "+5",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: "12",
            period: "Non-closed cases",
            change: "-3",
            topBarClass: "bg-purple-500",
        },
    ],
    "Last Week": [
        {
            title: "Total Agencies",
            value: "1,482",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Agency Users",
            value: "286",
            period: "Last Week",
            change: "+1",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: "4",
            period: "Non-closed cases",
            change: "-1",
            topBarClass: "bg-purple-500",
        },
    ],
}

export const agenciesData: AgencyRecord[] = [
    { id: "1", name: "Baltimore Homes", planName: "Standard", users: 5, integrationType: "ALTO", fraudDetected: 54 },
    { id: "2", name: "Dresscket", planName: "Standard", users: 24, integrationType: "API", fraudDetected: 98 },
    { id: "3", name: "Mindcraft Homes", planName: "Standard", users: 12, integrationType: "CSV", fraudDetected: 23 },
    { id: "4", name: "Solict Homes", planName: "Standard", users: 2, integrationType: "PDF", fraudDetected: 63 },
    { id: "5", name: "Harborview Estates", planName: "Standard", users: 8, integrationType: "Reapit", fraudDetected: 32 },
    { id: "6", name: "Northgate Homes", planName: "Standard", users: 2, integrationType: "CSV", fraudDetected: 43 },
    { id: "7", name: "Crestline Properties", planName: "Standard", users: 4, integrationType: "ALTO", fraudDetected: 45 },
    { id: "8", name: "Pinnacle Homes", planName: "Standard", users: 2, integrationType: "API", fraudDetected: 32 },
    { id: "9", name: "Sterling Property Group", planName: "Standard", users: 19, integrationType: "Reapit", fraudDetected: 19 },
]
