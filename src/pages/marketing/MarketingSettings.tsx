import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { SettingsTabs } from "@/features/settings/components/SettingsTabs"
import { NotificationsTab } from "@/features/settings/components/NotificationsTab"
import { mockNotificationSettings, NotificationSettings } from "@/data/settings-data"
import { toast } from "sonner"

const MarketingSettings = () => {
    const [selectedTab, setSelectedTab] = useState("notifications")
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)

    const tabs = [{ label: "Notifications", value: "notifications" }]

    const handleSaveNotifications = (settings: NotificationSettings) => {
        setNotificationSettings(settings)
        toast.success("Notification settings saved successfully")
    }

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="Settings" />
            <DashboardPageContent className="space-y-4 lg:space-y-6">
                <SettingsTabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
                {selectedTab === "notifications" && (
                    <NotificationsTab
                        settings={notificationSettings}
                        onSave={handleSaveNotifications}
                        showTemplates={false}
                    />
                )}
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingSettings
