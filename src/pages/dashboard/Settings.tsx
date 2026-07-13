import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { ProfileTab } from "@/features/settings/components/ProfileTab"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { IntegrationTab } from "@/features/settings/components/IntegrationTab"
import { SecurityTab } from "@/features/settings/components/SecurityTab"
import {
    mockProfileSettings,
    mockNotificationSettings,
    mockSecuritySettings,
    ProfileSettings,
    NotificationSettings,
    SecuritySettings,
} from "@/data/settings-data"
import { toast } from "sonner"

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>(mockProfileSettings)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)
    const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Integration", value: "integration" },
        { label: "Security", value: "security" },
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

    return (
        <DashboardLayout>
            <DynamicPageHeader title="Settings" />
            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === "profile" && (
                    <ProfileTab settings={profileSettings} onSave={handleSaveProfile} />
                )}
                {selectedTab === "notifications" && (
                    <NotificationsTab settings={notificationSettings} onSave={handleSaveNotifications} showTemplates={false} />
                )}
                {selectedTab === "integration" && <IntegrationTab />}
                {selectedTab === "security" && (
                    <SecurityTab settings={securitySettings} onSave={handleSaveSecurity} />
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default Settings
