import { MetricCard } from "@/features/overview/components/MetricCards"

// Pie chart data for Checks Consumption by Plan
export interface PlanConsumption {
    plan: string
    checks: number
    color: string
}

// Top Checks-Consuming Agencies
export interface TopAgency {
    name: string
    totalChecks: number
}

export const topAgenciesData: TopAgency[] = [
    { name: "Baltimore Homes", totalChecks: 1965 },
    { name: "Mindcraft Homes", totalChecks: 1922 },
    { name: "Drescket", totalChecks: 1904 },
    { name: "Fredrick Hunt Homes", totalChecks: 1898 },
    { name: "Baltimore Homes", totalChecks: 1898 },
]

// Reports metrics
export const reportsMetrics: MetricCard[] = [
    {
        title: "Revenue Generated",
        value: "£194,320",
        period: "All time",
        change: "+2%",
        topBarClass: "bg-green-500",
    },
    {
        title: "Cases Open",
        value: "329",
        period: "All time",
        change: "+2%",
        topBarClass: "bg-purple-500",
    },
    {
        title: "Pending Renewal",
        value: "37",
        period: "All time",
        change: "+12%",
        topBarClass: "bg-gray-500",
    },
    {
        title: "Cancelled Subscriptions",
        value: "50",
        period: "All time",
        change: "+321",
        topBarClass: "bg-red-500",
    },
]

export const reportPeriods = ["All Time", "This Month", "Last Week"]

// Checks Consumption by Plan data
export const checksConsumptionData = [
    { name: "Basic Plan", value: 120321, color: "#EF4444" },
    { name: "Pro Plan", value: 83921, color: "#F97316" },
    { name: "Premium Plan", value: 130298, color: "#EAB308" },
    { name: "Enterprise Plan", value: 45264, color: "#6B7280" },
]
