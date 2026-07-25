import { useState } from "react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillingHistoryTable } from "@/features/adminbilling/components/BillingHistoryTable"
import { CommissionApprovalTable } from "@/features/marketing-admin/finance/components/CommissionApprovalTable"
import { AgencyRecoveriesTable } from "@/features/adminbilling/components/AgencyRecoveriesTable"
import { billingPeriods } from "@/data/adminBillingData"
import { useAdminBillingMetrics, useAdminInvoices } from "@/features/adminbilling/api/useAdminBilling"
import { toBillingMetricCards } from "@/features/adminbilling/api/adminBillingService"
import { useAdminCommissions } from "@/features/adminbilling/api/useAdminCommissions"
import { useAdminAgencyRecoveries } from "@/features/adminbilling/api/useAdminAgencyRecoveries"
import { MetricCard } from "@/features/overview/components/MetricCards"

const formatGbp = (value: number) => `£${value.toLocaleString()}`

const BillingFinance = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(billingPeriods[0])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("billing")

    const { data: billingMetrics } = useAdminBillingMetrics(selectedPeriod)
    const { data: invoicesData } = useAdminInvoices({ search: searchQuery || undefined, page_size: 100 })
    const billingHistory = invoicesData?.items ?? []

    const { data: commissions = [] } = useAdminCommissions()
    const { data: agencyRecoveries = [] } = useAdminAgencyRecoveries()

    const pageTabs = [
        { label: "Subscription Billing", value: "billing" },
        { label: "Marketer Commissions", value: "commissions", count: commissions.filter((c) => c.status === "Pending").length },
        { label: "Agencies Recoveries", value: "agency-recoveries", count: agencyRecoveries.filter((r) => r.status === "Pending").length },
    ]

    const commissionMetrics: MetricCard[] = [
        {
            title: "Commission Liability",
            value: formatGbp(commissions.reduce((sum, c) => sum + c.amount, 0)),
            period: "Earned to date",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Outstanding Commission",
            value: formatGbp(commissions.filter((c) => c.status !== "Paid").reduce((sum, c) => sum + c.amount, 0)),
            period: "Awaiting payout",
            change: "",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Paid",
            value: formatGbp(commissions.filter((c) => c.status === "Paid").reduce((sum, c) => sum + c.amount, 0)),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

    const recoveryMetrics: MetricCard[] = [
        {
            title: "Total Recovery Liability",
            value: formatGbp(agencyRecoveries.reduce((sum, r) => sum + r.amount, 0)),
            period: "Owed to date",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Outstanding",
            value: formatGbp(agencyRecoveries.filter((r) => r.status === "Pending").reduce((sum, r) => sum + r.amount, 0)),
            period: "Awaiting payment",
            change: "",
            topBarClass: "bg-purple-500",
        },
        {
            title: "Paid",
            value: formatGbp(agencyRecoveries.filter((r) => r.status === "Paid").reduce((sum, r) => sum + r.amount, 0)),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

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
                        <MetricCards metrics={commissionMetrics} columns={3} />
                        <CommissionApprovalTable data={commissions} />
                    </>
                )}

                {activeTab === "agency-recoveries" && (
                    <>
                        <MetricCards metrics={recoveryMetrics} columns={3} />
                        <AgencyRecoveriesTable data={agencyRecoveries} />
                    </>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default BillingFinance
