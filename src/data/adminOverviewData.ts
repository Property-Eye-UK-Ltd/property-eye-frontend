import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"

export const adminMetricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total LR Checks", value: "17,320", period: "All time", change: "+2%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,459", period: "All time", change: "+321", topBarClass: "bg-red-500" },
        { title: "Total Identified Leaks", value: "280", period: "All time", change: "+2%", topBarClass: "bg-orange-500" },
        { title: "Total Income", value: "£677,614", period: "All time", change: "+£34,200", topBarClass: "bg-green-500" },
    ],
    "This Month": [
        { title: "Total LR Checks", value: "1,250", period: "This Month", change: "+5%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,480", period: "This Month", change: "+21", topBarClass: "bg-red-500" },
        { title: "Total Identified Leaks", value: "45", period: "This Month", change: "-10%", topBarClass: "bg-orange-500" },
        { title: "Total Income", value: "£46,650", period: "This Month", change: "+4%", topBarClass: "bg-green-500" },
    ],
    "Last Week": [
        { title: "Total LR Checks", value: "320", period: "Last Week", change: "-1%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,482", period: "Last Week", change: "+2", topBarClass: "bg-red-500" },
        { title: "Total Identified Leaks", value: "12", period: "Last Week", change: "-5%", topBarClass: "bg-orange-500" },
        { title: "Total Income", value: "£11,700", period: "Last Week", change: "+1%", topBarClass: "bg-green-500" },
    ],
}

// Fraud Distribution Data (Now for Bar Chart)
export const fraudDistributionData: CommissionBreakdownDatum[] = [
    { name: "First Half", value: 452, color: "var(--progress)" },
    { name: "Second Half", value: 328, color: "var(--progress)" },
]

// Case Queue Data
export interface CaseQueueRecord {
    caseId: string
    agencyName: string
    periodFound: "First Half" | "Second Half"
    severity: "Critical" | "High" | "Medium" | "Low"
    dateDetected: string
    year: string
}

export const adminCaseQueueData: CaseQueueRecord[] = [
    { caseId: "367280", agencyName: "Baltimore Homes", periodFound: "First Half", severity: "Critical", dateDetected: "3 Nov, 2025", year: "2025" },
    { caseId: "367281", agencyName: "Dresscket", periodFound: "Second Half", severity: "Critical", dateDetected: "3 Nov, 2025", year: "2025" },
    { caseId: "367282", agencyName: "Mindcraft Homes", periodFound: "First Half", severity: "High", dateDetected: "3 Nov, 2025", year: "2025" },
    { caseId: "367283", agencyName: "Solict Homes", periodFound: "Second Half", severity: "High", dateDetected: "3 Nov, 2025", year: "2025" },
    { caseId: "367284", agencyName: "Baltimore Homes", periodFound: "First Half", severity: "Medium", dateDetected: "3 Nov, 2025", year: "2025" },
]

export const adminSeverityStyles: Record<CaseQueueRecord["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-amber-50 text-amber-600 border border-amber-100",
    Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

// Fraud Detection Over Time -> Yearly Growth
export const adminFraudGrowthData: FraudDataPoint[] = [
    { month: "2022", Growth: 150 },
    { month: "2023", Growth: 320 },
    { month: "2024", Growth: 580 },
    { month: "2025", Growth: 780 },
]

export const adminFraudGrowthConfig: Record<string, FraudSeriesConfig> = {
    Growth: {
        label: "Yearly Growth",
        color: "var(--progress)",
    },
}

// Annual Checks Table Data
export interface AnnualChecksRecord {
    id: string
    agencyName: string
    period1Checks: number
    period2Checks: number
    totalChecks: number
    year: string
}

export const annualChecksData: AnnualChecksRecord[] = [
    { id: "1", agencyName: "Baltimore Homes", period1Checks: 620, period2Checks: 580, totalChecks: 1200, year: "2025" },
    { id: "2", agencyName: "Dresscket", period1Checks: 1560, period2Checks: 1440, totalChecks: 3000, year: "2025" },
    { id: "3", agencyName: "Mindcraft Homes", period1Checks: 450, period2Checks: 410, totalChecks: 860, year: "2025" },
    { id: "4", agencyName: "Solict Homes", period1Checks: 1020, period2Checks: 980, totalChecks: 2000, year: "2025" },
    { id: "5", agencyName: "Fredrick Hunt Homes", period1Checks: 940, period2Checks: 860, totalChecks: 1800, year: "2025" },
]

export const adminRevenueData: CommissionBreakdownDatum[] = [
    { name: "Basic Plan", value: 9543, color: "#9333EA" },
    { name: "Pro Plan", value: 6233, color: "#3B82F6" },
    { name: "Premium Plan", value: 5543, color: "#6B7280" },
    { name: "Enterprise Plan", value: 4976, color: "#F97316" },
]

export const adminSeverityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 53, color: "#6B7280" },
    { name: "Medium", value: 20, color: "#EAB308" },
    { name: "High", value: 22, color: "#F97316" },
    { name: "Critical", value: 8, color: "#EF4444" },
]

export const adminUsersActivityData: FraudDataPoint[] = [
    { month: "Jan", Users: 70 },
    { month: "Feb", Users: 18 },
    { month: "Mar", Users: 32 },
    { month: "Apr", Users: 20 },
    { month: "May", Users: 40 },
    { month: "Jun", Users: 10 },
    { month: "Jul", Users: 58 },
    { month: "Aug", Users: 15 },
    { month: "Sep", Users: 58 },
    { month: "Oct", Users: 52 },
    { month: "Nov", Users: 90 },
    { month: "Dec", Users: 42 },
]

export const adminChartConfig: Record<string, FraudSeriesConfig> = {
    Users: {
        label: "Users",
        color: "#4D66EA",
    },
}
