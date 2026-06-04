import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { AdminMarketersTable } from "@/features/marketing-admin/network/components/AdminMarketersTable"
import { AdminAgenciesTable } from "@/features/marketing-admin/network/components/AdminAgenciesTable"
import { adminAgencies, marketerLeaderboard } from "@/data/marketing-data"

const tabs = [
    { label: "Marketers", value: "marketers", count: marketerLeaderboard.length },
    { label: "Agencies", value: "agencies", count: adminAgencies.length },
]

const MarketingAdminNetwork = () => {
    const [activeTab, setActiveTab] = useState("marketers")

    return (
        <DashboardLayout variant="marketing-admin">
            <DynamicPageHeader title="Network" />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <CaseTypeTabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} />

                {activeTab === "marketers" && <AdminMarketersTable data={marketerLeaderboard} />}
                {activeTab === "agencies" && <AdminAgenciesTable data={adminAgencies} />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAdminNetwork
