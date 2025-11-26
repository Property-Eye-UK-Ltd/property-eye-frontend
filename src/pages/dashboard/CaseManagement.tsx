import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { CaseListPanel, CaseRecord } from "@/features/cases/components/CaseListPanel"

const periods = ["All Time", "This Month", "Last Week"]

const metrics: MetricCard[] = [
  {
    title: "Total fraud Alerts",
    value: "1,459",
    period: "All time",
    change: "+321",
    topBarClass: "bg-red-500",
  },
  {
    title: "Avg. Fraud Likelihood",
    value: "37%",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-purple-500",
  },
  {
    title: "False Positive Rate",
    value: "47%",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-orange-500",
  },
  {
    title: "Recovery Rate",
    value: "68%",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-green-500",
  },
]

// All cases data - will be filtered by case type
const allCasesData: (CaseRecord & { caseType: "managed" | "self-handled" })[] = [
  // Managed Cases
  {
    caseId: "#367280",
    propertyAddress: "22 Ashfield Road, Leicester",
    fraudType: "Buyer Intro",
    score: 92,
    severity: "Critical",
    dateDetected: "3 Nov, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367281",
    propertyAddress: "45 Piccadilly, Manchester",
    fraudType: "Private Sale",
    score: 88,
    severity: "Low",
    dateDetected: "21 Oct, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367282",
    propertyAddress: "12 High Street, London",
    fraudType: "Dual Agency",
    score: 100,
    severity: "Low",
    dateDetected: "30 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367283",
    propertyAddress: "78 Oxford Road, Birmingham",
    fraudType: "Private Sale",
    score: 91,
    severity: "Critical",
    dateDetected: "24 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367284",
    propertyAddress: "33 King Street, Leeds",
    fraudType: "Dual Agency",
    score: 89,
    severity: "High",
    dateDetected: "24 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367285",
    propertyAddress: "56 Victoria Road, Bristol",
    fraudType: "Buyer Intro",
    score: 85,
    severity: "Medium",
    dateDetected: "15 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367286",
    propertyAddress: "91 Church Lane, Liverpool",
    fraudType: "Private Sale",
    score: 76,
    severity: "Medium",
    dateDetected: "10 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367287",
    propertyAddress: "23 Market Square, Newcastle",
    fraudType: "Buyer Intro",
    score: 94,
    severity: "Critical",
    dateDetected: "5 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367288",
    propertyAddress: "67 Park Avenue, Sheffield",
    fraudType: "Dual Agency",
    score: 82,
    severity: "High",
    dateDetected: "1 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367289",
    propertyAddress: "14 Bridge Street, Edinburgh",
    fraudType: "Private Sale",
    score: 79,
    severity: "Low",
    dateDetected: "28 Aug, 2025",
    caseType: "managed",
  },
  // Self-handled Cases
  {
    caseId: "#367290",
    propertyAddress: "42 Elm Grove, Glasgow",
    fraudType: "Buyer Intro",
    score: 87,
    severity: "High",
    dateDetected: "25 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367291",
    propertyAddress: "19 Queen Street, Cardiff",
    fraudType: "Private Sale",
    score: 73,
    severity: "Medium",
    dateDetected: "20 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367292",
    propertyAddress: "88 Station Road, Nottingham",
    fraudType: "Dual Agency",
    score: 96,
    severity: "Critical",
    dateDetected: "15 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367293",
    propertyAddress: "51 Mill Lane, Derby",
    fraudType: "Buyer Intro",
    score: 81,
    severity: "Medium",
    dateDetected: "10 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367294",
    propertyAddress: "37 Green Street, Plymouth",
    fraudType: "Private Sale",
    score: 68,
    severity: "Low",
    dateDetected: "5 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367295",
    propertyAddress: "62 North Road, Southampton",
    fraudType: "Dual Agency",
    score: 90,
    severity: "High",
    dateDetected: "1 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367296",
    propertyAddress: "29 West End, Brighton",
    fraudType: "Buyer Intro",
    score: 84,
    severity: "Medium",
    dateDetected: "28 Jul, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367297",
    propertyAddress: "75 East Street, Reading",
    fraudType: "Private Sale",
    score: 77,
    severity: "Low",
    dateDetected: "25 Jul, 2025",
    caseType: "self-handled",
  },
]

const getCaseTypeTabs = (allCases: typeof allCasesData) => {
  const managedCount = allCases.filter((c) => c.caseType === "managed").length
  const selfHandledCount = allCases.filter((c) => c.caseType === "self-handled").length
  return [
    { label: "Managed Cases", count: managedCount, value: "managed" },
    { label: "Self-handled Cases", count: selfHandledCount, value: "self-handled" },
  ]
}

const severityStyles: Record<CaseRecord["severity"], string> = {
  Critical: "bg-red-50 text-red-600 border border-red-100",
  High: "bg-orange-50 text-orange-600 border border-orange-100",
  Medium: "bg-amber-50 text-amber-600 border border-amber-100",
  Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

const fraudTypeStyles: Record<CaseRecord["fraudType"], string> = {
  "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-100",
  "Private Sale": "bg-orange-50 text-orange-600 border border-orange-100",
  "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-100",
}

const CaseManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const [selectedCaseType, setSelectedCaseType] = useState("managed")

  const caseTypeTabs = getCaseTypeTabs(allCasesData)
  const filteredCases = allCasesData.filter((c) => c.caseType === selectedCaseType)
  const casesData: CaseRecord[] = filteredCases.map(({ caseType, ...rest }) => rest)

  return (
    <DashboardLayout>
      <PageHeader
        title="Case Management"
        actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
        <MetricCards metrics={metrics} />

        <CaseTypeTabs tabs={caseTypeTabs} selected={selectedCaseType} onSelect={setSelectedCaseType} />

        <CaseListPanel
          data={casesData}
          severityStyles={severityStyles}
          fraudTypeStyles={fraudTypeStyles}
        />
      </div>
    </DashboardLayout>
  )
}

export default CaseManagement

