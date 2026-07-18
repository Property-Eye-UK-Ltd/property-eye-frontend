import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { CaseListPanel } from "@/features/cases/components/CaseListPanel"
import { useCasesSummary } from "@/features/cases/api/useCases"

const CaseManagement = () => {
  const { data: summary, isLoading } = useCasesSummary()

  const metrics: MetricCard[] = [
    {
      title: "Total Fraud Alerts",
      value: isLoading ? "-" : String(summary?.total_fraud_alerts ?? 0),
      period: "All time",
      change: "",
      topBarClass: "bg-blue-500",
    },
    {
      title: "Avg. Fraud Likelihood",
      value: isLoading ? "-" : `${(summary?.avg_fraud_likelihood ?? 0).toFixed(1)}%`,
      period: "All time",
      change: "",
      topBarClass: "bg-orange-500",
    },
  ]

  return (
    <DashboardLayout>
      <DynamicPageHeader title="Case Management" />

      <DashboardPageContent className="space-y-3 lg:space-y-6">
        <MetricCards metrics={metrics} columns={2} />
        <CaseListPanel />
      </DashboardPageContent>
    </DashboardLayout>
  )
}

export default CaseManagement
