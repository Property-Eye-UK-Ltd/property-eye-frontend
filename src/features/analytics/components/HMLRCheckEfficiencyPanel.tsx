import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartCircle } from "iconsax-react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface HMLRCheckEfficiencyPanelProps {
    percentage: number
}

export const HMLRCheckEfficiencyPanel = ({ percentage }: HMLRCheckEfficiencyPanelProps) => {
    const data = [
        { name: "Efficiency", value: percentage },
        { name: "Remaining", value: 100 - percentage }
    ]

    const COLORS = ["#22C55E", "#E5E7EB"]

    return (
        <DashboardPanel
            title="HMLR Check Efficiency"
            icon={<ChartCircle size={16} variant="TwoTone" className="text-muted-foreground" />}
            hasBorder
        >
            <div className="flex items-center justify-center py-4">
                <div className="relative w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-semibold text-foreground">{percentage}%</span>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
