import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { ProfileTab } from "@/features/settings/components/ProfileTab"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { IntegrationTab } from "@/features/settings/components/IntegrationTab"
import { SecurityTab } from "@/features/settings/components/SecurityTab"
import { DataRetentionTab } from "@/features/settings/components/DataRetentionTab"
import {
    mockProfileSettings,
    mockNotificationSettings,
    mockIntegrationSettings,
    mockSecuritySettings,
    mockDataRetentionSettings,
    ProfileSettings,
    NotificationSettings,
    IntegrationSettings,
    SecuritySettings,
    DataRetentionSettings,
} from "@/data/settings-data"
import { toast } from "sonner"

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>(mockProfileSettings)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)
    const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>(mockIntegrationSettings)
    const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)
    const [dataRetentionSettings, setDataRetentionSettings] = useState<DataRetentionSettings>(mockDataRetentionSettings)

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Integration", value: "integration" },
        { label: "Security", value: "security" },
        { label: "Data Retention Policy", value: "data-retention" },
    ]

    const handleSaveProfile = (settings: ProfileSettings) => {
        setProfileSettings(settings)
        toast.success("Profile settings saved successfully")
    }

    const handleSaveNotifications = (settings: NotificationSettings) => {
        setNotificationSettings(settings)
        toast.success("Notification settings saved successfully")
    }

    const handleSaveIntegration = (settings: IntegrationSettings) => {
        setIntegrationSettings(settings)
        toast.success("Integration settings saved successfully")
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
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <div className="space-y-6">
                    {/* Settings Tabs */}
                    <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                    {/* Tab Content */}
                    {selectedTab === "profile" && (
                        <ProfileTab settings={profileSettings} onSave={handleSaveProfile} />
                    )}
                    {selectedTab === "notifications" && (
                        <NotificationsTab settings={notificationSettings} onSave={handleSaveNotifications} />
                    )}
                    {selectedTab === "integration" && (
                        <IntegrationTab settings={integrationSettings} onSave={handleSaveIntegration} />
                    )}
                    {selectedTab === "security" && (
                        <SecurityTab settings={securitySettings} onSave={handleSaveSecurity} />
                    )}
                    {selectedTab === "data-retention" && (
                        <DataRetentionTab settings={dataRetentionSettings} onSave={handleSaveDataRetention} />
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Settings
