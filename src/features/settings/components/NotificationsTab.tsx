import { useState, useEffect } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { NotificationSettings } from "@/data/settings-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EditTemplateModal } from "./EditTemplateModal"

interface NotificationsTabProps {
    settings: NotificationSettings
    onSave: (settings: NotificationSettings) => void
    showTemplates?: boolean
}

export const NotificationsTab = ({ settings, onSave, showTemplates = true }: NotificationsTabProps) => {
    const [activeTab, setActiveTab] = useState<'notifications' | 'templates'>('notifications')
    const [formData, setFormData] = useState<NotificationSettings>(settings)
    const [hasChanges, setHasChanges] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<{ title: string, content: string, type: string } | null>(null)

    // Check if there are any changes
    useEffect(() => {
        const changed =
            formData.emailNotifications !== settings.emailNotifications ||
            formData.smsNotifications !== settings.smsNotifications ||
            formData.pushNotifications !== settings.pushNotifications
        setHasChanges(changed)
    }, [formData, settings])

    const handleSave = () => {
        onSave(formData)
        setHasChanges(false)
    }

    const handleToggle = (field: keyof NotificationSettings) => {
        setFormData({ ...formData, [field]: !formData[field] })
    }

    const handleEditTemplate = (template: any) => {
        setSelectedTemplate(template)
        setIsEditModalOpen(true)
    }

    const handleSaveTemplate = (newContent: string) => {
        // Logic to save the template content would go here
        // For now, we'll just log it and show a toast
        console.log("Template saved:", newContent)
    }

    const templates = [
        { title: "Fraud Detected (Agency)", type: "Email", content: "Dear [Agency Name], our system has detected a potential commission fraud for property [Property Address]. Please review the case details in your dashboard." },
        { title: "Account Review Reminder", type: "SMS", content: "Property Eye Alert: An account review is scheduled for [Date] at [Time]. Please ensure your data integration is healthy." },
        { title: "Account Review Update", type: "Email", content: "The account review for [Period] has been completed. Sign in to Property Eye for your latest case status updates." },
        { title: "Billing Reminder", type: "SMS", content: "Your Property Eye subscription for [Month] is due. Please review your billing tab to avoid service interruption." }
    ]

    return (
        <SettingsTabShell
            title="Notifications"
            description="Stay updated by choosing your notification preferences."
            isEditing={false}
            onEdit={() => { }}
            onSave={handleSave}
            onCancel={() => { }}
            useAlternativeCTA={true}
            hasChanges={hasChanges}
        >
            <div className="space-y-8">
                {showTemplates && (
                <div className="flex items-center gap-8 border-b border-border">
                    {[
                        { id: 'notifications', label: 'Notifications' },
                        { id: 'templates', label: 'Message Templates' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'notifications' | 'templates')}
                            className={cn(
                                "pb-4 text-sm font-medium transition-all relative",
                                activeTab === tab.id 
                                    ? "text-primary" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in-95 duration-300" />
                            )}
                        </button>
                    ))}
                </div>
                )}

                <div className="min-h-[400px]">
                    {(!showTemplates || activeTab === 'notifications') ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                            {/* Email Notification */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-1">
                                    <Label className="text-sm font-medium text-foreground">Email Notification</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive important updates and activity alerts via email.
                                    </p>
                                </div>
                                <Switch
                                    checked={formData.emailNotifications}
                                    onCheckedChange={() => handleToggle("emailNotifications")}
                                    className="shrink-0"
                                />
                            </div>

                            {/* SMS Notification */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-1">
                                    <Label className="text-sm font-medium text-foreground">SMS Notification</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive critical notifications and reminders via text message.
                                    </p>
                                </div>
                                <Switch
                                    checked={formData.smsNotifications}
                                    onCheckedChange={() => handleToggle("smsNotifications")}
                                    className="shrink-0"
                                />
                            </div>

                            {/* Push Notification */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-1">
                                    <Label className="text-sm font-medium text-foreground">Push Notification</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive instant updates, reminders, and activity notifications
                                    </p>
                                </div>
                                <Switch
                                    checked={formData.pushNotifications}
                                    onCheckedChange={() => handleToggle("pushNotifications")}
                                    className="shrink-0"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                            <div>
                                <h3 className="text-lg font-medium text-foreground mb-1">Messaging Templates</h3>
                                <p className="text-sm text-muted-foreground mb-6">Manage the content of your automated SMS and email notifications.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {templates.map((template, i) => (
                                        <div key={i} className="p-5 rounded-3xl bg-muted border border-border/50 space-y-4 flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">{template.title}</Label>
                                                <span className={cn(
                                                    "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                                                    template.type === "Email" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary-foreground"
                                                )}>
                                                    {template.type}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground flex-1 leading-relaxed">
                                                "{template.content}"
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-primary text-xs h-auto p-0 hover:bg-transparent w-fit font-medium"
                                                onClick={() => handleEditTemplate(template)}
                                            >
                                                Edit Template
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <EditTemplateModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                template={selectedTemplate}
                onSave={handleSaveTemplate}
            />
        </SettingsTabShell>
    )
}
