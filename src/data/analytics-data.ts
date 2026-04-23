import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { RepeatOffender } from "@/features/overview/components/RepeatOffendersPanel"
import { TimingGapData } from "@/features/analytics/components/TimingGapsDistributionPanel"
import { MetricCard } from "@/features/overview/components/MetricCards"
import { EventLogEntry } from "@/data/reportsData"

export const periods = ["All Time", "First Half of Year", "Second Half of Year"]

export const analyticsTabs = [
    { label: "Overview", value: "overview" },
    { label: "Fraud Patterns", value: "fraud-patterns" },
    { label: "Financial Impact", value: "financial-impact" },
]

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Fraud Alerts", value: "1,459", period: "All time", change: "+221", topBarClass: "bg-red-500" },
        { title: "Open Cases", value: "152", period: "All time", change: "+5", topBarClass: "bg-purple-500" },
        { title: "All Time Closed Cases", value: "1,307", period: "All time", change: "+216", topBarClass: "bg-green-500" },
        { title: "Avg. Fraud Likelihood", value: "37%", period: "All time", change: "+2%", topBarClass: "bg-blue-500" },
    ],
    "First Half of Year": [
        { title: "Total Fraud Alerts", value: "842", period: "H1 2025", change: "+45", topBarClass: "bg-red-500" },
        { title: "Open Cases", value: "85", period: "H1 2025", change: "+12", topBarClass: "bg-purple-500" },
        { title: "All Time Closed Cases", value: "650", period: "H1 2025", change: "+85", topBarClass: "bg-green-500" },
        { title: "Avg. Fraud Likelihood", value: "38%", period: "H1 2025", change: "+2%", topBarClass: "bg-blue-500" },
    ],
    "Second Half of Year": [
        { title: "Total Fraud Alerts", value: "617", period: "H2 2025", change: "+12", topBarClass: "bg-red-500" },
        { title: "Open Cases", value: "67", period: "H2 2025", change: "-18", topBarClass: "bg-purple-500" },
        { title: "All Time Closed Cases", value: "657", period: "H2 2025", change: "+131", topBarClass: "bg-green-500" },
        { title: "Avg. Fraud Likelihood", value: "35%", period: "H2 2025", change: "-3%", topBarClass: "bg-blue-500" },
    ],
}

export const eventLogsData: EventLogEntry[] = [
    { actor: "Sarah Jenkins", role: "Manager", actionType: "Triggered Case", targetObject: "Case", date: "24 Nov, 2025" },
    { actor: "Michael Thorne", role: "Agent", actionType: "Closed Case", targetObject: "Case", date: "24 Nov, 2025" },
    { actor: "Sarah Jenkins", role: "Manager", actionType: "Role Override", targetObject: "Agency", date: "23 Nov, 2025" },
    { actor: "Sarah Jenkins", role: "Manager", actionType: "Printed Invoice", targetObject: "Invoice", date: "23 Nov, 2025" },
    { actor: "Michael Thorne", role: "Agent", actionType: "Closed Case", targetObject: "Case", date: "22 Nov, 2025" },
]

export const closedCasesData = [
    { id: "#367282", address: "12 High Street, London", closedBy: "Admin", closedDate: "22 Nov, 2025", reason: "Verified Sale" },
    { id: "#367285", address: "56 Victoria Road, Bristol", closedBy: "Admin", closedDate: "20 Nov, 2025", reason: "Direct Instruction" },
    { id: "#367288", address: "67 Park Avenue, Sheffield", closedBy: "Admin", closedDate: "15 Nov, 2025", reason: "No Fraud Found" },
]

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

export const repeatOffenders: RepeatOffender[] = [
    { name: "Fredrick Hunt", location: "Ashfield Road", offenses: 24 },
    { name: "Madeline Kahro", location: "Picadilly", offenses: 22 },
    { name: "Fredrick Hunt", location: "Leicester", offenses: 19 },
    { name: "Fredrick Hunt", location: "Manchester", offenses: 19 },
    { name: "Fredrick Hunt", location: "Birmingham", offenses: 18 },
    { name: "James Bond", location: "Kirkshire", offenses: 10 },
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
