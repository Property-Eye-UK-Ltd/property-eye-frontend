import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { AdminMarketersTable } from "@/features/marketing-admin/network/components/AdminMarketersTable"
import { AdminAgenciesTable } from "@/features/marketing-admin/network/components/AdminAgenciesTable"
import { AttributionQueueTable } from "@/features/marketing-admin/attribution/components/AttributionQueueTable"
import { AdminDisputesTable } from "@/features/marketing-admin/attribution/components/AdminDisputesTable"
import {
    marketingAdminAttributionMetrics,
    adminAgencies,
    marketerLeaderboard,
    attributionClaims,
    adminDisputes,
} from "@/data/marketing-data"

const sectionTabs = [
    { label: "Network", value: "network" },
    { label: "Attribution", value: "attribution", count: attributionClaims.filter((c) => c.status === "Pending" || c.status === "Conflict").length },
]

const networkTabs = [
    { label: "Marketers", value: "marketers", count: marketerLeaderboard.length },
    { label: "Agencies", value: "agencies", count: adminAgencies.length },
]

const attributionTabs = [
    { label: "Attribution Queue", value: "queue", count: attributionClaims.filter((c) => c.status === "Pending" || c.status === "Conflict").length },
    { label: "Disputes", value: "disputes", count: adminDisputes.filter((d) => d.status !== "Resolved").length },
]

const Affiliates = () => {
    const [section, setSection] = useState("network")
    const [networkTab, setNetworkTab] = useState("marketers")
    const [attributionTab, setAttributionTab] = useState("queue")

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Affiliates" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={sectionTabs} selected={section} onSelect={setSection} />

                {section === "network" && (
                    <>
                        <CaseTypeTabs tabs={networkTabs} selected={networkTab} onSelect={setNetworkTab} />
                        {networkTab === "marketers" && <AdminMarketersTable data={marketerLeaderboard} />}
                        {networkTab === "agencies" && <AdminAgenciesTable data={adminAgencies} />}
                    </>
                )}

                {section === "attribution" && (
                    <>
                        <MetricCards metrics={marketingAdminAttributionMetrics} columns={3} />
                        <CaseTypeTabs tabs={attributionTabs} selected={attributionTab} onSelect={setAttributionTab} />
                        {attributionTab === "queue" && <AttributionQueueTable data={attributionClaims} />}
                        {attributionTab === "disputes" && <AdminDisputesTable data={adminDisputes} />}
                    </>
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Affiliates
