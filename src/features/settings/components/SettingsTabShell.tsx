import { ReactNode } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"

interface SettingsTabShellProps {
    title: string
    description: string
    isEditing: boolean
    onEdit: () => void
    onSave: () => void
    onCancel: () => void
    children: ReactNode
    saveButtonText?: string
    // New props for alternative CTA pattern
    useAlternativeCTA?: boolean
    hasChanges?: boolean
}

export const SettingsTabShell = ({
    title,
    description,
    isEditing,
    onEdit,
    onSave,
    onCancel,
    children,
    saveButtonText = "Save",
    useAlternativeCTA = false,
    hasChanges = false,
}: SettingsTabShellProps) => {
    return (
        <DashboardPanel className="overflow-hidden" noPadding>
            <div className="space-y-6">
                {/* Header with separator */}
                <div className="space-y-4">
                    <div className="flex items-start justify-between px-6 pt-6">
                        <div>
                            <h2 className="text-lg font-medium text-foreground">{title}</h2>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                        {/* Alternative CTA: Just Save button, disabled until changes */}
                        {useAlternativeCTA ? (
                            <Button
                                onClick={onSave}
                                disabled={!hasChanges}
                                className="rounded-full bg-primary hover:bg-primary/90 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saveButtonText}
                            </Button>
                        ) : (
                            /* Standard CTA: Edit / Save + Cancel */
                            !isEditing ? (
                                <Button
                                    onClick={onEdit}
                                    className="rounded-full bg-primary hover:bg-primary/90 px-6"
                                >
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-3">
                                    <Button
                                        onClick={onCancel}
                                        variant="outline"
                                        className="rounded-full hover:bg-progress/30"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        className="rounded-full bg-primary hover:bg-primary/90 px-6"
                                    >
                                        {saveButtonText}
                                    </Button>
                                </div>
                            )
                        )}
                    </div>
                    {/* Separator line - full width, no padding */}
                    <div className="h-px bg-border" />
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    {children}
                </div>
            </div>
        </DashboardPanel>
    )
}
