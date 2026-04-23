import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer } from "@/components/ui/chart"
import { AlignBottom } from "iconsax-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from "recharts"

export interface TimingGapData {
    range: string
    count: number
}

interface TimingGapsDistributionProps {
    data: TimingGapData[]
    color?: string
}

export const TimingGapsDistributionPanel = ({ data, color = "#F97316" }: TimingGapsDistributionProps) => {
    return (
        <DashboardPanel
            title="Timing Gaps Distribution"
            icon={<AlignBottom size={16} variant="TwoTone" className="text-muted-foreground" />}
            hasBorder
            className="col-span-full"
        >
            <ChartContainer config={{}} className="h-[320px] w-full -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 40 }}>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="range"
                            fontSize={12}
                            stroke="#64748B"
                            axisLine={false}
                            tickLine={false}
                        >
                            <Label value="TIME" offset={-20} position="insideBottom" fontSize={11} fontWeight={500} fill="#64748B" />
                        </XAxis>
                        <YAxis
                            fontSize={12}
                            stroke="#64748B"
                            axisLine={false}
                            tickLine={false}
                        >
                            <Label value="NUMBER OF PROPERTIES SOLD" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fontSize={11} fontWeight={500} fill="#64748B" offset={0} />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                        />
                        <Bar
                            dataKey="count"
                            fill={color}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </DashboardPanel>
    )
}
