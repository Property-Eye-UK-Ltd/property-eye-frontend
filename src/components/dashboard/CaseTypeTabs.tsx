import { cn } from "@/lib/utils"

interface CaseTypeTab {
  label: string
  count: number
  value: string
}

interface CaseTypeTabsProps {
  tabs: CaseTypeTab[]
  selected: string
  onSelect: (value: string) => void
}

export const CaseTypeTabs = ({ tabs, selected, onSelect }: CaseTypeTabsProps) => (
  <div className="flex items-center gap-3">
    {tabs.map((tab) => {
      const isActive = selected === tab.value
      return (
        <button
          key={tab.value}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
            isActive
              ? "bg-primary/10 border border-primary text-foreground"
              : "bg-white text-muted-foreground hover:bg-muted/30 border border-border"
          )}
          onClick={() => onSelect(tab.value)}
        >
          <span>{tab.label}</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium border",
              isActive
                ? "bg-white border-gray-200 text-muted-foreground"
                : "bg-gray-100 border-gray-200 text-muted-foreground"
            )}
          >
            {tab.count}
          </span>
        </button>
      )
    })}
  </div>
)

