import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EditTemplateModal } from "./EditTemplateModal"
import { adminMessageTemplates, MessageTemplate } from "@/data/adminMessageTemplates"
import { toast } from "sonner"

export const MessageTemplatesTab = () => {
    const [templates] = useState<MessageTemplate[]>(adminMessageTemplates)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null)

    const handleEditTemplate = (template: MessageTemplate) => {
        setSelectedTemplate(template)
        setIsEditModalOpen(true)
    }

    const handleSaveTemplate = () => {
        toast.success("Template saved")
        setIsEditModalOpen(false)
    }

    return (
        <SettingsTabShell
            title="Message Templates"
            description="Manage automated email and SMS templates sent by Property Eye."
            isEditing={false}
            onEdit={() => {}}
            onSave={() => {}}
            onCancel={() => {}}
            useAlternativeCTA
            hasChanges={false}
        >
            <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                    Templates map to lifecycle triggers in the system flows catalog (A1–A5). Renamed per redesign: Sweep Scheduled → Account Review Reminder; Check Completed → Account Review Update.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {templates.map((template) => (
                        <div key={template.id} className="flex flex-col space-y-4 rounded-3xl border border-border/50 bg-muted p-5">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">{template.title}</Label>
                                <span
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                                        template.type === "Email"
                                            ? "bg-primary/10 text-primary"
                                            : template.type === "In-app"
                                              ? "bg-amber-50 text-amber-700"
                                              : "bg-secondary/10 text-secondary-foreground"
                                    )}
                                >
                                    {template.type}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Trigger: {template.trigger}</p>
                            <p className="flex-1 text-sm text-muted-foreground">{template.content}</p>
                            <Button variant="outline" className="w-fit rounded-full" onClick={() => handleEditTemplate(template)}>
                                Edit Template
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTemplate && (
                <EditTemplateModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    template={selectedTemplate}
                    onSave={handleSaveTemplate}
                />
            )}
        </SettingsTabShell>
    )
}
