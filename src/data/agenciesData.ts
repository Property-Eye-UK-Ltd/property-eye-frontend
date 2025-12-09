import { MetricCard } from "@/features/overview/components/MetricCards"

export interface AgencyRecord {
    id: string
    name: string
    planTier: string
    users: number
    openCases: number
    lastDataSync: string
    syncStatus: "Active" | "Inactive"
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
            title: "Self-handled Agencies",
            value: "329",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-purple-500",
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
            period: "All time",
            change: "+2%",
            topBarClass: "bg-green-500",
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
            title: "Self-handled Agencies",
            value: "340",
            period: "This Month",
            change: "+11",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Total Agency Users",
            value: "295",
            period: "This Month",
            change: "+15",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: "102",
            period: "This Month",
            change: "+8",
            topBarClass: "bg-green-500",
        },
    ],
    "Last Week": [
        {
            title: "Total Agencies",
            value: "1,462",
            period: "Last Week",
            change: "+3",
            topBarClass: "bg-red-500",
        },
        {
            title: "Self-handled Agencies",
            value: "331",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Total Agency Users",
            value: "282",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Open Cases",
            value: "96",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-green-500",
        },
    ],
}

export const agenciesData: AgencyRecord[] = [
    {
        id: "1",
        name: "Baltimore Homes",
        planTier: "Pro Plan",
        users: 5,
        openCases: 54,
        lastDataSync: "8 Nov 2025, 14:23",
        syncStatus: "Active",
        accountStatus: "Suspended",
    },
    {
        id: "2",
        name: "Dresscket",
        planTier: "Enterprise Plan",
        users: 24,
        openCases: 98,
        lastDataSync: "21 Oct, 2025, 14:23",
        syncStatus: "Inactive",
        accountStatus: "Active",
    },
    {
        id: "3",
        name: "Mindcraft Homes",
        planTier: "Pro Plan",
        users: 12,
        openCases: 23,
        lastDataSync: "21 Oct, 2025, 14:23",
        syncStatus: "Inactive",
        accountStatus: "Active",
    },
    {
        id: "4",
        name: "Baltimore Homes",
        planTier: "Basic Plan",
        users: 2,
        openCases: 63,
        lastDataSync: "21 Oct, 2025, 14:23",
        syncStatus: "Active",
        accountStatus: "Pending",
    },
    {
        id: "5",
        name: "Dresscket",
        planTier: "Pro Plan",
        users: 8,
        openCases: 32,
        lastDataSync: "21 Oct, 2025, 14:23",
        syncStatus: "Active",
        accountStatus: "Suspended",
    },
    {
        id: "6",
        name: "Mindcraft Homes",
        planTier: "Basic Plan",
        users: 2,
        openCases: 43,
        lastDataSync: "21 Oct, 2025, 14:23",
        syncStatus: "Inactive",
        accountStatus: "Active",
    },
    {
        id: "7",
        name: "Baltimore Homes",
        planTier: "Premium Plan",
        users: 4,
        openCases: 45,
        lastDataSync: "30 Sep, 2025, 14:23",
        syncStatus: "Active",
        accountStatus: "Suspended",
    },
    {
        id: "8",
        name: "Dresscket",
        planTier: "Premium Plan",
        users: 2,
        openCases: 32,
        lastDataSync: "24 Sep, 2025, 14:23",
        syncStatus: "Active",
        accountStatus: "Active",
    },
    {
        id: "9",
        name: "Mindcraft Homes",
        planTier: "Enterprise Plan",
        users: 19,
        openCases: 19,
        lastDataSync: "24 Sep, 2025, 14:23",
        syncStatus: "Inactive",
        accountStatus: "Pending",
    },
]

export const accountStatusStyles: Record<AgencyRecord["accountStatus"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Suspended: "bg-red-50 text-red-600 border border-red-100",
    Pending: "bg-orange-50 text-orange-600 border border-orange-100",
}

export const syncStatusStyles: Record<AgencyRecord["syncStatus"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Inactive: "bg-red-50 text-red-600 border border-red-100",
}
