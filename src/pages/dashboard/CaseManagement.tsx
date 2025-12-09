import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CaseListPanel, CaseRecord } from "@/features/cases/components/CaseListPanel"
import {
  periods,
  metricsData,
  allCasesData,
  severityStyles,
  fraudTypeStyles,
} from "@/data/caseManagementData"

const getCaseTypeTabs = (allCases: typeof allCasesData) => {
  const managedCount = allCases.filter((c) => c.caseType === "managed").length
  const selfHandledCount = allCases.filter((c) => c.caseType === "self-handled").length
  return [
    { label: "Managed Cases", count: managedCount, value: "managed" },
    { label: "Self-handled Cases", count: selfHandledCount, value: "self-handled" },
  ]
}

const CaseManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const [selectedCaseType, setSelectedCaseType] = useState("managed")

  const caseTypeTabs = getCaseTypeTabs(allCasesData)
  const filteredCases = allCasesData.filter((c) => c.caseType === selectedCaseType)
  const casesData: CaseRecord[] = filteredCases.map(({ caseType, ...rest }) => rest)

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Management"
        actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
        <MetricCards metrics={metricsData[selectedPeriod]} />

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

