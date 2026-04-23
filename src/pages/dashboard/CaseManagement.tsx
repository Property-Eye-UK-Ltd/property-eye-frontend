import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
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

  // Filter out the metrics we don't want (False Positive and Recovery Rate)
  const filteredMetrics = metricsData[selectedPeriod].filter(
    m => !["False Positive Rate", "Recovery Rate"].includes(m.title)
  )

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Management"
        actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
        {/* Metric cards (now 2 cards filling the row) */}
        <MetricCards metrics={filteredMetrics} columns={2} />

        {/* Case List Panel (Tabs removed, list is direct) */}
        <CaseListPanel
          data={allCasesData}
        />
      </div>
    </DashboardLayout>
  )
}

export default CaseManagement
