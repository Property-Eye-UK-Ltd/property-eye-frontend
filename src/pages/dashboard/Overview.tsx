import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards, type MetricCard } from "@/features/overview/components/MetricCards"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { TopPropertiesPanel, type TopProperty } from "@/features/overview/components/TopPropertiesPanel"
import { ActiveAlertsPanel, type AlertRecord } from "@/features/overview/components/ActiveAlertsPanel"
import {
  useFraudDetectionGrowth,
  useHighPriorityAlerts,
  useOverviewSummary,
  useSeverityDistribution,
  useTopRecoveries,
} from "@/features/overview/api/useOverview"
import type { OverviewPeriod } from "@/features/overview/api/overviewService"

const periods = ["All Time", "First Half of Year", "Second Half of Year"]

const periodToApiParam: Record<string, OverviewPeriod> = {
  "All Time": "all_time",
  "First Half of Year": "h1",
  "Second Half of Year": "h2",
}

const severityStyles: Record<AlertRecord["severity"], string> = {
  Critical: "bg-red-500/10 text-red-600",
  High: "bg-orange-500/10 text-orange-600",
  Medium: "bg-yellow-500/10 text-yellow-700",
  Low: "bg-muted text-muted-foreground",
}

const toTitleCaseSeverity = (severity: string): AlertRecord["severity"] => {
  const normalized = severity.toUpperCase()
  if (normalized === "CRITICAL") return "Critical"
  if (normalized === "HIGH") return "High"
  if (normalized === "MEDIUM") return "Medium"
  return "Low"
}

const formatCurrency = (value: number): string =>
  `£${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])
  const apiPeriod = periodToApiParam[selectedPeriod]

  const { data: summary, isLoading: summaryLoading } = useOverviewSummary(apiPeriod)
  const { data: severity } = useSeverityDistribution(apiPeriod)
  const { data: topRecoveries = [] } = useTopRecoveries()
  const { data: highPriorityAlerts = [] } = useHighPriorityAlerts(1, apiPeriod)
  const { data: growthPoints = [], isLoading: growthLoading } = useFraudDetectionGrowth()

  const metrics: MetricCard[] = useMemo(() => {
    if (!summary) return []
    return [
      {
        title: "Total Fraud Alerts",
        value: String(summary.total_fraud_alerts),
        period: selectedPeriod,
        change: summary.delta_fraud_alerts ? `+${summary.delta_fraud_alerts}` : "",
        topBarClass: "bg-red-500",
      },
      {
        title: "Total Recoveries",
        value: String(summary.total_recoveries),
        period: selectedPeriod,
        change: summary.delta_recoveries ? `+${summary.delta_recoveries}` : "",
        topBarClass: "bg-emerald-500",
      },
      {
        title: "Total Checks",
        value: String(summary.total_checks),
        period: selectedPeriod,
        change: summary.delta_checks ? `+${summary.delta_checks}` : "",
        topBarClass: "bg-purple-500",
      },
    ]
  }, [summary, selectedPeriod])

  const topProperties: TopProperty[] = useMemo(
    () =>
      topRecoveries.map((item) => ({
        name: item.property_address,
        location: item.location,
        commission: formatCurrency(item.commission_amount),
      })),
    [topRecoveries]
  )

  const alerts: AlertRecord[] = useMemo(
    () =>
      highPriorityAlerts.map((item) => ({
        caseId: item.case_id,
        property: item.property_address,
        fraudScore: Math.round(item.fraud_score),
        type: item.fraud_type,
        severity: toTitleCaseSeverity(item.severity),
        dateDetected: new Date(item.date_detected).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      })),
    [highPriorityAlerts]
  )

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Overview"
        filters={<PeriodTabs periods={periods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
      />

      <DashboardPageContent className="space-y-4 lg:space-y-6">
        {summaryLoading ? (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <MetricCards metrics={metrics} columns={3} />
        )}

        {severity && (
          <DashboardPanel title="Severity Distribution" hasBorder>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["Low", severity.low, "bg-muted-foreground/40"],
                  ["Medium", severity.medium, "bg-yellow-500"],
                  ["High", severity.high, "bg-orange-500"],
                  ["Critical", severity.critical, "bg-red-500"],
                ] as const
              ).map(([label, value, dotClass]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="ml-auto text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>
        )}

        {topProperties.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TopPropertiesPanel properties={topProperties} />
          </div>
        )}

        {alerts.length > 0 && <ActiveAlertsPanel data={alerts} severityStyles={severityStyles} />}

        <div className="w-full">
          {growthLoading ? (
            <div className="h-[280px] animate-pulse rounded-xl bg-muted" />
          ) : growthPoints.length > 0 ? (
            <FraudDetectionPanel
              title="Fraud Detection Growth"
              data={growthPoints.map((p) => ({ month: p.period_label, rate: p.count }))}
              config={{ rate: { label: "Detections", color: "#00072C" } }}
              showCategoryFilter={false}
              valueFormatter={(value) => String(value)}
              yAxisTickFormatter={(value) => String(value)}
            />
          ) : (
            <DashboardPanel title="Fraud Detection Growth" hasBorder>
              <div className="flex h-[200px] flex-col items-center justify-center gap-1 text-center">
                <p className="text-sm font-medium text-foreground">Coming soon</p>
                <p className="text-xs text-muted-foreground">
                  Trend data for fraud detection growth is not available yet.
                </p>
              </div>
            </DashboardPanel>
          )}
        </div>
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default Overview
