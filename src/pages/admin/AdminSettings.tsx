import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { ProfileTab } from "@/features/settings/components/ProfileTab"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { AccountTab } from "@/features/settings/components/AccountTab"
import { AutomationTab } from "@/features/settings/components/AutomationTab"
import { DataRetentionTab } from "@/features/settings/components/DataRetentionTab"
import {
    mockProfileSettings,
    mockNotificationSettings,
    mockDataRetentionSettings,
    ProfileSettings,
    NotificationSettings,
    DataRetentionSettings,
} from "@/data/settings-data"
import { toast } from "sonner"

const AdminSettings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>(mockProfileSettings)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)
    const [dataRetentionSettings, setDataRetentionSettings] = useState<DataRetentionSettings>(mockDataRetentionSettings)

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Scheduling", value: "scheduling" },
        { label: "Account", value: "account" },
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

    const handleSaveDataRetention = (settings: DataRetentionSettings) => {
        setDataRetentionSettings(settings)
        toast.success("Data retention settings saved successfully")
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader title="Settings" />
            <DashboardPageContent className="space-y-3 lg:space-y-6">
                <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === "profile" && (
                    <ProfileTab settings={profileSettings} onSave={handleSaveProfile} isSuperAdmin={true} />
                )}
                {selectedTab === "notifications" && (
                    <NotificationsTab settings={notificationSettings} onSave={handleSaveNotifications} showTemplates={false} />
                )}
                {selectedTab === "scheduling" && <AutomationTab />}
                {selectedTab === "account" && (
                    <AccountTab />
                )}
                {selectedTab === "data-retention" && (
                    <DataRetentionTab settings={dataRetentionSettings} onSave={handleSaveDataRetention} />
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminSettings
