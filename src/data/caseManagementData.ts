import { MetricCard } from "@/features/overview/components/MetricCards"
import {
    mockAgencyCases,
    getAgencyFacingCaseStatus,
    AgencyFacingCaseStatus,
    AgencyDisputeStatus,
} from "@/data/agencyCasesData"

export const periods = ["All Time", "This Month", "Last Week"]

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Cases", value: String(mockAgencyCases.length), period: "All time", change: "", topBarClass: "bg-red-500" },
        { title: "Cases Closed", value: String(mockAgencyCases.filter((c) => c.adminStatus === "Closed").length), period: "All time", change: "", topBarClass: "bg-green-500" },
    ],
    "This Month": [
        { title: "Total Cases", value: "6", period: "This Month", change: "+2", topBarClass: "bg-red-500" },
        { title: "Cases Closed", value: "3", period: "This Month", change: "+1", topBarClass: "bg-green-500" },
    ],
    "Last Week": [
        { title: "Total Cases", value: "2", period: "Last Week", change: "0", topBarClass: "bg-red-500" },
        { title: "Cases Closed", value: "1", period: "Last Week", change: "0", topBarClass: "bg-green-500" },
    ],
}

export interface CaseRecord {
    caseId: string
    propertyAddress: string
    completionDate: string
    buyerName: string
    caseStatus: AgencyFacingCaseStatus
    agencyDispute?: AgencyDisputeStatus
    disputeNote?: string
    recoveryOutcome?: string
}

export function getAllCasesData(): CaseRecord[] {
    return mockAgencyCases.map((c) => ({
        caseId: c.caseId,
        propertyAddress: c.propertyAddress,
        completionDate: c.completionDate,
        buyerName: c.buyerName,
        caseStatus: getAgencyFacingCaseStatus(c),
        agencyDispute: c.agencyDispute,
        disputeNote: c.disputeNote,
        recoveryOutcome: c.recoveryOutcome,
    }))
}

export const allCasesData: CaseRecord[] = getAllCasesData()
