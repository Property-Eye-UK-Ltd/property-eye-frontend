import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { FraudDetectionPanel } from "@/features/overview/components/FraudDetectionPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillingHistoryTable } from "@/features/adminbilling/components/BillingHistoryTable"
import { CommissionApprovalTable } from "@/features/marketing-admin/finance/components/CommissionApprovalTable"
import { AdminPayoutsTable } from "@/features/marketing-admin/finance/components/AdminPayoutsTable"
import { billingPeriods } from "@/data/adminBillingData"
import { useAdminBillingMetrics, useAdminInvoices } from "@/features/adminbilling/api/useAdminBilling"
import { toBillingMetricCards } from "@/features/adminbilling/api/adminBillingService"
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

const pageTabs = [
    { label: "Subscription Billing", value: "billing" },
    { label: "Marketer Commissions", value: "commissions", count: adminCommissionApprovals.filter((c) => c.status === "Pending").length },
    { label: "Marketer Payouts", value: "payouts", count: adminPayouts.filter((p) => p.status === "Scheduled").length },
]

const BillingFinance = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(billingPeriods[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("billing")

    const { data: billingMetrics } = useAdminBillingMetrics(selectedPeriod)
    const { data: invoicesData } = useAdminInvoices({ search: searchQuery || undefined, page_size: 100 })
    const billingHistory = invoicesData?.items ?? []

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Billing & Finance"
                filters={
                    activeTab === "billing" ? (
                        <PeriodTabs
                            periods={billingPeriods}
                            selected={selectedPeriod}
                            onSelect={setSelectedPeriod}
                        />
                    ) : undefined
                }
                actions={
                    activeTab !== "billing"
                        ? [{ label: "Export", onClick: () => toast.success("Finance export started") }]
                        : undefined
                }
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={pageTabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "billing" && (
                    <>
                        <MetricCards
                            metrics={billingMetrics ? toBillingMetricCards(billingMetrics, selectedPeriod) : []}
                        />
                        <DashboardPanel
                            title="Billing History"
                            description="View and manage all subscription history"
                            noPadding
                            hasBorder
                            actions={
                                <div className="flex flex-nowrap items-center gap-1.5 lg:gap-2">
                                    <div className="relative min-w-[9rem] flex-1 sm:min-w-0 sm:flex-none sm:w-44 lg:w-56">
                                        <SearchNormal
                                            size={16}
                                            variant="Outline"
                                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        />
                                        <Input
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                                        />
                                    </div>
                                    <Button variant="outline" className="h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                                        <Filter size={16} variant="Outline" className="mr-1 lg:mr-2" />
                                        Filter
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm">
                                                Export
                                                <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            }
                        >
                            <BillingHistoryTable data={billingHistory} />
                        </DashboardPanel>
                    </>
                )}

                {activeTab === "commissions" && (
                    <>
                        <MetricCards metrics={marketingAdminFinanceMetrics} columns={3} />
                        <FraudDetectionPanel
                            title="Commission Liability Over Time"
                            data={liabilityTrendData}
                            config={liabilityTrendConfig}
                            yAxisDomain={[0, "auto"]}
                            valueFormatter={formatGbp}
                            yAxisTickFormatter={formatGbpAxis}
                        />
                        <CommissionApprovalTable data={adminCommissionApprovals} />
                    </>
                )}

                {activeTab === "payouts" && <AdminPayoutsTable data={adminPayouts} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default BillingFinance
