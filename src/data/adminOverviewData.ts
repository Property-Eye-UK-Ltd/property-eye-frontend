import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { CaseQueueRecord } from "@/features/admin/components/CaseQueuePanel"
import { FraudTypeData, FraudTypeConfig } from "@/features/analytics/components/MostCommonFraudTypesPanel"

export const adminMetricsData: Record<string, MetricCard[]> = {
    "All Time": [
        {
            title: "Total Checks Used",
            value: "17,320",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-blue-500",
        },
        {
            title: "Total Agencies",
            value: "1,459",
            period: "All time",
            change: "+321",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Open Cases",
            value: "280",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Recovered Commission",
            value: "£433,294",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-green-500",
        },
    ],
    "This Month": [
        {
            title: "Total Checks Used",
            value: "1,250",
            period: "This Month",
            change: "+5%",
            topBarClass: "bg-blue-500",
        },
        {
            title: "Total Agencies",
            value: "1,480",
            period: "This Month",
            change: "+21",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Open Cases",
            value: "45",
            period: "This Month",
            change: "-10%",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Recovered Commission",
            value: "£32,400",
            period: "This Month",
            change: "+4%",
            topBarClass: "bg-green-500",
        },
    ],
    "Last Week": [
        {
            title: "Total Checks Used",
            value: "320",
            period: "Last Week",
            change: "-1%",
            topBarClass: "bg-blue-500",
        },
        {
            title: "Total Agencies",
            value: "1,482",
            period: "Last Week",
            change: "+2",
            topBarClass: "bg-red-500",
        },
        {
            title: "Total Open Cases",
            value: "12",
            period: "Last Week",
            change: "-5%",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Recovered Commission",
            value: "£8,500",
            period: "Last Week",
            change: "+1%",
            topBarClass: "bg-green-500",
        },
    ],
}

export const adminRevenueData: CommissionBreakdownDatum[] = [
    { name: "Basic Plan", value: 9543, color: "#9333EA" }, // Purple
    { name: "Pro Plan", value: 6233, color: "#3B82F6" }, // Blue
    { name: "Premium Plan", value: 5543, color: "#6B7280" }, // Grey
    { name: "Enterprise Plan", value: 4976, color: "#F97316" }, // Orange
]

export const adminCaseQueueData: CaseQueueRecord[] = [
    {
        caseId: "367280",
        fraudType: "Buyer Intro",
        severity: "Critical",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "367280",
        fraudType: "Private Sale",
        severity: "Critical",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "367280",
        fraudType: "Dual Agency",
        severity: "High",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "367280",
        fraudType: "Private Sale",
        severity: "High",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "367280",
        fraudType: "Buyer Intro",
        severity: "High",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "367280",
        fraudType: "Dual Agency",
        severity: "Medium",
        dateDetected: "3 Nov, 2025",
    },
]

export const adminSeverityStyles: Record<CaseQueueRecord["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-amber-50 text-amber-600 border border-amber-100",
    Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

export const adminFraudTypeStyles: Record<string, string> = {
    "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-200",
    "Private Sale": "bg-amber-50 text-amber-600 border border-amber-200",
    "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-200",
}

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
        color: "#4D66EA", // Primary Blue
    },
}

// Fraud Detection Over Time Data
export const adminFraudDetectionData: FraudDataPoint[] = [
    { month: "Jan", Critical: 70, High: 40, Medium: 42, Low: 42 },
    { month: "Feb", Critical: 18, High: 20, Medium: 20, Low: 50 },
    { month: "Mar", Critical: 35, High: 42, Medium: 35, Low: 38 },
    { month: "Apr", Critical: 82, High: 70, Medium: 40, Low: 82 },
    { month: "May", Critical: 40, High: 70, Medium: 70, Low: 15 },
    { month: "Jun", Critical: 10, High: 98, Medium: 20, Low: 15 },
    { month: "Jul", Critical: 55, High: 95, Medium: 55, Low: 50 },
    { month: "Aug", Critical: 15, High: 40, Medium: 40, Low: 35 },
    { month: "Sep", Critical: 57, High: 82, Medium: 82, Low: 95 },
    { month: "Oct", Critical: 52, High: 28, Medium: 55, Low: 95 },
    { month: "Nov", Critical: 90, High: 62, Medium: 70, Low: 55 },
    { month: "Dec", Critical: 42, High: 88, Medium: 65, Low: 15 },
]

export const adminFraudDetectionConfig: Record<string, FraudSeriesConfig> = {
    Critical: {
        label: "Critical",
        color: "#EF4444",
    },
    High: {
        label: "High",
        color: "#F97316",
    },
    Medium: {
        label: "Medium",
        color: "#EAB308",
    },
    Low: {
        label: "Low",
        color: "#6B7280",
    },
}

// Severity Distribution Data
export const adminSeverityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 53, color: "#6B7280" },
    { name: "Medium", value: 20, color: "#EAB308" },
    { name: "High", value: 22, color: "#F97316" },
    { name: "Critical", value: 8, color: "#EF4444" },
]

// Most Common Fraud Types Data
export const adminFraudTypesData: FraudTypeData[] = [
    { type: "Private Sale", privateSale: 55, buyerIntro: 0, dualAgency: 0 },
    { type: "Buyer Intro", privateSale: 0, buyerIntro: 78, dualAgency: 0 },
    { type: "Dual Agency", privateSale: 0, buyerIntro: 0, dualAgency: 72 },
]

export const adminFraudTypesConfig: Record<string, FraudTypeConfig> = {
    privateSale: { label: "Private Sale", color: "#9333EA" },
    buyerIntro: { label: "Buyer Intro", color: "#3B82F6" },
    dualAgency: { label: "Dual Agency", color: "#1E40AF" },
}
