import { MetricCard } from "@/features/overview/components/MetricCards"

export type PlanTier = "Starter" | "Enterprise"

export interface AgencyRecord {
    id: string
    name: string
    planTier: PlanTier
    users: number
    integrationType: "ALTO" | "CSV" | "PDF" | "API" | "Reapit"
    checksDone: number
    fraudDetected: number
    syncHealth: "Healthy" | "Unhealthy" | "-"
    accountStatus: "Active" | "Suspended" | "Pending"
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
    {
        id: "1",
        name: "Baltimore Homes",
        planTier: "Starter",
        users: 5,
        integrationType: "ALTO",
        checksDone: 124,
        fraudDetected: 54,
        syncHealth: "Healthy",
        accountStatus: "Suspended",
    },
    {
        id: "2",
        name: "Dresscket",
        planTier: "Enterprise",
        users: 24,
        integrationType: "API",
        checksDone: 312,
        fraudDetected: 98,
        syncHealth: "Unhealthy",
        accountStatus: "Active",
    },
    {
        id: "3",
        name: "Mindcraft Homes",
        planTier: "Starter",
        users: 12,
        integrationType: "CSV",
        checksDone: 89,
        fraudDetected: 23,
        syncHealth: "-",
        accountStatus: "Active",
    },
    {
        id: "4",
        name: "Solict Homes",
        planTier: "Starter",
        users: 2,
        integrationType: "PDF",
        checksDone: 45,
        fraudDetected: 63,
        syncHealth: "-",
        accountStatus: "Pending",
    },
    {
        id: "5",
        name: "Harborview Estates",
        planTier: "Starter",
        users: 8,
        integrationType: "Reapit",
        checksDone: 201,
        fraudDetected: 32,
        syncHealth: "Healthy",
        accountStatus: "Suspended",
    },
    {
        id: "6",
        name: "Northgate Homes",
        planTier: "Starter",
        users: 2,
        integrationType: "CSV",
        checksDone: 67,
        fraudDetected: 43,
        syncHealth: "-",
        accountStatus: "Active",
    },
    {
        id: "7",
        name: "Crestline Properties",
        planTier: "Enterprise",
        users: 4,
        integrationType: "ALTO",
        checksDone: 156,
        fraudDetected: 45,
        syncHealth: "Healthy",
        accountStatus: "Active",
    },
    {
        id: "8",
        name: "Pinnacle Homes",
        planTier: "Enterprise",
        users: 2,
        integrationType: "API",
        checksDone: 98,
        fraudDetected: 32,
        syncHealth: "Healthy",
        accountStatus: "Active",
    },
    {
        id: "9",
        name: "Sterling Property Group",
        planTier: "Enterprise",
        users: 19,
        integrationType: "Reapit",
        checksDone: 278,
        fraudDetected: 19,
        syncHealth: "Unhealthy",
        accountStatus: "Pending",
    },
]

export const accountStatusStyles: Record<AgencyRecord["accountStatus"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Suspended: "bg-red-50 text-red-600 border border-red-100",
    Pending: "bg-orange-50 text-orange-600 border border-orange-100",
}

export const syncHealthStyles: Record<AgencyRecord["syncHealth"], string> = {
    Healthy: "bg-green-50 text-green-600 border border-green-100",
    Unhealthy: "bg-red-50 text-red-600 border border-red-100",
    "-": "bg-gray-50 text-gray-500 border border-gray-100",
}
