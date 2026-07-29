import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { ProfileTab } from "@/features/settings/components/ProfileTab"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { AccountTab } from "@/features/settings/components/AccountTab"
import { ConfigurationsTab } from "@/features/settings/components/ConfigurationsTab"
import {
    mockProfileSettings,
    mockNotificationSettings,
    ProfileSettings,
    NotificationSettings,
} from "@/data/settings-data"
import { toast } from "sonner"

const AdminSettings = () => {
    const [selectedTab, setSelectedTab] = useState("profile")
    const [profileSettings, setProfileSettings] = useState<ProfileSettings>(mockProfileSettings)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)

    const tabs = [
        { label: "Profile", value: "profile" },
        { label: "Notifications", value: "notifications" },
        { label: "Account", value: "account" },
        { label: "Configurations", value: "configurations" },
    ]

    const handleSaveProfile = (settings: ProfileSettings) => {
        setProfileSettings(settings)
        toast.success("Profile settings saved successfully")
    }

    const handleSaveNotifications = (settings: NotificationSettings) => {
        setNotificationSettings(settings)
        toast.success("Notification settings saved successfully")
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
                {selectedTab === "account" && (
                    <AccountTab />
                )}
                {selectedTab === "configurations" && <ConfigurationsTab />}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default AdminSettings
