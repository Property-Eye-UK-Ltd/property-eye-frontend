import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CaseListPanel } from "@/features/cases/components/CaseListPanel"
import {
  periods,
  metricsData,
  allCasesData,
} from "@/data/caseManagementData"

const CaseManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  const filteredMetrics = metricsData[selectedPeriod].filter(
    (m) => !["False Positive Rate", "Recovery Rate"].includes(m.title)
  )

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Management"
        filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <DashboardPageContent className="space-y-3 lg:space-y-6">
        <MetricCards metrics={filteredMetrics} columns={2} />
        <CaseListPanel data={allCasesData} />
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default CaseManagement
