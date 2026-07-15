import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Profile } from "iconsax-react"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import * as authService from "@/features/auth/api/authService"
import { extractErrorMessage } from "@/features/auth/authErrors"

export const AgencyProfileTab = () => {
    const { user, refreshUser } = useAuth()
    const { toast } = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [agencyName, setAgencyName] = useState(user?.agency?.name ?? "")
    const [address, setAddress] = useState(user?.address ?? "")
    const [previewLogo, setPreviewLogo] = useState<string | null>(null)
    const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)

    const email = user?.email ?? ""
    const phoneNumber = user?.agency?.phone_number ?? ""
    const currentLogoUrl = user?.agency?.logo_url

    const handleEdit = () => {
        setAgencyName(user?.agency?.name ?? "")
        setAddress(user?.address ?? "")
        setIsEditing(true)
    }

    const handleCancel = () => {
        setAgencyName(user?.agency?.name ?? "")
        setAddress(user?.address ?? "")
        setPreviewLogo(null)
        setSelectedLogoFile(null)
        setIsEditing(false)
    }

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedLogoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            let logoUrl = currentLogoUrl || undefined
            if (selectedLogoFile) {
                const sasData = await authService.getUploadSasUrl(selectedLogoFile.name, "logo")
                await authService.uploadFileToAzure(sasData.upload_url, selectedLogoFile)
                logoUrl = sasData.clean_url
            }

            await authService.agencyUpdateProfile({
                agency_name: agencyName,
                address,
                agency_logo_url: logoUrl,
            })
            await refreshUser()
            toast({ title: "Profile updated", description: "Your changes have been saved." })
            setSelectedLogoFile(null)
            setPreviewLogo(null)
            setIsEditing(false)
        } catch (error) {
            toast({
                title: "Could not save profile",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
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
            saveButtonText={isSaving ? "Saving..." : "Save"}
        >
            <div className="flex justify-center">
                <div className="w-full max-w-2xl space-y-6">
                    <div className="space-y-4">
                        <Label className="text-sm font-normal text-foreground">Company Logo</Label>
                        <div className="relative w-24 h-24">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                                {previewLogo || currentLogoUrl ? (
                                    <img
                                        src={previewLogo ?? currentLogoUrl}
                                        alt="Company Logo"
                                        className="w-full h-full object-cover"
                                    />
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

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="agencyName" className="text-sm font-normal text-foreground">
                                Agency Name
                            </Label>
                            <Input
                                id="agencyName"
                                placeholder="Enter agency name"
                                value={agencyName}
                                onChange={(e) => setAgencyName(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-normal text-foreground">
                                Email
                            </Label>
                            <Input id="email" type="email" value={email} disabled />
                            <p className="text-xs text-muted-foreground">
                                Email is tied to your sign-in and can't be changed here.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-normal text-foreground">
                                Phone Number
                            </Label>
                            <Input id="phoneNumber" value={phoneNumber} disabled />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-normal text-foreground">
                                Address
                            </Label>
                            <Input
                                id="address"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SettingsTabShell>
    )
}
