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

// Cases Open vs Cases Closed data
export const casesChartData = [
    { month: "Jan", "Cases Open": 45, "Cases Closed": 70 },
    { month: "Feb", "Cases Open": 52, "Cases Closed": 20 },
    { month: "Mar", "Cases Open": 35, "Cases Closed": 30 },
    { month: "Apr", "Cases Open": 85, "Cases Closed": 20 },
    { month: "May", "Cases Open": 20, "Cases Closed": 40 },
    { month: "Jun", "Cases Open": 15, "Cases Closed": 10 },
    { month: "Jul", "Cases Open": 55, "Cases Closed": 40 },
    { month: "Aug", "Cases Open": 35, "Cases Closed": 15 },
    { month: "Sep", "Cases Open": 60, "Cases Closed": 95 },
    { month: "Oct", "Cases Open": 85, "Cases Closed": 55 },
    { month: "Nov", "Cases Open": 45, "Cases Closed": 90 },
    { month: "Dec", "Cases Open": 15, "Cases Closed": 40 },
]

export const casesChartConfig = {
    "Cases Open": {
        label: "Cases Open",
        color: "#F97316",
    },
    "Cases Closed": {
        label: "Cases Closed",
        color: "#16A34A",
    },
}

// Event Log data
export interface EventLogEntry {
    actor: string
    role: string
    actionType: string
    targetObject: string
    date: string
}

export const eventLogData: EventLogEntry[] = [
    { actor: "John Smith", role: "Admin", actionType: "Triggered Case", targetObject: "Case", date: "3 November, 2025" },
    { actor: "Khalid Jaffar", role: "Admin", actionType: "Closed Case", targetObject: "Case", date: "3 November, 2025" },
    { actor: "Maria Sheldon", role: "Admin", actionType: "Suspension", targetObject: "Agency", date: "3 November, 2025" },
    { actor: "John Smith", role: "Admin", actionType: "Role Override", targetObject: "Agency", date: "21 October, 2025" },
    { actor: "Kurt Daniel", role: "Admin", actionType: "Printed Invoice", targetObject: "Invoice", date: "21 October, 2025" },
    { actor: "Angela Davies", role: "Admin", actionType: "Closed Case", targetObject: "Case", date: "21 October, 2025" },
    { actor: "John Smith", role: "Admin", actionType: "Suspension", targetObject: "Agency", date: "3 November, 2025" },
    { actor: "Khalid Jaffar", role: "Admin", actionType: "Printed Invoice", targetObject: "Invoice", date: "21 October, 2025" },
    { actor: "Maria Sheldon", role: "Admin", actionType: "Printed Invoice", targetObject: "Invoice", date: "30 September, 2025" },
]
