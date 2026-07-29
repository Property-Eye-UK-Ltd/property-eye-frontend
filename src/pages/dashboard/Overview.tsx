import { useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { MetricCards, type MetricCard } from "@/features/overview/components/MetricCards"
import { TopPropertiesPanel, type TopProperty } from "@/features/overview/components/TopPropertiesPanel"
import { ActiveAlertsPanel, type AlertRecord } from "@/features/overview/components/ActiveAlertsPanel"
import {
  useHighPriorityAlerts,
  useOverviewSummary,
  useSeverityDistribution,
  useTopRecoveries,
} from "@/features/overview/api/useOverview"

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
  const { data: summary, isLoading: summaryLoading } = useOverviewSummary()
  const { data: severity } = useSeverityDistribution()
  const { data: topRecoveries = [] } = useTopRecoveries()
  const { data: highPriorityAlerts = [] } = useHighPriorityAlerts(1)

  const metrics: MetricCard[] = useMemo(() => {
    if (!summary) return []
    return [
      {
        title: "Total Recoveries",
        value: String(summary.total_recoveries),
        period: "All time",
        change: summary.delta_recoveries ? `+${summary.delta_recoveries}` : "",
        topBarClass: "bg-emerald-500",
      },
      {
        title: "Revenue from Recoveries",
        value: formatCurrency(summary.total_recovery_revenue),
        period: "All time",
        change: "",
        topBarClass: "bg-purple-500",
      },
    ]
  }, [summary])

  const topProperties: TopProperty[] = useMemo(
    () =>
      topRecoveries.map((item) => ({
        name: item.property_address,
        location: item.location,
        recoveredAmount: formatCurrency(item.recovered_amount),
      })),
    [topRecoveries]
  )

  const alerts: AlertRecord[] = useMemo(
    () =>
      highPriorityAlerts.map((item) => ({
        caseId: item.case_id,
        property: item.property_address,
        fraudScore: Math.round(item.fraud_score),
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
      />

      <DashboardPageContent className="space-y-4 lg:space-y-6">
        {summaryLoading ? (
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : (
          <MetricCards metrics={metrics} columns={2} />
        )}

        {severity && (
          <DashboardPanel title="Timing Risk Distribution" description="Days between withdrawal & sale" hasBorder>
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
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default Overview
