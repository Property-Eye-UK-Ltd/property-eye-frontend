import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import {
    mockAgencyCases,
    computeClearanceRate,
    computeCommissionRecovered,
    formatCurrency,
} from "@/data/agencyCasesData"

const commissionRecovered = formatCurrency(computeCommissionRecovered(mockAgencyCases))
const clearanceRate = computeClearanceRate(mockAgencyCases)

export const adminMetricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Checks Run", value: "17,320", period: "All time", change: "+2%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,459", period: "All time", change: "+321", topBarClass: "bg-red-500" },
        { title: "Subscription Revenue", value: "£412,800", period: "All time", change: "+£34,200", topBarClass: "bg-green-500" },
        { title: "Commission Recovered", value: commissionRecovered, period: "50% of recovered sum", change: "", topBarClass: "bg-purple-500" },
        { title: "Clearance Rate", value: clearanceRate, period: "Not Fraudulent / all closed", change: "", topBarClass: "bg-amber-500" },
    ],
    "This Month": [
        { title: "Total Checks Run", value: "1,250", period: "This Month", change: "+5%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,480", period: "This Month", change: "+21", topBarClass: "bg-red-500" },
        { title: "Subscription Revenue", value: "£46,650", period: "This Month", change: "+4%", topBarClass: "bg-green-500" },
        { title: "Commission Recovered", value: commissionRecovered, period: "50% of recovered sum", change: "", topBarClass: "bg-purple-500" },
        { title: "Clearance Rate", value: clearanceRate, period: "Not Fraudulent / all closed", change: "", topBarClass: "bg-amber-500" },
    ],
    "Last Week": [
        { title: "Total Checks Run", value: "320", period: "Last Week", change: "-1%", topBarClass: "bg-blue-500" },
        { title: "Total Agencies", value: "1,482", period: "Last Week", change: "+2", topBarClass: "bg-red-500" },
        { title: "Subscription Revenue", value: "£11,700", period: "Last Week", change: "+1%", topBarClass: "bg-green-500" },
        { title: "Commission Recovered", value: commissionRecovered, period: "50% of recovered sum", change: "", topBarClass: "bg-purple-500" },
        { title: "Clearance Rate", value: clearanceRate, period: "Not Fraudulent / all closed", change: "", topBarClass: "bg-amber-500" },
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

// Fraud Detection Growth — continuous 24-month confirmed-case count trend
export const adminFraudGrowthData: FraudDataPoint[] = [
    { month: "Jul 24", Cases: 28 },
    { month: "Aug 24", Cases: 32 },
    { month: "Sep 24", Cases: 35 },
    { month: "Oct 24", Cases: 41 },
    { month: "Nov 24", Cases: 38 },
    { month: "Dec 24", Cases: 44 },
    { month: "Jan 25", Cases: 48 },
    { month: "Feb 25", Cases: 52 },
    { month: "Mar 25", Cases: 55 },
    { month: "Apr 25", Cases: 61 },
    { month: "May 25", Cases: 58 },
    { month: "Jun 25", Cases: 66 },
    { month: "Jul 25", Cases: 70 },
    { month: "Aug 25", Cases: 74 },
    { month: "Sep 25", Cases: 79 },
    { month: "Oct 25", Cases: 82 },
    { month: "Nov 25", Cases: 88 },
    { month: "Dec 25", Cases: 91 },
    { month: "Jan 26", Cases: 95 },
    { month: "Feb 26", Cases: 98 },
    { month: "Mar 26", Cases: 102 },
    { month: "Apr 26", Cases: 108 },
    { month: "May 26", Cases: 112 },
    { month: "Jun 26", Cases: 118 },
]

export const adminFraudGrowthConfig: Record<string, FraudSeriesConfig> = {
    Cases: {
        label: "Confirmed Cases",
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
    { name: "Starter", value: 185400, color: "#3B82F6" },
    { name: "Enterprise", value: 227400, color: "#F97316" },
]

export const adminSeverityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 53, color: "#6B7280" },
    { name: "Medium", value: 20, color: "#EAB308" },
    { name: "High", value: 22, color: "#F97316" },
    { name: "Critical", value: 8, color: "#EF4444" },
]

export const adminUsersActivityData: FraudDataPoint[] = [
    { month: "Jan", Checks: 1420 },
    { month: "Feb", Checks: 1180 },
    { month: "Mar", Checks: 1560 },
    { month: "Apr", Checks: 1320 },
    { month: "May", Checks: 1680 },
    { month: "Jun", Checks: 1490 },
    { month: "Jul", Checks: 1750 },
    { month: "Aug", Checks: 1210 },
    { month: "Sep", Checks: 1580 },
    { month: "Oct", Checks: 1640 },
    { month: "Nov", Checks: 1820 },
    { month: "Dec", Checks: 1390 },
]

export const adminChartConfig: Record<string, FraudSeriesConfig> = {
    Checks: {
        label: "Checks Submitted",
        color: "#4D66EA",
    },
}

/** Marketing summary for Admin Overview — links to Affiliates */
export const adminMarketingSummaryMetric: MetricCard = {
    title: "Active Marketers",
    value: "32",
    period: "Affiliates network",
    change: "+4",
    topBarClass: "bg-progress",
}
