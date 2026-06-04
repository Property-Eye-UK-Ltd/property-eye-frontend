import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { CommissionApprovalTable } from "@/features/marketing-admin/finance/components/CommissionApprovalTable"
import { AdminPayoutsTable } from "@/features/marketing-admin/finance/components/AdminPayoutsTable"
import {
    marketingAdminFinanceMetrics,
    commissionLiabilityTrend,
    adminCommissionApprovals,
    adminPayouts,
} from "@/data/marketing-data"

const formatGbp = (value: number) => `£${value.toLocaleString()}`
const formatGbpAxis = (value: number) => `£${Math.round(value / 1000)}k`

const liabilityTrendData = commissionLiabilityTrend.map(({ label, value }) => ({
    month: label,
    paid: Math.round(value * 0.765),
    approved: Math.round(value * 0.162),
    pending: Math.round(value * 0.073),
}))

const liabilityTrendConfig = {
    paid: { label: "Paid", color: "#22C55E" },
    approved: { label: "Approved (Awaiting Payout)", color: "#4D66EA" },
    pending: { label: "Pending Approval", color: "#F59E0B" },
}

const tabs = [
    { label: "Commissions", value: "commissions", count: adminCommissionApprovals.filter((c) => c.status === "Pending").length },
    { label: "Payments", value: "payments", count: adminPayouts.filter((p) => p.status === "Scheduled").length },
]

const MarketingAdminFinance = () => {
    const [activeTab, setActiveTab] = useState("commissions")

    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader
                title="Finance"
                actions={[{ label: "Export", onClick: () => toast.success("Finance export started") }]}
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <MetricCards metrics={marketingAdminFinanceMetrics} columns={3} />

                <FraudDetectionPanel
                    title="Commission Liability Over Time"
                    data={liabilityTrendData}
                    config={liabilityTrendConfig}
                    yAxisDomain={[0, "auto"]}
                    valueFormatter={formatGbp}
                    yAxisTickFormatter={formatGbpAxis}
                />

                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "commissions" && <CommissionApprovalTable data={adminCommissionApprovals} />}
                {activeTab === "payments" && <AdminPayoutsTable data={adminPayouts} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminFinance
