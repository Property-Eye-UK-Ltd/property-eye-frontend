import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import {
  periods,
  metricsData,
  lineChartData,
  chartConfig,
} from "@/data/overviewData"

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Overview"
        filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <DashboardPageContent>
        <MetricCards metrics={metricsData[selectedPeriod]} columns={2} />

        <FraudDetectionPanel
          title="Fraud Detection Growth"
          data={lineChartData}
          config={chartConfig}
          showCategoryFilter={false}
          valueFormatter={(value) => String(value)}
          yAxisTickFormatter={(value) => String(value)}
        />
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default Overview
