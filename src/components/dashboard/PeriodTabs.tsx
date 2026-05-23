import { cn } from "@/lib/utils"

interface PeriodTabsProps {
  periods: string[]
  selected: string
  onSelect: (value: string) => void
}

export const PeriodTabs = ({ periods, selected, onSelect }: PeriodTabsProps) => (
  <div className="inline-flex max-w-full overflow-x-auto rounded-md border border-border bg-white lg:rounded-lg [-webkit-overflow-scrolling:touch]">
    {periods.map((period, index) => {
      const isActive = selected === period
      return (
        <button
          key={period}
          type="button"
          className={cn(
            "shrink-0 px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none lg:px-5 lg:py-2 lg:text-sm",
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
