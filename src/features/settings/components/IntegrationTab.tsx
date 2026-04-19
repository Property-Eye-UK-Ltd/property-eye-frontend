import { SettingsTabShell } from "./SettingsTabShell"
import { Monitor } from "iconsax-react"

export const IntegrationTab = () => {
    return (
        <SettingsTabShell
            title="Integration"
            description="Manage your third-party integrations"
            isEditing={false}
            onEdit={() => { }}
            onSave={() => { }}
            onCancel={() => { }}
            useAlternativeCTA={true}
            hasChanges={false}
            saveButtonText="Connect"
        >
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                    <Monitor size={40} variant="Bulk" className="text-primary" />
                </div>
                <div className="space-y-2 max-w-sm">
                    <h3 className="text-xl font-semibold text-foreground">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        We're working hard on building seamless integrations with top CRMs and property management platforms. Stay tuned!
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {["Alto", "Reapit", "SME Professional", "Street.co.uk", "CSV/PDF"].map((tech) => (
                        <div key={tech} className="px-4 py-2 bg-muted rounded-full text-xs font-medium text-muted-foreground border border-border/50">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </SettingsTabShell>
    )
}
