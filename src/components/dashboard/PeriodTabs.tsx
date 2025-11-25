import { cn } from "@/lib/utils"

interface PeriodTabsProps {
  periods: string[]
  selected: string
  onSelect: (value: string) => void
}

export const PeriodTabs = ({ periods, selected, onSelect }: PeriodTabsProps) => (
  <div className="inline-flex rounded-lg border border-border bg-white overflow-hidden">
    {periods.map((period, index) => {
      const isActive = selected === period
      return (
        <button
          key={period}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors focus:outline-none",
            index !== 0 && "border-l border-border/70",
            isActive ? "bg-[#F4F6F9] text-foreground" : "text-muted-foreground hover:bg-muted/30"
          )}
          onClick={() => onSelect(period)}
        >
          {period}
        </button>
      )
    })}
  </div>
)

