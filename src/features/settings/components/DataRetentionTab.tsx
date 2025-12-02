import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DataRetentionSettings } from "@/data/settings-data"

interface DataRetentionTabProps {
    settings: DataRetentionSettings
    onSave: (settings: DataRetentionSettings) => void
}

export const DataRetentionTab = ({ settings, onSave }: DataRetentionTabProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<DataRetentionSettings>(settings)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setFormData(settings)
        setIsEditing(false)
    }
    const handleSave = () => {
        onSave(formData)
        setIsEditing(false)
    }

    const handleToggle = (field: keyof DataRetentionSettings) => {
        setFormData({ ...formData, [field]: !formData[field] })
    }

    const handleChange = (field: keyof DataRetentionSettings, value: number | string) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <SettingsTabShell
            title="Data Retention Policy"
            description="Manage how long data is stored"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                    <Label htmlFor="retentionPeriod" className="text-sm font-medium text-foreground">
                        Retention Period (days)
                    </Label>
                    <Input
                        id="retentionPeriod"
                        type="number"
                        value={formData.retentionPeriod}
                        onChange={(e) => handleChange("retentionPeriod", parseInt(e.target.value))}
                        disabled={!isEditing}
                        className="rounded-lg bg-muted border-0"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-sm font-medium text-foreground">Auto Delete</Label>
                        <p className="text-sm text-muted-foreground">Automatically delete old data</p>
                    </div>
                    <Switch
                        checked={formData.autoDelete}
                        onCheckedChange={() => handleToggle("autoDelete")}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="backupFrequency" className="text-sm font-medium text-foreground">
                        Backup Frequency
                    </Label>
                    <Select
                        value={formData.backupFrequency}
                        onValueChange={(value) => handleChange("backupFrequency", value)}
                        disabled={!isEditing}
                    >
                        <SelectTrigger className="rounded-lg bg-muted border-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SettingsTabShell>
    )
}
