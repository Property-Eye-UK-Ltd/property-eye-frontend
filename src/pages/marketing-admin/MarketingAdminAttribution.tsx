import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { AttributionQueueTable } from "@/features/marketing-admin/attribution/components/AttributionQueueTable"
import { AdminDisputesTable } from "@/features/marketing-admin/attribution/components/AdminDisputesTable"
import {
    marketingAdminAttributionMetrics,
    attributionClaims,
    adminDisputes,
} from "@/data/marketing-data"

const tabs = [
    { label: "Attribution Queue", value: "queue", count: attributionClaims.filter((c) => c.status === "Pending" || c.status === "Conflict").length },
    { label: "Disputes", value: "disputes", count: adminDisputes.filter((d) => d.status !== "Resolved").length },
]

const MarketingAdminAttribution = () => {
    const [activeTab, setActiveTab] = useState("queue")

    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader title="Attribution" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <MetricCards metrics={marketingAdminAttributionMetrics} columns={3} />

                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "queue" && <AttributionQueueTable data={attributionClaims} />}
                {activeTab === "disputes" && <AdminDisputesTable data={adminDisputes} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminAttribution
