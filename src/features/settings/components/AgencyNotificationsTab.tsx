import { useEffect, useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import * as settingsService from "@/features/settings/api/settingsService"
import { extractErrorMessage } from "@/features/auth/authErrors"
import type { SettingsNotificationsResponse } from "@/types/settings.types"

const DEFAULT_NOTIFICATIONS: SettingsNotificationsResponse = {
    email_enabled: false,
    sms_enabled: false,
    push_enabled: false,
}

export const AgencyNotificationsTab = () => {
    const { toast } = useToast()
    const [settings, setSettings] = useState<SettingsNotificationsResponse>(DEFAULT_NOTIFICATIONS)
    const [formData, setFormData] = useState<SettingsNotificationsResponse>(DEFAULT_NOTIFICATIONS)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await settingsService.getNotificationSettings()
                setSettings(data)
                setFormData(data)
            } catch (error) {
                toast({
                    title: "Could not load notification settings",
                    description: extractErrorMessage(error, "Something went wrong. Please try again."),
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const hasChanges =
        formData.email_enabled !== settings.email_enabled

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const updated = await settingsService.updateNotificationSettings({
                email_enabled: formData.email_enabled,
                sms_enabled: formData.sms_enabled,
                push_enabled: formData.push_enabled,
            })
            setSettings(updated)
            setFormData(updated)
            toast({ title: "Notification settings saved" })
        } catch (error) {
            toast({
                title: "Could not save notification settings",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleToggle = (field: keyof SettingsNotificationsResponse) => {
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
            hasChanges={hasChanges && !isLoading}
            saveButtonText={isSaving ? "Saving..." : "Save"}
        >
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
                        checked={formData.email_enabled}
                        onCheckedChange={() => handleToggle("email_enabled")}
                        disabled={isLoading}
                        className="shrink-0"
                    />
                </div>
            </div>
        </SettingsTabShell>
    )
}
