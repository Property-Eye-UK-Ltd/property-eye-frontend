import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { AlertRecord } from "@/features/overview/components/ActiveAlertsPanel"

export const periods = ["All Time", "First Half of Year", "Second Half of Year"]

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Fraud Alerts", value: "1,459", period: "All time", change: "+221", topBarClass: "bg-red-500" },
        { title: "Commission at Risk", value: "£12,898", period: "All time", change: "+£2,233", topBarClass: "bg-orange-700" },
        { title: "Total Recoveries", value: "324", period: "All time", change: "+2", topBarClass: "bg-green-500" },
        { title: "Total Checks", value: "12,450", period: "All time", change: "+1,200", topBarClass: "bg-purple-500" },
    ],
    "First Half of Year": [
        { title: "Total Fraud Alerts", value: "842", period: "H1 2025", change: "+45", topBarClass: "bg-red-500" },
        { title: "Commission at Risk", value: "£7,450", period: "H1 2025", change: "+£1,200", topBarClass: "bg-orange-700" },
        { title: "Total Recoveries", value: "185", period: "H1 2025", change: "+12", topBarClass: "bg-green-500" },
        { title: "Total Checks", value: "6,120", period: "H1 2025", change: "+540", topBarClass: "bg-purple-500" },
    ],
    "Second Half of Year": [
        { title: "Total Fraud Alerts", value: "617", period: "H2 2025", change: "+12", topBarClass: "bg-red-500" },
        { title: "Commission at Risk", value: "£5,448", period: "H2 2025", change: "+£1,033", topBarClass: "bg-orange-700" },
        { title: "Total Recoveries", value: "139", period: "H2 2025", change: "+2", topBarClass: "bg-green-500" },
        { title: "Total Checks", value: "6,330", period: "H2 2025", change: "+660", topBarClass: "bg-purple-500" },
    ],
}

export interface TopProperty {
    name: string
    location: string
    commission: string
}

export const topProperties: TopProperty[] = [
    { name: "22 Ashfield Road", location: "Leicester", commission: "£12,450" },
    { name: "45 Piccadilly", location: "Manchester", commission: "£9,820" },
    { name: "12 High Street", location: "London", commission: "£8,150" },
    { name: "78 Oxford Road", location: "Birmingham", commission: "£7,900" },
    { name: "33 King Street", location: "Leeds", commission: "£6,400" },
    { name: "56 Victoria Road", location: "Bristol", commission: "£5,820" },
    { name: "91 Church Lane", location: "Liverpool", commission: "£4,950" },
    { name: "23 Market Square", location: "Newcastle", commission: "£4,200" },
]

export const severityData: CommissionBreakdownDatum[] = [
    { name: "Low", value: 42, color: "#6B7280" },
    { name: "Medium", value: 42, color: "#EAB308" },
    { name: "High", value: 40, color: "#F97316" },
    { name: "Critical", value: 70, color: "#EF4444" },
]

export const alertsData: AlertRecord[] = [
    { caseId: "#256545", property: "22 Ashfield Road", fraudScore: 92, type: "Buyer Intro", severity: "Critical", dateDetected: "3 Nov, 2025" },
    { caseId: "#367281", property: "45 Piccadilly", fraudScore: 88, type: "Private Sale", severity: "Low", dateDetected: "21 Oct, 2025" },
    { caseId: "#367282", property: "12 High Street", fraudScore: 100, type: "Dual Agency", severity: "Low", dateDetected: "30 Sep, 2025" },
    { caseId: "#367290", property: "33 King Street", fraudScore: 91, type: "Private Sale", severity: "Critical", dateDetected: "24 Sep, 2025" },
    { caseId: "#367291", property: "56 Victoria Road", fraudScore: 89, type: "Buyer Intro", severity: "High", dateDetected: "24 Sep, 2025" },
]

export const severityStyles: Record<AlertRecord["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-amber-50 text-amber-600 border border-amber-100",
    Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

// Updated to yearly growth only (Year 1, Year 2, Year 3)
export const lineChartData: FraudDataPoint[] = [
    { month: "Year 1", rate: 450 },
    { month: "Year 2", rate: 890 },
    { month: "Year 3", rate: 1459 },
]

export const chartConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Fraud Growth", color: "#00072C" },
}
