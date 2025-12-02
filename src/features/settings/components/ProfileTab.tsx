import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileSettings } from "@/data/settings-data"
import { Camera, Profile } from "iconsax-react"

interface ProfileTabProps {
    settings: ProfileSettings
    onSave: (settings: ProfileSettings) => void
}

export const ProfileTab = ({ settings, onSave }: ProfileTabProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<ProfileSettings>(settings)
    const [previewLogo, setPreviewLogo] = useState<string | null>(null)

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setFormData(settings)
        setIsEditing(false)
    }
    const handleSave = () => {
        onSave(formData)
        setIsEditing(false)
    }

    const handleChange = (field: keyof ProfileSettings, value: string) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <SettingsTabShell
            title="Profile"
            description="Keep your profile up-to-date and accurate"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            {/* Centered container with left-aligned content */}
            <div className="flex justify-center">
                <div className="w-full max-w-2xl space-y-6">
                    {/* Company Logo - Left aligned */}
                    <div className="space-y-4">
                        <Label className="text-sm font-normal text-foreground">Company Logo</Label>
                        <div className="relative w-24 h-24">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                                {previewLogo ? (
                                    <img src={previewLogo} alt="Company Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Profile size="40" variant="Bulk" className="text-muted-foreground" />
                                )}
                            </div>
                            {isEditing && (
                                <>
                                    <label
                                        htmlFor="logo-upload"
                                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
                                    >
                                        <Camera size={16} variant="Outline" className="text-white" />
                                    </label>
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Form Fields - Left aligned */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="agencyName" className="text-sm font-normal text-foreground">
                                Agency Name
                            </Label>
                            <Input
                                id="agencyName"
                                placeholder="Enter agency name"
                                value={formData.agencyName}
                                onChange={(e) => handleChange("agencyName", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-normal text-foreground">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-normal text-foreground">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                placeholder="Enter phone number"
                                value={formData.phoneNumber}
                                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-normal text-foreground">
                                Address
                            </Label>
                            <Input
                                id="address"
                                placeholder="Enter address"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SettingsTabShell>
    )
}
