import { useState, useEffect } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { NotificationSettings } from "@/data/settings-data"

interface NotificationsTabProps {
    settings: NotificationSettings
    onSave: (settings: NotificationSettings) => void
}

export const NotificationsTab = ({ settings, onSave }: NotificationsTabProps) => {
    const [formData, setFormData] = useState<NotificationSettings>(settings)
    const [hasChanges, setHasChanges] = useState(false)

    // Check if there are any changes
    useEffect(() => {
        const changed =
            formData.emailNotifications !== settings.emailNotifications ||
            formData.smsNotifications !== settings.smsNotifications ||
            formData.pushNotifications !== settings.pushNotifications
        setHasChanges(changed)
    }, [formData, settings])

    const handleSave = () => {
        onSave(formData)
        setHasChanges(false)
    }

    const handleToggle = (field: keyof NotificationSettings) => {
        setFormData({ ...formData, [field]: !formData[field] })
    }

    return (
        <SettingsTabShell
            title="Notifications"
            description="Stay updated by choosing your notification preferences."
            isEditing={false}
            onEdit={() => { }}
            onSave={handleSave}
            onCancel={() => { }}
            useAlternativeCTA={true}
            hasChanges={hasChanges}
        >
            {/* Full width content */}
            <div className="space-y-6">
                {/* Email Notification */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label className="text-sm font-medium text-foreground">Email Notification</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive important updates and activity alerts via email.
                        </p>
                    </div>
                    <Switch
                        checked={formData.emailNotifications}
                        onCheckedChange={() => handleToggle("emailNotifications")}
                        className="shrink-0"
                    />
                </div>

                {/* SMS Notification */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label className="text-sm font-medium text-foreground">SMS Notification</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive critical notifications and reminders via text message.
                        </p>
                    </div>
                    <Switch
                        checked={formData.smsNotifications}
                        onCheckedChange={() => handleToggle("smsNotifications")}
                        className="shrink-0"
                    />
                </div>

                {/* Push Notification */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label className="text-sm font-medium text-foreground">Push Notification</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive instant updates, reminders, and activity notifications
                        </p>
                    </div>
                    <Switch
                        checked={formData.pushNotifications}
                        onCheckedChange={() => handleToggle("pushNotifications")}
                        className="shrink-0"
                    />
                </div>
            </div>
        </SettingsTabShell>
    )
}
