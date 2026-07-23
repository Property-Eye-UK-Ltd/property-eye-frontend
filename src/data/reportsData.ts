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
            title: "Subscription Revenue",
            value: "£194,320",
            period: "Agency fees — billing source",
            change: "+2%",
            topBarClass: "bg-primary",
        },
        {
            title: "Commission Recovered",
            value: "£30,750",
            period: "50% of recovered amounts",
            change: "+£4,200",
            topBarClass: "bg-green-500",
        },
        {
            title: "Cases Open",
            value: "329",
            period: "Non-closed cases",
            change: "+2%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Clearance Rate",
            value: "40%",
            period: "Not Fraudulent / all closed",
            change: "",
            topBarClass: "bg-amber-500",
        },
    ],
    "This Month": [
        {
            title: "Subscription Revenue",
            value: "£14,250",
            period: "Agency fees — billing source",
            change: "+5%",
            topBarClass: "bg-primary",
        },
        {
            title: "Commission Recovered",
            value: "£4,800",
            period: "50% of recovered amounts",
            change: "+£600",
            topBarClass: "bg-green-500",
        },
        {
            title: "Cases Open",
            value: "35",
            period: "Non-closed cases",
            change: "+3%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Clearance Rate",
            value: "38%",
            period: "Not Fraudulent / all closed",
            change: "",
            topBarClass: "bg-amber-500",
        },
    ],
    "Last Week": [
        {
            title: "Subscription Revenue",
            value: "£3,200",
            period: "Agency fees — billing source",
            change: "+1%",
            topBarClass: "bg-primary",
        },
        {
            title: "Commission Recovered",
            value: "£1,100",
            period: "50% of recovered amounts",
            change: "+£200",
            topBarClass: "bg-green-500",
        },
        {
            title: "Cases Open",
            value: "12",
            period: "Non-closed cases",
            change: "+1%",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Clearance Rate",
            value: "42%",
            period: "Not Fraudulent / all closed",
            change: "",
            topBarClass: "bg-amber-500",
        },
    ],
}

export const reportPeriods = ["All Time", "This Month", "Last Week"]
