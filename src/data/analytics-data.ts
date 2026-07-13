import { FraudDataPoint, FraudSeriesConfig } from "@/features/overview/components/FraudDetectionPanel"
import { MetricCard } from "@/features/overview/components/MetricCards"
import { mockAgencyCases, getAgencyFacingCaseStatus } from "@/data/agencyCasesData"

export const periods = ["All Time", "First Half of Year", "Second Half of Year"]

const openCasesCount = mockAgencyCases.filter((c) => getAgencyFacingCaseStatus(c) === "Open").length
const closedCasesCount = mockAgencyCases.filter((c) => c.adminStatus === "Closed").length

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Open Cases", value: String(openCasesCount), period: "All time", change: "+2", topBarClass: "bg-purple-500" },
        { title: "Closed Cases", value: String(closedCasesCount), period: "All time", change: "+4", topBarClass: "bg-green-500" },
    ],
    "First Half of Year": [
        { title: "Open Cases", value: "6", period: "H1 2025", change: "+1", topBarClass: "bg-purple-500" },
        { title: "Closed Cases", value: "3", period: "H1 2025", change: "+2", topBarClass: "bg-green-500" },
    ],
    "Second Half of Year": [
        { title: "Open Cases", value: String(openCasesCount - 6), period: "H2 2025", change: "+1", topBarClass: "bg-purple-500" },
        { title: "Closed Cases", value: String(closedCasesCount - 3), period: "H2 2025", change: "+2", topBarClass: "bg-green-500" },
    ],
}

export const casesOverTimeData: FraudDataPoint[] = [
    { month: "Jan", rate: 1 },
    { month: "Feb", rate: 2 },
    { month: "Mar", rate: 1 },
    { month: "Apr", rate: 2 },
    { month: "May", rate: 1 },
    { month: "Jun", rate: 2 },
    { month: "Jul", rate: 1 },
    { month: "Aug", rate: 2 },
    { month: "Sep", rate: 1 },
    { month: "Oct", rate: 2 },
    { month: "Nov", rate: 1 },
    { month: "Dec", rate: 1 },
]

export const casesOverTimeConfig: Record<string, FraudSeriesConfig> = {
    rate: { label: "Cases", color: "#00072C" },
}

/** Used by admin/shared ClosedCasesTable — not shown in agency analytics */
export const closedCasesData = [
    { id: "#367282", address: "12 High Street, London", closedBy: "Admin", closedDate: "22 Nov, 2025", reason: "Verified Sale" },
    { id: "#367285", address: "56 Victoria Road, Bristol", closedBy: "Admin", closedDate: "20 Nov, 2025", reason: "Direct Instruction" },
    { id: "#367288", address: "67 Park Avenue, Sheffield", closedBy: "Admin", closedDate: "15 Nov, 2025", reason: "No Fraud Found" },
]
