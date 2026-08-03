import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartCircle } from "iconsax-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface DonutBreakdownDatum {
    name: string
    value: number
    valueLabel: string
    color: string
}

interface DonutBreakdownPanelProps {
    data: DonutBreakdownDatum[]
    title?: string
    description?: string
    className?: string
    chartSize?: number
    isLoading?: boolean
}

export const DonutBreakdownPanel = ({
    data,
    title = "Breakdown",
    description,
    className,
    chartSize = 180,
    isLoading = false,
}: DonutBreakdownPanelProps) => (
    <DashboardPanel
        title={title}
        description={description}
        icon={<ChartCircle size={18} variant="Bulk" className="text-muted-foreground" />}
        className={cn("border border-border", className)}
        hasBorder
        compactContent
    >
        {isLoading ? (
            <div className="flex flex-col items-center gap-4 lg:gap-6 animate-pulse py-4">
                <div className="relative flex-shrink-0">
                    <div 
                        className="rounded-full bg-slate-100 flex items-center justify-center"
                        style={{ width: chartSize, height: chartSize }}
                    >
                        <div 
                            className="rounded-full bg-white"
                            style={{ width: chartSize * 0.68, height: chartSize * 0.68 }}
                        />
                    </div>
                </div>
                <div className="w-full space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-4 w-8" />
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center gap-4 lg:gap-6">
                <div className="relative flex-shrink-0">
                    <ResponsiveContainer width={chartSize} height={chartSize}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={chartSize * 0.34}
                                outerRadius={chartSize * 0.46}
                                paddingAngle={2}
                                dataKey="value"
                                cornerRadius={8}
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full space-y-2.5">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className="h-3 w-3 flex-shrink-0 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="truncate text-sm text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="shrink-0 text-sm font-medium text-foreground">
                                {item.valueLabel}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </DashboardPanel>
)
