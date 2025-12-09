import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PeriodTabs } from "@/components/dashboard/PeriodTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillingHistoryTable } from "@/features/adminbilling/components/BillingHistoryTable"
import { mockBillingTransactions, billingMetricsData, billingPeriods } from "@/data/adminBillingData"

const BillingFinance = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(billingPeriods[0])
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTransactions = mockBillingTransactions.filter(
        (t) =>
            t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.agencyName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Billing & Finance"
                actions={<PeriodTabs periods={billingPeriods} selected={selectedPeriod} onSelect={setSelectedPeriod} />}
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={billingMetricsData[selectedPeriod]} />

                {/* Billing History Panel */}
                <DashboardPanel
                    title="Billing History"
                    description="View and manage all subscription history"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <SearchNormal
                                    size={18}
                                    variant="Outline"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64 rounded-full border-border bg-background pl-10 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>

                            {/* Filter Button */}
                            <Button
                                variant="outline"
                                className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Filter size={18} variant="Outline" className="mr-2" />
                                Filter
                            </Button>

                            {/* Export Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Export
                                        <ArrowDown2 size={18} variant="Outline" className="ml-2" />
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
                    <BillingHistoryTable data={filteredTransactions} />
                </DashboardPanel>
            </div>
        </DashboardLayout>
    )
}

export default BillingFinance
