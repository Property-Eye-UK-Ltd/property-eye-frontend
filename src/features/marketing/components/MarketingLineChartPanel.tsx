import { ReactNode } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer } from "@/components/ui/chart"
import { Diagram } from "iconsax-react"
import {
    ResponsiveContainer,
    ComposedChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
    Line,
    Tooltip,
} from "recharts"
import { cn } from "@/lib/utils"
import { BarChartDatum } from "./MarketingBarChartPanel"

interface MarketingLineChartPanelProps {
    data: BarChartDatum[]
    title: string
    description?: string
    color?: string
    className?: string
    icon?: ReactNode
    /** Format the value shown on the axis and tooltip (e.g. currency). */
    valueFormatter?: (value: number) => string
}

const defaultFormatter = (value: number) => value.toLocaleString()

export const MarketingLineChartPanel = ({
    data,
    title,
    description,
    color = "#4D66EA",
    className,
    icon,
    valueFormatter = defaultFormatter,
}: MarketingLineChartPanelProps) => {
    const gradientId = `marketingLine-${title.replace(/\s+/g, "-").toLowerCase()}`

    return (
        <DashboardPanel
            title={title}
            description={description}
            icon={icon ?? <Diagram size={16} variant="TwoTone" className="text-muted-foreground" />}
            className={cn("border border-border", className)}
            hasBorder
            compactContent
        >
            <ChartContainer config={{}} className="h-[240px] w-full sm:h-[260px] lg:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                            cursor={{ stroke: "#E2E8F0" }}
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                            formatter={(value: number) => [valueFormatter(value), title]}
                        />
                        <Area type="monotone" dataKey="value" fill={`url(#${gradientId})`} stroke="none" />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={{ r: 3, fill: color }}
                            activeDot={{ r: 5, fill: color }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartContainer>
        </DashboardPanel>
    )
}
