import { useEffect, useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    useCommissionRateSetting,
    usePlatformSettings,
    useUpdateCommissionRateSetting,
    useUpdatePlatformSettings,
} from "@/features/adminconfig/api/useAdminConfig"
import { toast } from "sonner"

const formatUpdatedAt = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

export const ConfigurationsTab = () => {
    const { data: rateSetting, isLoading: isRateLoading } = useCommissionRateSetting()
    const updateRate = useUpdateCommissionRateSetting()

    const { data: platformSettings, isLoading: isPlatformLoading } = usePlatformSettings()
    const updatePlatformShare = useUpdatePlatformSettings()

    const [isEditing, setIsEditing] = useState(false)
    const [ratePercent, setRatePercent] = useState<string>("")
    const [propertyEyeSharePercent, setPropertyEyeSharePercent] = useState<string>("")

    useEffect(() => {
        if (rateSetting && !isEditing) {
            setRatePercent(String(rateSetting.rate_percent))
        }
    }, [rateSetting, isEditing])

    useEffect(() => {
        if (platformSettings && !isEditing) {
            setPropertyEyeSharePercent(String(platformSettings.property_eye_share_percent))
        }
    }, [platformSettings, isEditing])

    const isLoading = isRateLoading || isPlatformLoading

    const handleEdit = () => setIsEditing(true)

    const handleCancel = () => {
        if (rateSetting) setRatePercent(String(rateSetting.rate_percent))
        if (platformSettings) setPropertyEyeSharePercent(String(platformSettings.property_eye_share_percent))
        setIsEditing(false)
    }

    const handleSave = async () => {
        const parsedRate = parseFloat(ratePercent)
        const parsedShare = parseFloat(propertyEyeSharePercent)

        if (Number.isNaN(parsedRate) || parsedRate <= 0 || parsedRate > 100) {
            toast.error("Commission rate must be a number between 0 and 100")
            return
        }
        if (Number.isNaN(parsedShare) || parsedShare <= 0 || parsedShare > 100) {
            toast.error("Property Eye share must be a number between 0 and 100")
            return
        }

        try {
            await Promise.all([
                rateSetting && parsedRate !== rateSetting.rate_percent ? updateRate.mutateAsync(parsedRate) : null,
                platformSettings && parsedShare !== platformSettings.property_eye_share_percent
                    ? updatePlatformShare.mutateAsync(parsedShare)
                    : null,
            ])
            toast.success("Configurations updated")
            setIsEditing(false)
        } catch {
            toast.error("Failed to update configurations")
        }
    }

    const agencySharePercent = propertyEyeSharePercent === "" || Number.isNaN(parseFloat(propertyEyeSharePercent))
        ? null
        : 100 - parseFloat(propertyEyeSharePercent)

    return (
        <SettingsTabShell
            title="Platform Configurations"
            description="Global defaults used across the platform's billing and commission calculations"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-8 max-w-2xl">
                <div className="space-y-2">
                    <Label htmlFor="propertyEyeShare" className="text-sm font-medium text-foreground">
                        Property Eye Share of Recovered Amount (%)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Property Eye's cut of a recovered fraud case, before the marketer commission rate is
                        applied on top of it. The agency's share is always the remainder, so the two always
                        sum to the full recovered amount. Applies to new cases going forward.
                    </p>
                    <Input
                        id="propertyEyeShare"
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        value={isLoading ? "" : propertyEyeSharePercent}
                        onChange={(e) => setPropertyEyeSharePercent(e.target.value)}
                        disabled={!isEditing || isLoading}
                        className="rounded-lg bg-muted border-0 max-w-xs"
                    />
                    {agencySharePercent !== null && (
                        <p className="text-xs text-muted-foreground">
                            Agency share: {agencySharePercent}% (auto-calculated)
                        </p>
                    )}
                    {platformSettings && (
                        <p className="text-xs text-muted-foreground">
                            Last updated {formatUpdatedAt(platformSettings.updated_at)}
                        </p>
                    )}
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                    <Label htmlFor="commissionRate" className="text-sm font-medium text-foreground">
                        Marketer Commission Rate (%)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Default share of Property Eye's recovered revenue paid out to the referring marketer.
                        Applies to new commissions going forward — does not change amounts already recorded.
                    </p>
                    <Input
                        id="commissionRate"
                        type="number"
                        min={0}
                        max={100}
                        step={0.1}
                        value={isLoading ? "" : ratePercent}
                        onChange={(e) => setRatePercent(e.target.value)}
                        disabled={!isEditing || isLoading}
                        className="rounded-lg bg-muted border-0 max-w-xs"
                    />
                    {rateSetting && (
                        <p className="text-xs text-muted-foreground">
                            Last updated {formatUpdatedAt(rateSetting.updated_at)}
                        </p>
                    )}
                </div>
            </div>
        </SettingsTabShell>
    )
}
