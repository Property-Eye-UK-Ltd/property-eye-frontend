import { MetricCard } from "@/features/overview/components/MetricCards"

export const periods = ["All Time", "This Month", "Last Week"]

export const metricsData: Record<string, MetricCard[]> = {
    "All Time": [
        { title: "Total Fraud Alerts", value: "1,459", period: "All time", change: "+321", topBarClass: "bg-red-500" },
        { title: "Avg. Fraud Likelihood", value: "37%", period: "All time", change: "+2%", topBarClass: "bg-purple-500" },
        { title: "False Positive Rate", value: "47%", period: "All time", change: "+2%", topBarClass: "bg-orange-500" },
        { title: "Recovery Rate", value: "68%", period: "All time", change: "+2%", topBarClass: "bg-green-500" },
    ],
    "This Month": [
        { title: "Total Fraud Alerts", value: "155", period: "This Month", change: "+21", topBarClass: "bg-red-500" },
        { title: "Avg. Fraud Likelihood", value: "35%", period: "This Month", change: "-1%", topBarClass: "bg-purple-500" },
        { title: "False Positive Rate", value: "45%", period: "This Month", change: "-2%", topBarClass: "bg-orange-500" },
        { title: "Recovery Rate", value: "70%", period: "This Month", change: "+4%", topBarClass: "bg-green-500" },
    ],
    "Last Week": [
        { title: "Total Fraud Alerts", value: "38", period: "Last Week", change: "-5", topBarClass: "bg-red-500" },
        { title: "Avg. Fraud Likelihood", value: "33%", period: "Last Week", change: "-4%", topBarClass: "bg-purple-500" },
        { title: "False Positive Rate", value: "42%", period: "Last Week", change: "-5%", topBarClass: "bg-orange-500" },
        { title: "Recovery Rate", value: "72%", period: "Last Week", change: "+4%", topBarClass: "bg-green-500" },
    ],
}

export interface CaseRecord {
    caseId: string
    propertyAddress: string
    completionDate: string
    buyerName: string
    status: "Checked" | "Pending"
}

export const allCasesData: CaseRecord[] = [
    {
        caseId: "#367280",
        propertyAddress: "22 Ashfield Road, Leicester",
        completionDate: "3 Nov, 2025",
        buyerName: "Sarah Jenkins",
        status: "Checked",
    },
    {
        caseId: "#367281",
        propertyAddress: "45 Piccadilly, Manchester",
        completionDate: "21 Oct, 2025",
        buyerName: "Michael Thorne",
        status: "Pending",
    },
    {
        caseId: "#367282",
        propertyAddress: "12 High Street, London",
        completionDate: "30 Sep, 2025",
        buyerName: "Eleanor Rigby",
        status: "Checked",
    },
    {
        caseId: "#367283",
        propertyAddress: "78 Oxford Road, Birmingham",
        completionDate: "24 Sep, 2025",
        buyerName: "James Watson",
        status: "Checked",
    },
    {
        caseId: "#367284",
        propertyAddress: "33 King Street, Leeds",
        completionDate: "24 Sep, 2025",
        buyerName: "Linda Croft",
        status: "Pending",
    },
    {
        caseId: "#367285",
        propertyAddress: "56 Victoria Road, Bristol",
        completionDate: "15 Sep, 2025",
        buyerName: "Peter Parker",
        status: "Checked",
    },
    {
        caseId: "#367286",
        propertyAddress: "91 Church Lane, Liverpool",
        completionDate: "10 Sep, 2025",
        buyerName: "Mary Jane",
        status: "Pending",
    },
    {
        caseId: "#367287",
        propertyAddress: "23 Market Square, Newcastle",
        completionDate: "5 Sep, 2025",
        buyerName: "Gwen Stacy",
        status: "Checked",
    },
    {
        caseId: "#367288",
        propertyAddress: "67 Park Avenue, Sheffield",
        completionDate: "1 Sep, 2025",
        buyerName: "Harry Osborn",
        status: "Checked",
    },
    {
        caseId: "#367289",
        propertyAddress: "14 Bridge Street, Edinburgh",
        completionDate: "28 Aug, 2025",
        buyerName: "Norman Osborn",
        status: "Pending",
    },
    {
        caseId: "#367290",
        propertyAddress: "42 Elm Grove, Glasgow",
        completionDate: "25 Aug, 2025",
        buyerName: "Bruce Wayne",
        status: "Checked",
    },
    {
        caseId: "#367291",
        propertyAddress: "19 Queen Street, Cardiff",
        completionDate: "20 Aug, 2025",
        buyerName: "Clark Kent",
        status: "Pending",
    },
]
