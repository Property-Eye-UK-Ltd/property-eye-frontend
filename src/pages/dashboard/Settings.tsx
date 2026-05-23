import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { ProfileTab } from "@/features/settings/components/ProfileTab"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { IntegrationTab } from "@/features/settings/components/IntegrationTab"
import { AutomationTab } from "@/features/settings/components/AutomationTab"
import { SecurityTab } from "@/features/settings/components/SecurityTab"
import { DataRetentionTab } from "@/features/settings/components/DataRetentionTab"
import {
    mockProfileSettings,
    mockNotificationSettings,
    mockSecuritySettings,
    mockDataRetentionSettings,
    ProfileSettings,
    NotificationSettings,
    SecuritySettings,
    DataRetentionSettings,
} from "@/data/settings-data"
import { toast } from "sonner"

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>(mockProfileSettings)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)
    const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)
    const [dataRetentionSettings, setDataRetentionSettings] = useState<DataRetentionSettings>(mockDataRetentionSettings)

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Scheduling", value: "automation" },
        { label: "Integration", value: "integration" },
        { label: "Security", value: "security" },
        { label: "Data Retention", value: "data-retention" },
    ]

    const handleSaveProfile = (settings: ProfileSettings) => {
        setProfileSettings(settings)
        toast.success("Profile settings saved successfully")
    }

    const handleSaveNotifications = (settings: NotificationSettings) => {
        setNotificationSettings(settings)
        toast.success("Notification settings saved successfully")
    }

    const handleSaveSecurity = (settings: SecuritySettings) => {
        setSecuritySettings(settings)
        toast.success("Security settings saved successfully")
    }

    const handleSaveDataRetention = (settings: DataRetentionSettings) => {
        setDataRetentionSettings(settings)
        toast.success("Data retention settings saved successfully")
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Settings" />
            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === "profile" && (
                    <ProfileTab settings={profileSettings} onSave={handleSaveProfile} />
                )}
                {selectedTab === "notifications" && (
                    <NotificationsTab settings={notificationSettings} onSave={handleSaveNotifications} />
                )}
                {selectedTab === "automation" && <AutomationTab />}
                {selectedTab === "integration" && <IntegrationTab />}
                {selectedTab === "security" && (
                    <SecurityTab settings={securitySettings} onSave={handleSaveSecurity} />
                )}
                {selectedTab === "data-retention" && (
                    <DataRetentionTab settings={dataRetentionSettings} onSave={handleSaveDataRetention} />
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Settings
