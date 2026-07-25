import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { AdminMarketersTable } from "@/features/marketing-admin/network/components/AdminMarketersTable"
import { AdminAgenciesTable } from "@/features/marketing-admin/network/components/AdminAgenciesTable"
import { AttributionQueueTable } from "@/features/marketing-admin/attribution/components/AttributionQueueTable"
import { useAdminMarketers } from "@/features/marketing-admin/network/api/useAdminMarketers"
import {
    marketingAdminAttributionMetrics,
    adminAgencies,
    attributionClaims,
} from "@/data/marketing-data"

const pendingAttributions = attributionClaims.filter((c) => c.status === "Pending" || c.status === "Conflict").length

const Affiliates = () => {
    const [activeTab, setActiveTab] = useState("marketers")
    const { data: marketers = [], isLoading: isLoadingMarketers } = useAdminMarketers()

    const tabs = [
        { label: "Marketers", value: "marketers", count: marketers.length },
        { label: "Agencies", value: "agencies", count: adminAgencies.length },
        { label: "Attribution", value: "attribution", count: pendingAttributions },
    ]

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Affiliates" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "marketers" && (
                    <AdminMarketersTable data={marketers} isLoading={isLoadingMarketers} />
                )}

                {activeTab === "agencies" && <AdminAgenciesTable data={adminAgencies} />}

                {activeTab === "attribution" && (
                    <>
                        <MetricCards metrics={marketingAdminAttributionMetrics} columns={3} />
                        <AttributionQueueTable data={attributionClaims} />
                    </>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Affiliates
