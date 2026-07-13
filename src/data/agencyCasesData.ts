export type AdminCaseStatus = "Open" | "Under Legal Review" | "Flagged" | "Pending Approval" | "Closed"
export type CaseDetermination = "Fraudulent (Confirmed)" | "Not Fraudulent (Cleared)"
export type RecoveryOutcome = "Recovered" | "Unrecovered" | "Disputed" | "N/A"
export type AgencyDisputeStatus = "None" | "Open" | "Resolved"

export interface AgencyCase {
    id: string
    caseId: string
    propertyAddress: string
    completionDate: string
    withdrawalDate: string
    saleDate: string
    buyerName: string
    /** Legacy agency-facing checked state */
    status: "CHECKED" | ""
    agencyName?: string
    adminStatus: AdminCaseStatus
    severity: "Critical" | "High" | "Medium" | "Low"
    determination?: CaseDetermination
    recoveryOutcome?: RecoveryOutcome
    recoveredAmount?: string
    clearingReason?: string
    flagNote?: string
    returnNote?: string
    agencyDispute?: AgencyDisputeStatus
}

export const adminCaseStatusStyles: Record<AdminCaseStatus, string> = {
    Open: "bg-blue-50 text-blue-600 border border-blue-100",
    "Under Legal Review": "bg-purple-50 text-purple-600 border border-purple-100",
    Flagged: "bg-amber-50 text-amber-600 border border-amber-100",
    "Pending Approval": "bg-indigo-50 text-indigo-600 border border-indigo-100",
    Closed: "bg-green-50 text-green-600 border border-green-100",
}

export const mockAgencyCases: AgencyCase[] = [
    {
        id: "1",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        completionDate: "15 Aug, 2025",
        withdrawalDate: "15 Aug, 2025",
        saleDate: "15 Aug, 2025",
        buyerName: "Kris Luther",
        status: "CHECKED",
        agencyName: "Solict Homes",
        adminStatus: "Closed",
        severity: "Critical",
        determination: "Fraudulent (Confirmed)",
        recoveryOutcome: "Recovered",
        recoveredAmount: "£42,300",
        agencyDispute: "None",
    },
    {
        id: "2",
        caseId: "#367281",
        propertyAddress: "45 Belvoir Drive, Leicester",
        completionDate: "2 Jul, 2025",
        withdrawalDate: "2 Jul, 2025",
        saleDate: "2 Jul, 2025",
        buyerName: "Iverson James",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
        adminStatus: "Under Legal Review",
        severity: "High",
    },
    {
        id: "3",
        caseId: "#367282",
        propertyAddress: "12 Church Lane, London",
        completionDate: "18 Jun, 2025",
        withdrawalDate: "18 Jun, 2025",
        saleDate: "18 Jun, 2025",
        buyerName: "Sarah Jenkins",
        status: "",
        agencyName: "Mindcraft Homes",
        adminStatus: "Open",
        severity: "Medium",
    },
    {
        id: "4",
        caseId: "#367283",
        propertyAddress: "88 Park Avenue, Manchester",
        completionDate: "9 May, 2025",
        withdrawalDate: "9 May, 2025",
        saleDate: "9 May, 2025",
        buyerName: "David Wilson",
        status: "CHECKED",
        agencyName: "Dresscket",
        adminStatus: "Flagged",
        severity: "High",
        flagNote: "Recovery stalled — awaiting legal response",
    },
    {
        id: "5",
        caseId: "#367284",
        propertyAddress: "15 Station Road, Birmingham",
        completionDate: "30 Apr, 2025",
        withdrawalDate: "30 Apr, 2025",
        saleDate: "30 Apr, 2025",
        buyerName: "Emma Thompson",
        status: "",
        agencyName: "Solict Homes",
        adminStatus: "Pending Approval",
        severity: "Low",
        determination: "Not Fraudulent (Cleared)",
        recoveryOutcome: "N/A",
        clearingReason: "PPD sale unrelated to introduced buyer",
    },
    {
        id: "6",
        caseId: "#367285",
        propertyAddress: "29 High Street, Bristol",
        completionDate: "12 Mar, 2025",
        withdrawalDate: "12 Mar, 2025",
        saleDate: "12 Mar, 2025",
        buyerName: "Michael Brown",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
        adminStatus: "Closed",
        severity: "Medium",
        determination: "Not Fraudulent (Cleared)",
        recoveryOutcome: "N/A",
        clearingReason: "Buyer introduced by agency — match confirmed legitimate",
        agencyDispute: "None",
    },
    {
        id: "7",
        caseId: "#367286",
        propertyAddress: "102 Ocean View, Brighton",
        completionDate: "25 Oct, 2025",
        withdrawalDate: "25 Oct, 2025",
        saleDate: "25 Oct, 2025",
        buyerName: "Liam Neeson",
        status: "CHECKED",
        agencyName: "Mindcraft Homes",
        adminStatus: "Open",
        severity: "Critical",
    },
    {
        id: "8",
        caseId: "#367287",
        propertyAddress: "14 Abbey Road, London",
        completionDate: "5 Sep, 2025",
        withdrawalDate: "5 Sep, 2025",
        saleDate: "5 Sep, 2025",
        buyerName: "Paul McCartney",
        status: "",
        agencyName: "Dresscket",
        adminStatus: "Under Legal Review",
        severity: "High",
    },
    {
        id: "9",
        caseId: "#367288",
        propertyAddress: "56 Castle Street, Edinburgh",
        completionDate: "19 Nov, 2025",
        withdrawalDate: "19 Nov, 2025",
        saleDate: "19 Nov, 2025",
        buyerName: "Sean Connery",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
        adminStatus: "Closed",
        severity: "Low",
        determination: "Fraudulent (Confirmed)",
        recoveryOutcome: "Recovered",
        recoveredAmount: "£19,200",
        agencyDispute: "Resolved",
    },
    {
        id: "10",
        caseId: "#367289",
        propertyAddress: "77 Baker Street, London",
        completionDate: "1 Jan, 2026",
        withdrawalDate: "1 Jan, 2026",
        saleDate: "1 Jan, 2026",
        buyerName: "Sherlock Holmes",
        status: "CHECKED",
        agencyName: "Solict Homes",
        adminStatus: "Pending Approval",
        severity: "Critical",
        determination: "Fraudulent (Confirmed)",
        recoveryOutcome: "Recovered",
        recoveredAmount: "£31,800",
    },
    {
        id: "11",
        caseId: "#367290",
        propertyAddress: "12 Victoria Road, Leeds",
        completionDate: "14 Feb, 2025",
        withdrawalDate: "14 Feb, 2025",
        saleDate: "14 Feb, 2025",
        buyerName: "John Doe",
        status: "",
        agencyName: "Baltimore Homes",
        adminStatus: "Open",
        severity: "Low",
    },
    {
        id: "12",
        caseId: "#367291",
        propertyAddress: "34 King Street, Liverpool",
        completionDate: "22 Mar, 2025",
        withdrawalDate: "22 Mar, 2025",
        saleDate: "22 Mar, 2025",
        buyerName: "Jane Smith",
        status: "CHECKED",
        agencyName: "Mindcraft Homes",
        adminStatus: "Closed",
        severity: "Medium",
        determination: "Not Fraudulent (Cleared)",
        recoveryOutcome: "N/A",
        clearingReason: "Agency documentation confirms private family sale exemption",
    },
    {
        id: "13",
        caseId: "#367292",
        propertyAddress: "90 Queen Road, Glasgow",
        completionDate: "11 Apr, 2025",
        withdrawalDate: "11 Apr, 2025",
        saleDate: "11 Apr, 2025",
        buyerName: "Robert Bruce",
        status: "CHECKED",
        agencyName: "Dresscket",
        adminStatus: "Flagged",
        severity: "High",
        flagNote: "Buyer disputing match — additional evidence requested",
    },
    {
        id: "14",
        caseId: "#367293",
        propertyAddress: "5 Princes Street, Oxford",
        completionDate: "3 May, 2025",
        withdrawalDate: "3 May, 2025",
        saleDate: "3 May, 2025",
        buyerName: "Alice Wonderland",
        status: "",
        agencyName: "Solict Homes",
        adminStatus: "Under Legal Review",
        severity: "Medium",
    },
    {
        id: "15",
        caseId: "#367294",
        propertyAddress: "18 Broad Street, Cambridge",
        completionDate: "21 Jun, 2025",
        withdrawalDate: "21 Jun, 2025",
        saleDate: "21 Jun, 2025",
        buyerName: "Isaac Newton",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
        adminStatus: "Closed",
        severity: "Critical",
        determination: "Fraudulent (Confirmed)",
        recoveryOutcome: "Unrecovered",
        recoveredAmount: "£0",
        agencyDispute: "Open",
    },
]

export const caseSeverityStyles: Record<string, string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Low: "bg-gray-50 text-gray-600 border border-gray-100",
}

export const caseFraudTypeStyles: Record<string, string> = {
    "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-100",
    "Private Sale": "bg-orange-50 text-orange-600 border border-orange-100",
    "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-100",
}

export type AgencyFacingCaseStatus = "Open" | "Closed (Confirmed Fraud)" | "Closed (Not Fraud)"

export function getAgencyFacingCaseStatus(c: Pick<AgencyCase, "adminStatus" | "determination">): AgencyFacingCaseStatus {
    if (c.adminStatus === "Closed") {
        if (c.determination === "Fraudulent (Confirmed)") return "Closed (Confirmed Fraud)"
        return "Closed (Not Fraud)"
    }
    return "Open"
}

/** Coarse admin-adjacent helper for progress counts */
export type AgencyCaseDisplayStatus = "Open" | "In Progress" | "Closed"

export function getAgencyCaseDisplayStatus(adminStatus: AdminCaseStatus): AgencyCaseDisplayStatus {
    if (adminStatus === "Closed") return "Closed"
    if (adminStatus === "Open") return "Open"
    return "In Progress"
}

export function parseRecoveredAmount(amount?: string): number {
    if (!amount) return 0
    return parseFloat(amount.replace(/[£,]/g, "")) || 0
}

export function computeCommissionRecovered(cases: AgencyCase[]): number {
    return cases
        .filter(
            (c) =>
                c.adminStatus === "Closed" &&
                c.determination === "Fraudulent (Confirmed)" &&
                c.recoveryOutcome === "Recovered"
        )
        .reduce((sum, c) => sum + parseRecoveredAmount(c.recoveredAmount), 0) * 0.5
}

export function computeClearanceRate(cases: AgencyCase[]): string {
    const closed = cases.filter((c) => c.adminStatus === "Closed")
    if (closed.length === 0) return "—"
    const cleared = closed.filter((c) => c.determination === "Not Fraudulent (Cleared)").length
    return `${Math.round((cleared / closed.length) * 100)}%`
}

export function formatCurrency(amount: number): string {
    return `£${Math.round(amount).toLocaleString("en-GB")}`
}

export function formatShareSplit(amount?: string): { agency: string; propertyEye: string } | null {
    const n = parseRecoveredAmount(amount)
    if (!amount || n <= 0) return null
    const half = n / 2
    return {
        agency: formatCurrency(half),
        propertyEye: formatCurrency(half),
    }
}

export function deriveAgencyCaseCounts(cases: AgencyCase[]) {
    const closed = cases.filter((c) => c.adminStatus === "Closed")
    return {
        casesFound: cases.length,
        confirmedFraud: closed.filter((c) => c.determination === "Fraudulent (Confirmed)").length,
        cleared: closed.filter((c) => c.determination === "Not Fraudulent (Cleared)").length,
        inProgress: cases.filter((c) => getAgencyCaseDisplayStatus(c.adminStatus) === "In Progress").length,
    }
}
