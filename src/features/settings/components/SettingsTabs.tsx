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
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div className="inline-flex w-max min-w-full rounded-full border border-border bg-white p-1">
            <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                    const isActive = selected === tab.value
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            className={cn(
                                "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors lg:px-4 lg:py-2 lg:text-sm",
                                isActive
                                    ? "border border-primary bg-progress/10 text-foreground"
                                    : "bg-transparent text-muted-foreground hover:bg-muted/30"
                            )}
                            onClick={() => onSelect(tab.value)}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </div>
    </div>
)
