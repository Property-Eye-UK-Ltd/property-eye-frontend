import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { CommissionBreakdownPanel } from "@/features/overview/components/CommissionBreakdownPanel"
import { TopPropertiesPanel } from "@/features/overview/components/TopPropertiesPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { ActiveAlertsPanel } from "@/features/overview/components/ActiveAlertsPanel"
import {
  periods,
  metricsData,
  topProperties,
  alertsData,
  severityStyles,
  lineChartData,
  chartConfig,
  severityData,
} from "@/data/overviewData"

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Overview"
        actions={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
        <MetricCards metrics={metricsData[selectedPeriod]} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <CommissionBreakdownPanel 
            title="Severity Distribution"
            data={severityData} 
            chartSize={220} 
            isWide={false}
          />
          <TopPropertiesPanel properties={topProperties} />
        </div>

        <FraudDetectionPanel 
            title="Fraud Detection Growth"
            data={lineChartData} 
            config={chartConfig} 
            showCategoryFilter={false}
        />

        <ActiveAlertsPanel data={alertsData} severityStyles={severityStyles} />
      </div>
    </DashboardLayout>
  )
}

export default Overview
