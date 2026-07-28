import { MetricCard } from "@/features/overview/components/MetricCards"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { mockAgencyCases, computeCommissionRecovered, formatCurrency } from "@/data/agencyCasesData"

export const periods = ["All Time", "First Half of Year", "Second Half of Year"]

const totalCases = mockAgencyCases.length
const totalRecoveredEarnings = computeCommissionRecovered(mockAgencyCases)

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Checks", value: "12,450", period: "All time", change: "+1,200", topBarClass: "bg-purple-500" },
        { title: "Total Cases", value: String(totalCases), period: "All time", change: "+3", topBarClass: "bg-blue-500" },
        { title: "Recovered Earnings (Your Share)", value: formatCurrency(totalRecoveredEarnings), period: "All time", change: "", topBarClass: "bg-emerald-500" },
    ],
    "First Half of Year": [
        { title: "Total Checks", value: "6,120", period: "H1 2025", change: "+540", topBarClass: "bg-purple-500" },
        { title: "Total Cases", value: "9", period: "H1 2025", change: "+2", topBarClass: "bg-blue-500" },
        { title: "Recovered Earnings (Your Share)", value: "£9,600", period: "H1 2025", change: "", topBarClass: "bg-emerald-500" },
    ],
    "Second Half of Year": [
        { title: "Total Checks", value: "6,330", period: "H2 2025", change: "+660", topBarClass: "bg-purple-500" },
        { title: "Total Cases", value: "6", period: "H2 2025", change: "+1", topBarClass: "bg-blue-500" },
        { title: "Recovered Earnings (Your Share)", value: "£21,150", period: "H2 2025", change: "", topBarClass: "bg-emerald-500" },
    ],
}

export const lineChartData: FraudDataPoint[] = [
    { month: "Year 1", rate: 4 },
    { month: "Year 2", rate: 9 },
    { month: "Year 3", rate: totalCases },
]

export const chartConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Cases", color: "#00072C" },
}

export const recoveredEarningsData: FraudDataPoint[] = [
    { month: "Year 1", rate: 8500 },
    { month: "Year 2", rate: 19200 },
    { month: "Year 3", rate: totalRecoveredEarnings },
]

export const recoveredEarningsConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Earnings (Your Share)", color: "#10b981" },
}
