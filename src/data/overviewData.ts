import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownDatum } from "@/features/overview/components/CommissionBreakdownPanel"
import { RepeatOffender } from "@/features/overview/components/RepeatOffendersPanel"
import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { AlertRecord } from "@/features/overview/components/ActiveAlertsPanel"

export const periods = ["All Time", "This Month", "Last Week"]

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
            topBarClass: "bg-orange-700",
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
            value: "124",
            period: "This Month",
            change: "+12",
            topBarClass: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£3,450",
            period: "This Month",
            change: "+£500",
            topBarClass: "bg-orange-700",
        },
        {
            title: "Total Recoveries",
            value: "15",
            period: "This Month",
            change: "+1",
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
            value: "32",
            period: "Last Week",
            change: "-5",
            topBarClass: "bg-red-500",
        },
        {
            title: "Commission at Risk",
            value: "£890",
            period: "Last Week",
            change: "-£200",
            topBarClass: "bg-orange-700",
        },
        {
            title: "Total Recoveries",
            value: "4",
            period: "Last Week",
            change: "0",
            topBarClass: "bg-green-500",
        },
        {
            title: "Avg. Fraud Likelihood",
            value: "32%",
            period: "Last Week",
            change: "-3%",
            topBarClass: "bg-purple-500",
        },
    ],
}

export const donutData: CommissionBreakdownDatum[] = [
    { name: "Private Sale", value: 543, color: "#9333EA" },
    { name: "Buyer Intro", value: 233, color: "#3B82F6" },
    { name: "Dual Agency", value: 76, color: "#F97316" },
]

export const repeatOffenders: RepeatOffender[] = [
    { name: "Fredrick Hunt", location: "Ashfield Road", offenses: 24 },
    { name: "Madeline Kahro", location: "Picadilly", offenses: 22 },
    { name: "Fredrick Hunt", location: "Leicester", offenses: 19 },
    { name: "Fredrick Hunt", location: "Manchester", offenses: 19 },
    { name: "Fredrick Hunt", location: "London", offenses: 12 },
]

export const alertsData: AlertRecord[] = [
    {
        caseId: "#256545",
        property: "22 Ashfield Road",
        fraudScore: 92,
        type: "Buyer Intro",
        severity: "Critical",
        dateDetected: "3 Nov, 2025",
    },
    {
        caseId: "#367281",
        property: "22 Ashfield Road",
        fraudScore: 88,
        type: "Private Sale",
        severity: "Low",
        dateDetected: "21 Oct, 2025",
    },
    {
        caseId: "#367282",
        property: "22 Ashfield Road",
        fraudScore: 100,
        type: "Dual Agency",
        severity: "Low",
        dateDetected: "30 Sep, 2025",
    },
    {
        caseId: "#367290",
        property: "22 Ashfield Road",
        fraudScore: 91,
        type: "Private Sale",
        severity: "Critical",
        dateDetected: "24 Sep, 2025",
    },
    {
        caseId: "#367291",
        property: "22 Ashfield Road",
        fraudScore: 89,
        type: "Buyer Intro",
        severity: "High",
        dateDetected: "24 Sep, 2025",
    },
]

export const severityStyles: Record<AlertRecord["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-amber-50 text-amber-600 border border-amber-100",
    Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

export const lineChartData: FraudDataPoint[] = [
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

export const chartConfig: Record<string, FraudSeriesConfig> = {
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
