import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const donutData1 = [
    { name: "Completed", value: 831, color: "#3B82F6" },
    { name: "Remaining", value: 831, color: "#E5E7EB" },
]

const donutData2 = [
    { name: "Completed", value: 261, color: "#F97316" },
    { name: "Remaining", value: 1100, color: "#E5E7EB" },
]

const CasesOpenedChart = () => (
    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={donutData1}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={26}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {donutData1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="min-w-0 flex flex-col">
            <div className="mb-0.5 flex items-center gap-1.5">
                <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <span className="truncate text-[11px] font-medium text-muted-foreground sm:text-sm">
                    Cases Opened
                </span>
            </div>
            <span className="text-lg font-medium text-foreground sm:text-xl">831</span>
            <span className="hidden text-[10px] leading-tight text-muted-foreground sm:block">
                (Withdrawn & Sold / Total Checks)
            </span>
        </div>
    </div>
)

const FraudPercentageChart = () => (
    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={donutData2}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={26}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {donutData2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="min-w-0 flex flex-col">
            <div className="mb-0.5 flex items-center gap-1.5">
                <div className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                <span className="truncate text-[11px] font-medium text-muted-foreground sm:text-sm">
                    Fraud %
                </span>
            </div>
            <span className="text-lg font-medium text-foreground sm:text-xl">261</span>
            <span className="hidden text-[10px] leading-tight text-muted-foreground sm:block">
                (Fraud / Withdrawn & Sold)
            </span>
        </div>
    </div>
)

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
                <CardContent className="p-3 lg:p-6">
                    <div className="flex flex-row items-stretch justify-between gap-2 sm:gap-6">
                        <CasesOpenedChart />
                        <div className="w-px shrink-0 bg-border" />
                        <FraudPercentageChart />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
