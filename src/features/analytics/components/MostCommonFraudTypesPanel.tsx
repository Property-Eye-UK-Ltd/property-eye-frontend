import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer } from "@/components/ui/chart"
import { Chart } from "iconsax-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export interface FraudTypeData {
    type: string
    [key: string]: number | string
}

export interface FraudTypeConfig {
    label: string
    color: string
}

interface MostCommonFraudTypesProps {
    data: FraudTypeData[]
    config: Record<string, FraudTypeConfig>
}

export const MostCommonFraudTypesPanel = ({ data, config }: MostCommonFraudTypesProps) => {
    return (
        <DashboardPanel
            title="Most Common Fraud Types"
            icon={<Chart size={16} variant="TwoTone" className="text-muted-foreground" />}
            hasBorder
        >
            <ChartContainer config={config} className="h-[280px] w-full -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="type"
                            fontSize={12}
                            stroke="#64748B"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, 100]}
                            fontSize={12}
                            stroke="#64748B"
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                            iconType="circle"
                        />
                        {Object.entries(config).map(([key, value]) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                name={value.label}
                                fill={value.color}
                                stackId="fraud"
                                radius={[0, 0, 0, 0]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </DashboardPanel>
    )
}
