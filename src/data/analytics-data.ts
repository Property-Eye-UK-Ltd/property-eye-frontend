import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { RepeatOffender } from "@/features/overview/components/RepeatOffendersPanel"
import { FraudTypeData, FraudTypeConfig } from "@/features/analytics/components/MostCommonFraudTypesPanel"
import { TimingGapData } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { MetricCard } from "@/features/overview/components/MetricCards"

export const periods = ["All Time", "This Month", "Last Week"]

export const analyticsTabs = [
    { label: "Overview", value: "overview" },
    { label: "Fraud Patterns", value: "fraud-patterns" },
    { label: "Financial Impact", value: "financial-impact" },
]

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        {
            title: "Total fraud Alerts",
            value: "1,459",
            period: "All time",
            change: "+221",
            topBarClass: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£12,898",
            period: "All time",
            change: "+£2,233",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Recoveries",
            value: "324",
            period: "All time",
            change: "+2",
            topBarClass: "bg-green-500",
        },
        {
            title: "Avg. Fraud Likelihood",
            value: "37%",
            period: "All time",
            change: "+2%",
            topBarClass: "bg-purple-500",
        },
    ],
    "This Month": [
        {
            title: "Total fraud Alerts",
            value: "128",
            period: "This Month",
            change: "+15",
            topBarClass: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£1,250",
            period: "This Month",
            change: "+£150",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Recoveries",
            value: "22",
            period: "This Month",
            change: "+3",
            topBarClass: "bg-green-500",
        },
        {
            title: "Avg. Fraud Likelihood",
            value: "35%",
            period: "This Month",
            change: "-1%",
            topBarClass: "bg-purple-500",
        },
    ],
    "Last Week": [
        {
            title: "Total fraud Alerts",
            value: "34",
            period: "Last Week",
            change: "-2",
            topBarClass: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£450",
            period: "Last Week",
            change: "-£50",
            topBarClass: "bg-orange-500",
        },
        {
            title: "Total Recoveries",
            value: "5",
            period: "Last Week",
            change: "+1",
            topBarClass: "bg-green-500",
        },
        {
            title: "Avg. Fraud Likelihood",
            value: "33%",
            period: "Last Week",
            change: "-3%",
            topBarClass: "bg-purple-500",
        },
    ],
}

// Overview Tab Data
export const fraudRateData: FraudDataPoint[] = [
    { month: "Jan", rate: 72 },
    { month: "Feb", rate: 18 },
    { month: "Mar", rate: 32 },
    { month: "Apr", rate: 22 },
    { month: "May", rate: 42 },
    { month: "Jun", rate: 12 },
    { month: "Jul", rate: 58 },
    { month: "Aug", rate: 15 },
    { month: "Sep", rate: 58 },
    { month: "Oct", rate: 52 },
    { month: "Nov", rate: 88 },
    { month: "Dec", rate: 42 },
]

export const fraudRateConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Fraud Rate", color: "#00072C" },
}

export const severityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 53, color: "#6B7280" },
    { name: "Medium", value: 20, color: "#EAB308" },
    { name: "High", value: 22, color: "#F97316" },
    { name: "Critical", value: 8, color: "#EF4444" },
]

export const detectionData: FraudDataPoint[] = [
    { month: "Jan", detection: 45, falsePositive: 68 },
    { month: "Feb", detection: 52, falsePositive: 15 },
    { month: "Mar", detection: 32, falsePositive: 32 },
    { month: "Apr", detection: 85, falsePositive: 22 },
    { month: "May", detection: 15, falsePositive: 42 },
    { month: "Jun", detection: 12, falsePositive: 12 },
    { month: "Jul", detection: 52, falsePositive: 62 },
    { month: "Aug", detection: 35, falsePositive: 12 },
    { month: "Sep", detection: 92, falsePositive: 58 },
    { month: "Oct", detection: 92, falsePositive: 62 },
    { month: "Nov", detection: 58, falsePositive: 92 },
    { month: "Dec", detection: 12, falsePositive: 42 },
]

export const detectionConfig: Record<string, FraudSeriesConfig> = {
    detection: { label: "Detection", color: "#16A34A" },
    falsePositive: { label: "False Positive Ratio", color: "#EF4444" },
}

// Fraud Patterns Tab Data
export const fraudTypesData: FraudTypeData[] = [
    { type: "Private Sale", privateSale: 55, buyerIntro: 0, dualAgency: 0 },
    { type: "Buyer Intro", privateSale: 0, buyerIntro: 78, dualAgency: 0 },
    { type: "Dual Agency", privateSale: 0, buyerIntro: 0, dualAgency: 72 },
]

export const fraudTypesConfig: Record<string, FraudTypeConfig> = {
    privateSale: { label: "Private Sale", color: "#9333EA" },
    buyerIntro: { label: "Buyer Intro", color: "#3B82F6" },
    dualAgency: { label: "Dual Agency", color: "#1E40AF" },
}

export const repeatOffenders: RepeatOffender[] = [
    { name: "Fredrick Hunt", location: "Ashfield Road", offenses: 24 },
    { name: "Madeline Kahro", location: "Picadilly", offenses: 22 },
    { name: "Fredrick Hunt", location: "Leicester", offenses: 19 },
    { name: "Fredrick Hunt", location: "Manchester", offenses: 19 },
    { name: "Fredrick Hunt", location: "London", offenses: 12 },
    { name: "Fredrick Hunt", location: "London", offenses: 12 },
]

export const timingGapsData: TimingGapData[] = [
    { range: "0", count: 5 },
    { range: "50", count: 8 },
    { range: "100", count: 7 },
    { range: "150", count: 5 },
    { range: "200", count: 3 },
    { range: "250", count: 3 },
    { range: "300", count: 8 },
    { range: "350", count: 14 },
    { range: "400", count: 16 },
    { range: "450", count: 19 },
    { range: "500", count: 14 },
    { range: "550", count: 13 },
    { range: "600", count: 10 },
    { range: "650", count: 8 },
    { range: "700", count: 6 },
    { range: "750", count: 7 },
    { range: "800", count: 5 },
    { range: "850", count: 4 },
    { range: "900", count: 3 },
]

// Financial Impact Tab Data
export const commissionAvoidedData: FraudDataPoint[] = [
    { month: "Jan", avoided: 70 },
    { month: "Feb", avoided: 15 },
    { month: "Mar", avoided: 30 },
    { month: "Apr", avoided: 20 },
    { month: "May", avoided: 40 },
    { month: "Jun", avoided: 10 },
    { month: "Jul", avoided: 55 },
    { month: "Aug", avoided: 12 },
    { month: "Sep", avoided: 55 },
    { month: "Oct", avoided: 50 },
    { month: "Nov", avoided: 90 },
    { month: "Dec", avoided: 40 },
]

export const commissionAvoidedConfig: Record<string, FraudSeriesConfig> = {
    avoided: { label: "Commission Avoided", color: "#00072C" },
}

export const recoveredCommissionData: FraudDataPoint[] = [
    { month: "Jan", recovered: 10 },
    { month: "Feb", recovered: 12 },
    { month: "Mar", recovered: 15 },
    { month: "Apr", recovered: 18 },
    { month: "May", recovered: 25 },
    { month: "Jun", recovered: 22 },
    { month: "Jul", recovered: 40 },
    { month: "Aug", recovered: 35 },
    { month: "Sep", recovered: 50 },
    { month: "Oct", recovered: 48 },
    { month: "Nov", recovered: 55 },
    { month: "Dec", recovered: 52 },
]

export const recoveredCommissionConfig: Record<string, FraudSeriesConfig> = {
    recovered: { label: "Recovered Commission", color: "#3B82F6" },
}
