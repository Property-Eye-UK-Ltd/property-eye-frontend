export interface AgencyCase {
    id: string
    caseId: string
    propertyAddress: string
    completionDate: string
    buyerName: string
    status: "CHECKED" | ""
    agencyName?: string
}

export const mockAgencyCases: AgencyCase[] = [
    {
        id: "1",
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        completionDate: "15 Aug, 2025",
        buyerName: "Kris Luther",
        status: "CHECKED",
        agencyName: "Solict Homes",
    },
    {
        id: "2",
        caseId: "#367281",
        propertyAddress: "45 Belvoir Drive, Leicester",
        completionDate: "2 Jul, 2025",
        buyerName: "Iverson James",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
    },
    {
        id: "3",
        caseId: "#367282",
        propertyAddress: "12 Church Lane, London",
        completionDate: "18 Jun, 2025",
        buyerName: "Sarah Jenkins",
        status: "",
        agencyName: "Mindcraft Homes",
    },
    {
        id: "4",
        caseId: "#367283",
        propertyAddress: "88 Park Avenue, Manchester",
        completionDate: "9 May, 2025",
        buyerName: "David Wilson",
        status: "CHECKED",
        agencyName: "Dresscket",
    },
    {
        id: "5",
        caseId: "#367284",
        propertyAddress: "15 Station Road, Birmingham",
        completionDate: "30 Apr, 2025",
        buyerName: "Emma Thompson",
        status: "",
        agencyName: "Solict Homes",
    },
    {
        id: "6",
        caseId: "#367285",
        propertyAddress: "29 High Street, Bristol",
        completionDate: "12 Mar, 2025",
        buyerName: "Michael Brown",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
    },
    {
        id: "7",
        caseId: "#367286",
        propertyAddress: "102 Ocean View, Brighton",
        completionDate: "25 Oct, 2025",
        buyerName: "Liam Neeson",
        status: "CHECKED",
        agencyName: "Mindcraft Homes",
    },
    {
        id: "8",
        caseId: "#367287",
        propertyAddress: "14 Abbey Road, London",
        completionDate: "5 Sep, 2025",
        buyerName: "Paul McCartney",
        status: "",
        agencyName: "Dresscket",
    },
    {
        id: "9",
        caseId: "#367288",
        propertyAddress: "56 Castle Street, Edinburgh",
        completionDate: "19 Nov, 2025",
        buyerName: "Sean Connery",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
    },
    {
        id: "10",
        caseId: "#367289",
        propertyAddress: "77 Baker Street, London",
        completionDate: "1 Jan, 2026",
        buyerName: "Sherlock Holmes",
        status: "CHECKED",
        agencyName: "Solict Homes",
    },
    {
        id: "11",
        caseId: "#367290",
        propertyAddress: "12 Victoria Road, Leeds",
        completionDate: "14 Feb, 2025",
        buyerName: "John Doe",
        status: "",
        agencyName: "Baltimore Homes",
    },
    {
        id: "12",
        caseId: "#367291",
        propertyAddress: "34 King Street, Liverpool",
        completionDate: "22 Mar, 2025",
        buyerName: "Jane Smith",
        status: "CHECKED",
        agencyName: "Mindcraft Homes",
    },
    {
        id: "13",
        caseId: "#367292",
        propertyAddress: "90 Queen Road, Glasgow",
        completionDate: "11 Apr, 2025",
        buyerName: "Robert Bruce",
        status: "CHECKED",
        agencyName: "Dresscket",
    },
    {
        id: "14",
        caseId: "#367293",
        propertyAddress: "5 Princes Street, Oxford",
        completionDate: "3 May, 2025",
        buyerName: "Alice Wonderland",
        status: "",
        agencyName: "Solict Homes",
    },
    {
        id: "15",
        caseId: "#367294",
        propertyAddress: "18 Broad Street, Cambridge",
        completionDate: "21 Jun, 2025",
        buyerName: "Isaac Newton",
        status: "CHECKED",
        agencyName: "Baltimore Homes",
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
