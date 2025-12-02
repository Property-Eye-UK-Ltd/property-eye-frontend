import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecuritySettings } from "@/data/settings-data"
import { Eye, EyeSlash } from "iconsax-react"

interface SecurityTabProps {
    settings: SecuritySettings
    onSave: (settings: SecuritySettings) => void
}

export const SecurityTab = ({ settings, onSave }: SecurityTabProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<SecuritySettings>(settings)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setFormData(settings)
        setIsEditing(false)
    }
    const handleSave = () => {
        onSave(formData)
        setIsEditing(false)
    }

    const handleToggle = () => {
        setFormData({ ...formData, twoFactorAuth: !formData.twoFactorAuth })
    }

    const handleChange = (field: keyof SecuritySettings, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <SettingsTabShell
            title="Security"
            description="Update your password, authentication, and security preferences."
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-8">
                {/* Change Password Section - Full width header, centered fields */}
                <div className="space-y-4">
                    <div className="mb-10" >
                        <h3 className="text-base font-medium text-foreground">Change Password</h3>
                        <p className="text-sm text-muted-foreground">
                            Update your password to maintain account security.
                        </p>
                    </div>

                    {/* Password Fields - Centered container */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl space-y-4">

                            {/* Current Password */}
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-sm font-normal text-foreground">
                                    Current Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Enter your current password"
                                        value={formData.currentPassword}
                                        onChange={(e) => handleChange("currentPassword", e.target.value)}
                                        disabled={!isEditing}
                                        className="py-3"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={!isEditing}
                                    >
                                        {showCurrentPassword ? (
                                            <EyeSlash size={20} variant="Outline" />
                                        ) : (
                                            <Eye size={20} variant="Outline" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-normal text-foreground">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter a new password"
                                        value={formData.newPassword}
                                        onChange={(e) => handleChange("newPassword", e.target.value)}
                                        disabled={!isEditing}
                                        className="py-3"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={!isEditing}
                                    >
                                        {showNewPassword ? (
                                            <EyeSlash size={20} variant="Outline" />
                                        ) : (
                                            <Eye size={20} variant="Outline" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-normal text-foreground">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Re-enter a new password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                        disabled={!isEditing}
                                        className="py-3"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        disabled={!isEditing}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlash size={20} variant="Outline" />
                                        ) : (
                                            <Eye size={20} variant="Outline" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="h-px bg-border" />

                {/* Two-Factor Authentication - Full width */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <Label className="text-base font-medium text-foreground">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                            Enable 2FA to secure your account with an additional authentication code.
                        </p>
                    </div>
                    <Switch
                        checked={formData.twoFactorAuth}
                        onCheckedChange={handleToggle}
                        disabled={!isEditing}
                        className="shrink-0"
                    />
                </div>
            </div>
        </SettingsTabShell>
    )
}
