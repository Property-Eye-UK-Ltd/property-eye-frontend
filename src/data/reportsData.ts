import { MetricCard } from "@/features/overview/components/MetricCards"

// Detailed Agency Performance Data for reports
export interface AgencyPerformanceReport {
    agencyName: string
    integrationType: string
    totalChecks: number
    fraudDetected: number
    commissionRecovered: string
    revenueGenerated: string
    lastDataSync: string
    syncHealth: "Healthy" | "Unhealthy" | "-"
}

export const agencyPerformanceData: AgencyPerformanceReport[] = [
    {
        agencyName: "Baltimore Homes",
        integrationType: "ALTO",
        totalChecks: 1245,
        fraudDetected: 54,
        commissionRecovered: "£42,500",
        revenueGenerated: "£1,422",
        lastDataSync: "15 Aug, 2025",
        syncHealth: "Healthy",
    },
    {
        agencyName: "Dresscket",
        integrationType: "API",
        totalChecks: 3120,
        fraudDetected: 98,
        commissionRecovered: "£85,300",
        revenueGenerated: "£4,266",
        lastDataSync: "2 Jul, 2025",
        syncHealth: "Unhealthy",
    },
    {
        agencyName: "Mindcraft Homes",
        integrationType: "CSV",
        totalChecks: 890,
        fraudDetected: 23,
        commissionRecovered: "£12,400",
        revenueGenerated: "£850",
        lastDataSync: "18 Jun, 2025",
        syncHealth: "-",
    },
    {
        agencyName: "Solict Homes",
        integrationType: "Reapit",
        totalChecks: 2105,
        fraudDetected: 67,
        commissionRecovered: "£55,900",
        revenueGenerated: "£2,100",
        lastDataSync: "30 Apr, 2025",
        syncHealth: "Healthy",
    },
    {
        agencyName: "Fredrick Hunt Homes",
        integrationType: "PDF",
        totalChecks: 1898,
        fraudDetected: 43,
        commissionRecovered: "£38,200",
        revenueGenerated: "£1,200",
        lastDataSync: "12 Mar, 2025",
        syncHealth: "-",
    },
]

// Reports metrics
export const reportsMetricsData: Record<string, MetricCard[]> = {
    "All Time": [
        {
            title: "Commission Recovered",
            value: "£482,300",
            period: "All time",
            change: "+£34,200",
            topBarClass: "bg-green-500",
        },
        {
            title: "Total Subscription Revenue",
            value: "£194,320",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-primary",
        },
        {
            title: "Cases Open",
            value: "329",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Fraud Detected",
            value: "1,452",
            period: "All time",
            change: "+12%",
            topBarClass: "bg-orange-500",
        },
    ],
    "This Month": [
        {
            title: "COMMISSION RECOVERED",
            value: "£32,450",
            period: "This Month",
            change: "+£2,100",
            topBarClass: "bg-green-500",
        },
        {
            title: "TOTAL SUBSCRIPTION REVENUE",
            value: "£14,250",
            period: "This Month",
            change: "+5%",
            topBarClass: "bg-primary",
        },
        {
            title: "CASES OPEN",
            value: "35",
            period: "This Month",
            change: "+3%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "FRAUD DETECTED",
            value: "94",
            period: "This Month",
            change: "+8",
            topBarClass: "bg-orange-500",
        },
    ],
    "Last Week": [
        {
            title: "COMMISSION RECOVERED",
            value: "£8,200",
            period: "Last Week",
            change: "+£850",
            topBarClass: "bg-green-500",
        },
        {
            title: "TOTAL SUBSCRIPTION REVENUE",
            value: "£3,200",
            period: "Last Week",
            change: "+1%",
            topBarClass: "bg-primary",
        },
        {
            title: "CASES OPEN",
            value: "12",
            period: "Last Week",
            change: "+1%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "FRAUD DETECTED",
            value: "21",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-orange-500",
        },
    ],
}

export const reportPeriods = ["All Time", "This Month", "Last Week"]

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
]
