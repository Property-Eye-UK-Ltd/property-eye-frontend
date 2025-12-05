export interface AgencyCase {
    id: string
    caseId: string
    propertyAddress: string
    fraudType: "Buyer Intro" | "Private Sale" | "Dual Agency"
    score: number
    severity: "Critical" | "High" | "Medium" | "Low"
    dateDetected: string
}

export const mockAgencyCases: AgencyCase[] = [
    {
        id: "1",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Buyer Intro",
        score: 92,
        severity: "Critical",
        dateDetected: "3 Nov, 2025",
    },
    {
        id: "2",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Private Sale",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
    },
    {
        id: "3",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Buyer Intro",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
    },
    {
        id: "4",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Dual Agency",
        score: 88,
        severity: "Low",
        dateDetected: "21 Oct, 2025",
    },
    {
        id: "5",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Private Sale",
        score: 88,
        severity: "Medium",
        dateDetected: "21 Oct, 2025",
    },
    {
        id: "6",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Buyer Intro",
        score: 88,
        severity: "Medium",
        dateDetected: "21 Oct, 2025",
    },
    {
        id: "7",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Private Sale",
        score: 100,
        severity: "Low",
        dateDetected: "30 Sep, 2025",
    },
    {
        id: "8",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Dual Agency",
        score: 91,
        severity: "Critical",
        dateDetected: "24 Sep, 2025",
    },
    {
        id: "9",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        fraudType: "Dual Agency",
        score: 89,
        severity: "High",
        dateDetected: "24 Sep, 2025",
    },
]

export const caseSeverityStyles: Record<AgencyCase["severity"], string> = {
    Critical: "bg-red-50 text-red-600 border border-red-100",
    High: "bg-orange-50 text-orange-600 border border-orange-100",
    Medium: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Low: "bg-gray-50 text-gray-600 border border-gray-100",
}

export const caseFraudTypeStyles: Record<AgencyCase["fraudType"], string> = {
    "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-100",
    "Private Sale": "bg-orange-50 text-orange-600 border border-orange-100",
    "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-100",
}
