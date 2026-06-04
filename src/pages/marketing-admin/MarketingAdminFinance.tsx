import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DonutBreakdownPanel } from "@/features/marketing/components/DonutBreakdownPanel"
import { CommissionApprovalTable } from "@/features/marketing-admin/finance/components/CommissionApprovalTable"
import { AdminPayoutsTable } from "@/features/marketing-admin/finance/components/AdminPayoutsTable"
import {
    marketingAdminFinanceMetrics,
    commissionLiabilityBreakdown,
    adminCommissionApprovals,
    adminPayouts,
} from "@/data/marketing-data"

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

                <DonutBreakdownPanel
                    title="Liability Split"
                    data={commissionLiabilityBreakdown}
                    description="Paid vs approved vs pending across all marketers"
                />

                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "commissions" && <CommissionApprovalTable data={adminCommissionApprovals} />}
                {activeTab === "payments" && <AdminPayoutsTable data={adminPayouts} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminFinance
