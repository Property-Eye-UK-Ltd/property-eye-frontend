import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
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
        filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <DashboardPageContent>
        <MetricCards metrics={metricsData[selectedPeriod]} columns={3} />

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-5 lg:gap-4">
          <CommissionBreakdownPanel
            title="Severity Distribution"
            data={severityData}
            chartSize={220}
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
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default Overview
