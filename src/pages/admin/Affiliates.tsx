import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { AdminMarketersTable } from "@/features/marketing-admin/network/components/AdminMarketersTable"
import { AttributionQueueTable } from "@/features/marketing-admin/attribution/components/AttributionQueueTable"
import { useAdminMarketers } from "@/features/marketing-admin/network/api/useAdminMarketers"
import { useAdminAttributions } from "@/features/marketing-admin/attribution/api/useAdminAttributions"
import { MetricCard } from "@/features/overview/components/MetricCards"

const Affiliates = () => {
    const [activeTab, setActiveTab] = useState("marketers")
    // Only fetch data for the active tab
    const { data: marketers = [], isLoading: isLoadingMarketers } = useAdminMarketers(
        { enabled: activeTab === "marketers" }
    )
    const { data: attributions = [] } = useAdminAttributions(
        undefined,
        { enabled: activeTab === "attribution" }
    )

    const pendingAttributions = attributions.filter((a) => a.status === "pending" || a.status === "locked").length

    // Tabs without counts to avoid forcing all data loads
    const tabs = [
        { label: "Marketers", value: "marketers" },
        { label: "Attribution", value: "attribution" },
    ]

    const attributionMetrics: MetricCard[] = [
        {
            title: "Pending Claims",
            value: String(attributions.filter((a) => a.status === "pending").length),
            period: "Awaiting decision",
            change: "",
            topBarClass: "bg-amber-500",
        },
        {
            title: "Conflicts",
            value: String(attributions.filter((a) => a.has_conflict).length),
            period: "Needs review",
            change: "",
            topBarClass: "bg-red-500",
        },
        {
            title: "Approved",
            value: String(attributions.filter((a) => a.status === "approved").length),
            period: "All time",
            change: "",
            topBarClass: "bg-green-500",
        },
    ]

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Affiliates" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "marketers" && (
                    <AdminMarketersTable data={marketers} isLoading={isLoadingMarketers} />
                )}

                {activeTab === "attribution" && (
                    <>
                        <MetricCards metrics={attributionMetrics} columns={3} />
                        <AttributionQueueTable data={attributions} />
                    </>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Affiliates
