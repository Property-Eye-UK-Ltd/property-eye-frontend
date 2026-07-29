import { useEffect, useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCommissionRateSetting, useUpdateCommissionRateSetting } from "@/features/adminconfig/api/useAdminConfig"
import { toast } from "sonner"

export const ConfigurationsTab = () => {
    const { data: rateSetting, isLoading } = useCommissionRateSetting()
    const updateRate = useUpdateCommissionRateSetting()

    const [isEditing, setIsEditing] = useState(false)
    const [ratePercent, setRatePercent] = useState<string>("")

    useEffect(() => {
        if (rateSetting && !isEditing) {
            setRatePercent(String(rateSetting.rate_percent))
        }
    }, [rateSetting, isEditing])

    const handleEdit = () => setIsEditing(true)

    const handleCancel = () => {
        if (rateSetting) setRatePercent(String(rateSetting.rate_percent))
        setIsEditing(false)
    }

    const handleSave = async () => {
        const parsed = parseFloat(ratePercent)
        if (Number.isNaN(parsed) || parsed <= 0 || parsed > 100) {
            toast.error("Commission rate must be a number between 0 and 100")
            return
        }
        try {
            await updateRate.mutateAsync(parsed)
            toast.success("Commission rate updated")
            setIsEditing(false)
        } catch {
            toast.error("Failed to update commission rate")
        }
    }

    return (
        <SettingsTabShell
            title="Platform Configurations"
            description="Global defaults used across the platform's billing and commission calculations"
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="space-y-6 max-w-2xl">
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
                            Last updated {new Date(rateSetting.updated_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    )}
                </div>
            </div>
        </SettingsTabShell>
    )
}
