import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseListPanel } from "@/features/cases/components/CaseListPanel"
import { useCasesSummary } from "@/features/cases/api/useCases"
import { useSeverityDistribution } from "@/features/overview/api/useOverview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const CaseManagement = () => {
  const { data: summary, isLoading: summaryLoading } = useCasesSummary()
  const { data: severity, isLoading: severityLoading } = useSeverityDistribution()

  const totalAlerts = summary?.total_fraud_alerts ?? 0

  // Calculate total for severity
  const severityTotal = (severity?.low ?? 0) + (severity?.medium ?? 0) + (severity?.high ?? 0) + (severity?.critical ?? 0)

  return (
    <DashboardLayout>
      <DynamicPageHeader title="Case Management" />

      <DashboardPageContent className="space-y-3 lg:space-y-6">
        <div className="grid gap-3 lg:gap-4 grid-cols-1 md:grid-cols-2">
          {/* Card 1: Flagged Cases */}
          <Card className="relative overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />
            <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
              <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                Flagged Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0 flex flex-col justify-between h-[80px]">
              <div className="space-y-1.5 lg:space-y-2">
                <div className="text-xl font-medium text-foreground lg:text-3xl">
                  {summaryLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    totalAlerts
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px] lg:text-xs">
                  <span className="text-muted-foreground">All time</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Severity Distribution */}
          <Card className="relative overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-orange-500" />
            <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
              <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                Timing Risk Distribution
                <span className="ml-1.5 text-[10px] font-normal normal-case text-muted-foreground/70">days between withdrawal &amp; sale</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0 flex flex-col justify-between min-h-[80px]">
              {severityLoading || !severity ? (
                <div className="h-10 animate-pulse bg-muted rounded-full w-full" />
              ) : (
                <div className="space-y-3.5 w-full">
                  {/* Stacked distribution bar */}
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    {severity.critical > 0 && (
                      <div
                        className="h-full bg-red-500 transition-all duration-500 hover:brightness-95"
                        style={{ width: `${(severity.critical / (severityTotal || 1)) * 100}%` }}
                        title={`Critical: ${severity.critical}`}
                      />
                    )}
                    {severity.high > 0 && (
                      <div
                        className="h-full bg-orange-500 transition-all duration-500 hover:brightness-95"
                        style={{ width: `${(severity.high / (severityTotal || 1)) * 100}%` }}
                        title={`High: ${severity.high}`}
                      />
                    )}
                    {severity.medium > 0 && (
                      <div
                        className="h-full bg-yellow-500 transition-all duration-500 hover:brightness-95"
                        style={{ width: `${(severity.medium / (severityTotal || 1)) * 100}%` }}
                        title={`Medium: ${severity.medium}`}
                      />
                    )}
                    {severity.low > 0 && (
                      <div
                        className="h-full bg-slate-400 transition-all duration-500 hover:brightness-95"
                        style={{ width: `${(severity.low / (severityTotal || 1)) * 100}%` }}
                        title={`Low: ${severity.low}`}
                      />
                    )}
                  </div>

                  {/* Legend Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { label: "Critical", count: severity.critical, dotClass: "bg-red-500", textClass: "text-red-600 dark:text-red-400" },
                      { label: "High", count: severity.high, dotClass: "bg-orange-500", textClass: "text-orange-600 dark:text-orange-400" },
                      { label: "Medium", count: severity.medium, dotClass: "bg-yellow-500", textClass: "text-yellow-600 dark:text-yellow-400" },
                      { label: "Low", count: severity.low, dotClass: "bg-slate-400", textClass: "text-slate-500 dark:text-slate-400" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-0.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <span className={cn("h-2 w-2 shrink-0 rounded-full", item.dotClass)} />
                        <span className="text-[11px] font-medium text-muted-foreground lg:text-xs">
                          {item.label}
                        </span>
                        <span className={cn("ml-auto text-xs font-semibold lg:text-sm", item.count > 0 ? item.textClass : "text-muted-foreground/60")}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <CaseListPanel />
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default CaseManagement
