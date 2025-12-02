import { cn } from "@/lib/utils"

interface SettingsTab {
    label: string
    value: string
}

interface SettingsTabsProps {
    tabs: SettingsTab[]
    selected: string
    onSelect: (value: string) => void
}

export const SettingsTabs = ({ tabs, selected, onSelect }: SettingsTabsProps) => (
    <div className="bg-white rounded-full p-1 inline-flex border border-border">
        <div className="flex items-center gap-3">
            {tabs.map((tab) => {
                const isActive = selected === tab.value
                return (
                    <button
                        key={tab.value}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary/90 border border-primary text-foreground"
                                : "bg-transparent text-muted-foreground hover:bg-muted/30"
                        )}
                        onClick={() => onSelect(tab.value)}
                    >
                        <span>{tab.label}</span>
                    </button>
                )
            })}
        </div>
    </div>
)
