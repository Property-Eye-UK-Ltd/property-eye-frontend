import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const donutData1 = [
    { name: "Completed", value: 831, color: "#3B82F6" }, // Blue
    { name: "Remaining", value: 831, color: "#E5E7EB" }, // Gray
]

const donutData2 = [
    { name: "Completed", value: 261, color: "#F97316" }, // Orange
    { name: "Remaining", value: 1100, color: "#E5E7EB" }, // Gray
]

export const TeamMetrics = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Total Users */}
            <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500" />
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-medium text-foreground">5</p>
                </CardContent>
            </Card>

            {/* Card 2: Active Today */}
            <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-orange-500" />
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">Active Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-medium text-foreground">4</p>
                </CardContent>
            </Card>

            {/* Card 3: Merged Stats */}
            <Card className="relative overflow-hidden md:col-span-2">
                <div className="absolute top-0 left-0 right-0 h-2 bg-purple-500" />
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-around gap-8 h-full">
                        {/* Chart 1 */}
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={donutData1}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={22}
                                            outerRadius={32}
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
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-sm font-medium text-muted-foreground">Cases Opened</span>
                                </div>
                                <span className="text-xl font-semibold text-foreground">831</span>
                                <span className="text-xs text-muted-foreground">50%</span>
                            </div>
                        </div>

                        {/* Chart 2 */}
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={donutData2}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={22}
                                            outerRadius={32}
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
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    <span className="text-sm font-medium text-muted-foreground">Evidence Uploaded</span>
                                </div>
                                <span className="text-xl font-semibold text-foreground">261</span>
                                <span className="text-xs text-muted-foreground">19%</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
