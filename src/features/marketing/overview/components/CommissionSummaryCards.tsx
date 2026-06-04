import { Link } from "react-router-dom"
import { MoneyRecive } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { cn } from "@/lib/utils"
import { CommissionSummaryItem } from "@/data/marketing-data"

interface CommissionSummaryCardsProps {
    data: CommissionSummaryItem[]
    viewAllHref?: string
}

export const CommissionSummaryCards = ({ data, viewAllHref }: CommissionSummaryCardsProps) => (
    <DashboardPanel
        title="Commission tracker"
        description="Lifecycle of your earnings — from pending approval to paid."
        icon={<MoneyRecive size={20} variant="Bulk" className="mt-0.5 shrink-0 text-primary" />}
        className="border border-border"
        actions={
            viewAllHref ? (
                <Link
                    to={viewAllHref}
                    className="shrink-0 rounded-full border border-primary px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 lg:text-sm"
                >
                    View all
                </Link>
            ) : undefined
        }
    >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {data.map((item) => (
                <div
                    key={item.label}
                    className="rounded-xl border border-border bg-muted/30 p-3 lg:p-4"
                >
                    <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 shrink-0 rounded-full", item.accentClass)} />
                        <span className="truncate text-[11px] text-muted-foreground lg:text-xs">
                            {item.label}
                        </span>
                    </div>
                    <p className="mt-2 text-lg font-medium text-foreground lg:text-2xl">{item.value}</p>
                </div>
            ))}
        </div>
    </DashboardPanel>
)
