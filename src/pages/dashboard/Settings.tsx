import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { AgencyProfileTab } from "@/features/settings/components/AgencyProfileTab"
import { AgencyNotificationsTab } from "@/features/settings/components/AgencyNotificationsTab"
import { SecurityTab } from "@/features/settings/components/SecurityTab"
import { AccountTab } from "@/features/settings/components/AccountTab"

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Security", value: "security" },
        { label: "Account", value: "account" },
    ]

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Settings" />
            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === "profile" && <AgencyProfileTab />}
                {selectedTab === "notifications" && <AgencyNotificationsTab />}
                {selectedTab === "security" && <SecurityTab />}
                {selectedTab === "account" && <AccountTab />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Settings
