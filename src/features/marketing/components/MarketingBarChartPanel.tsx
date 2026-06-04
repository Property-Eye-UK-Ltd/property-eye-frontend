import { ReactNode } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer } from "@/components/ui/chart"
import { AlignBottom } from "iconsax-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

export interface BarChartDatum {
    label: string
    value: number
}

interface MarketingBarChartPanelProps {
    data: BarChartDatum[]
    title: string
    description?: string
    color?: string
    className?: string
    icon?: ReactNode
    /** Format the value shown in the tooltip (e.g. currency). */
    valueFormatter?: (value: number) => string
}

const defaultFormatter = (value: number) => value.toLocaleString()

export const MarketingBarChartPanel = ({
    data,
    title,
    description,
    color = "#4D66EA",
    className,
    icon,
    valueFormatter = defaultFormatter,
}: MarketingBarChartPanelProps) => (
    <DashboardPanel
        title={title}
        description={description}
        icon={icon ?? <AlignBottom size={16} variant="TwoTone" className="text-muted-foreground" />}
        className={cn("border border-border", className)}
        hasBorder
        compactContent
    >
        <ChartContainer config={{}} className="h-[240px] w-full sm:h-[260px] lg:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                    <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="label"
                        fontSize={12}
                        stroke="#64748B"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        fontSize={12}
                        stroke="#64748B"
                        axisLine={false}
                        tickLine={false}
                        width={44}
                        tickFormatter={valueFormatter}
                    />
                    <Tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #E2E8F0",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                        formatter={(value: number) => [valueFormatter(value), title]}
                    />
                    <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={48} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </DashboardPanel>
)
