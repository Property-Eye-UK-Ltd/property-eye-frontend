import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useIsDesktop } from "@/hooks/use-desktop"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const donutData1 = [
    { name: "Completed", value: 831, color: "#3B82F6" },
    { name: "Remaining", value: 831, color: "#E5E7EB" },
]

const donutData2 = [
    { name: "Completed", value: 261, color: "#F97316" },
    { name: "Remaining", value: 1100, color: "#E5E7EB" },
]

interface DonutMetricProps {
    data: typeof donutData1
    dotClassName: string
    title: string
    value: string
    subtitle: string
}

const DonutMetric = ({ data, dotClassName, title, value, subtitle }: DonutMetricProps) => {
    const isDesktop = useIsDesktop()
    const innerRadius = isDesktop ? 26 : 10
    const outerRadius = isDesktop ? 32 : 14

    return (
        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-4">
            <div
                className={`relative shrink-0 ${isDesktop ? "h-16 w-16" : "h-8 w-8"}`}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="min-w-0 flex flex-col">
                <div className="mb-0.5 flex items-center gap-1">
                    <div className={`h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2 ${dotClassName}`} />
                    <span className="truncate text-[10px] font-medium text-muted-foreground sm:text-sm">
                        {title}
                    </span>
                </div>
                <span className="text-base font-medium text-foreground sm:text-xl">{value}</span>
                <span className="hidden text-[10px] leading-tight text-muted-foreground sm:block">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}

export const TeamMetrics = () => {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            <Card className="relative overflow-hidden">
                <div className="absolute left-0 right-0 top-0 h-2 bg-blue-500" />
                <CardHeader className="p-3 pb-1 lg:pb-2">
                    <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                        Total Users
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 lg:p-6">
                    <p className="text-2xl font-medium text-foreground lg:text-4xl">5</p>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
                <div className="absolute left-0 right-0 top-0 h-2 bg-orange-500" />
                <CardHeader className="p-3 pb-1 lg:pb-2">
                    <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                        Active Today
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 lg:p-6">
                    <p className="text-2xl font-medium text-foreground lg:text-4xl">4</p>
                </CardContent>
            </Card>

            <Card className="relative col-span-2 overflow-hidden">
                <div className="absolute left-0 right-0 top-0 h-2 bg-purple-500" />
                <CardContent className="p-2.5 sm:p-3 lg:p-6">
                    <div className="flex flex-row items-stretch justify-between gap-1 sm:gap-6">
                        <DonutMetric
                            data={donutData1}
                            dotClassName="bg-blue-500"
                            title="Cases Opened"
                            value="831"
                            subtitle="(Withdrawn & Sold / Total Checks)"
                        />
                        <div className="w-px shrink-0 bg-border" />
                        <DonutMetric
                            data={donutData2}
                            dotClassName="bg-orange-500"
                            title="Fraud %"
                            value="261"
                            subtitle="(Fraud / Withdrawn & Sold)"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
