export interface AgencyCase {
    id: string
    caseId: string
    propertyAddress: string
    score: number
    severity: "Critical" | "High" | "Medium" | "Low"
    dateDetected: string
    datePropertySold: string
}

export const mockAgencyCases: AgencyCase[] = [
    {
        id: "1",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 92,
        severity: "Critical",
        dateDetected: "3 Nov, 2025",
        datePropertySold: "15 Aug, 2025",
    },
    {
        id: "2",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
        datePropertySold: "2 Jul, 2025",
    },
    {
        id: "3",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
        datePropertySold: "18 Jun, 2025",
    },
    {
        id: "4",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
        datePropertySold: "9 May, 2025",
    },
    {
        id: "5",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 88,
        severity: "Medium",
        dateDetected: "21 Oct, 2025",
        datePropertySold: "30 Apr, 2025",
    },
    {
        id: "6",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 88,
        severity: "Medium",
        dateDetected: "21 Oct, 2025",
        datePropertySold: "12 Mar, 2025",
    },
    {
        id: "7",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 100,
        severity: "Low",
        dateDetected: "30 Sep, 2025",
        datePropertySold: "28 Feb, 2025",
    },
    {
        id: "8",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 91,
        severity: "Critical",
        dateDetected: "24 Sep, 2025",
        datePropertySold: "15 Jan, 2025",
    },
    {
        id: "9",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        score: 89,
        severity: "High",
        dateDetected: "24 Sep, 2025",
        datePropertySold: "3 Dec, 2024",
    },
]

export const caseSeverityStyles: Record<AgencyCase["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Low: "bg-gray-50 text-gray-600 border border-gray-100",
}

// Still used by CaseOverviewCard in case details views
export const caseFraudTypeStyles: Record<string, string> = {
    "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-100",
    "Private Sale": "bg-orange-50 text-orange-600 border border-orange-100",
    "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-100",
}
