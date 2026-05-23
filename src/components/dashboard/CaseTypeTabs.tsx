import { cn } from "@/lib/utils"

interface CaseTypeTab {
  label: string
  count?: number
  value: string
}

interface CaseTypeTabsProps {
  tabs: CaseTypeTab[]
  selected: string
  onSelect: (value: string) => void
}

export const CaseTypeTabs = ({ tabs, selected, onSelect }: CaseTypeTabsProps) => (
  <div className="flex w-max min-w-full items-center gap-2 pb-0.5 [-webkit-overflow-scrolling:touch]">
    {tabs.map((tab) => {
      const isActive = selected === tab.value
      return (
        <button
          key={tab.value}
          type="button"
          className={cn(
            "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors lg:px-4 lg:py-2 lg:text-sm",
            isActive
              ? "border border-primary bg-primary/10 text-foreground"
              : "border border-border bg-white text-muted-foreground hover:bg-muted/30"
          )}
          onClick={() => onSelect(tab.value)}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={cn(
                "rounded-full border px-1.5 py-0.5 text-[10px] font-medium lg:px-2 lg:text-xs",
                isActive
                  ? "border-gray-200 bg-white text-muted-foreground"
                  : "border-gray-200 bg-gray-100 text-muted-foreground"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      )
    })}
  </div>
)
