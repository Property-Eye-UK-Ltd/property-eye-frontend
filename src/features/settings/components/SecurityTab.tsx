import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecuritySettings } from "@/data/settings-data"

interface SecurityTabProps {
    settings: SecuritySettings
    onSave: (settings: SecuritySettings) => void
}

export const SecurityTab = ({ settings, onSave }: SecurityTabProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<SecuritySettings>(settings)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setFormData(settings)
        setIsEditing(false)
    }
    const handleSave = () => {
        onSave(formData)
        setIsEditing(false)
    }

    const handleToggle = (field: keyof SecuritySettings) => {
        setFormData({ ...formData, [field]: !formData[field] })
    }

    const handleChange = (field: keyof SecuritySettings, value: number) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <SettingsTabShell
            title="Security"
            description="Manage your security settings"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-sm font-medium text-foreground">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch
                        checked={formData.twoFactorAuth}
                        onCheckedChange={() => handleToggle("twoFactorAuth")}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-sm font-medium text-foreground">
                        Session Timeout (minutes)
                    </Label>
                    <Input
                        id="sessionTimeout"
                        type="number"
                        value={formData.sessionTimeout}
                        onChange={(e) => handleChange("sessionTimeout", parseInt(e.target.value))}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="passwordExpiry" className="text-sm font-medium text-foreground">
                        Password Expiry (days)
                    </Label>
                    <Input
                        id="passwordExpiry"
                        type="number"
                        value={formData.passwordExpiry}
                        onChange={(e) => handleChange("passwordExpiry", parseInt(e.target.value))}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>
            </div>
        </SettingsTabShell>
    )
}
