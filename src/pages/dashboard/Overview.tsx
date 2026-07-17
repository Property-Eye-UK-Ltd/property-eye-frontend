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
  recoveredEarningsData,
  recoveredEarningsConfig,
} from "@/data/overviewData"
import {
  casesOverTimeData,
  casesOverTimeConfig,
} from "@/data/analytics-data"

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Overview"
        filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <DashboardPageContent className="space-y-4 lg:space-y-6">
        <MetricCards metrics={metricsData[selectedPeriod]} columns={3} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FraudDetectionPanel
            title="Fraud Detection Growth"
            data={lineChartData}
            config={chartConfig}
            showCategoryFilter={false}
            valueFormatter={(value) => String(value)}
            yAxisTickFormatter={(value) => String(value)}
          />

          <FraudDetectionPanel
            title="Recovered Earnings Growth"
            data={recoveredEarningsData}
            config={recoveredEarningsConfig}
            showCategoryFilter={false}
            valueFormatter={(value) => `£${value.toLocaleString()}`}
            yAxisTickFormatter={(value) => `£${value.toLocaleString()}`}
          />
        </div>

        <div className="w-full">
          <FraudDetectionPanel
            title="Cases Over Time"
            data={casesOverTimeData}
            config={casesOverTimeConfig}
            showCategoryFilter={false}
            valueFormatter={(value) => String(value)}
            yAxisTickFormatter={(value) => String(value)}
          />
        </div>
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default Overview
