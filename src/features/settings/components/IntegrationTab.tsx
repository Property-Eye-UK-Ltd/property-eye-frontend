import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IntegrationSettings } from "@/data/settings-data"

interface IntegrationTabProps {
    settings: IntegrationSettings
    onSave: (settings: IntegrationSettings) => void
}

export const IntegrationTab = ({ settings, onSave }: IntegrationTabProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<IntegrationSettings>(settings)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setFormData(settings)
        setIsEditing(false)
    }
    const handleSave = () => {
        onSave(formData)
        setIsEditing(false)
    }

    const handleChange = (field: keyof IntegrationSettings, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <SettingsTabShell
            title="Integration"
            description="Manage your third-party integrations"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                    <Label htmlFor="crmIntegration" className="text-sm font-medium text-foreground">
                        CRM Integration
                    </Label>
                    <Input
                        id="crmIntegration"
                        value={formData.crmIntegration}
                        onChange={(e) => handleChange("crmIntegration", e.target.value)}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="apiKey" className="text-sm font-medium text-foreground">
                        API Key
                    </Label>
                    <Input
                        id="apiKey"
                        type="password"
                        value={formData.apiKey}
                        onChange={(e) => handleChange("apiKey", e.target.value)}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="webhookUrl" className="text-sm font-medium text-foreground">
                        Webhook URL
                    </Label>
                    <Input
                        id="webhookUrl"
                        value={formData.webhookUrl}
                        onChange={(e) => handleChange("webhookUrl", e.target.value)}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>
            </div>
        </SettingsTabShell>
    )
}
