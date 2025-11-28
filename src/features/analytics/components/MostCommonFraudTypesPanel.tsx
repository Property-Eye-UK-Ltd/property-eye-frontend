import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer } from "@/components/ui/chart"
import { Chart } from "iconsax-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

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
            <ChartContainer config={config} className="h-[255px] w-full -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="type"
                            fontSize={12}
                            stroke="#64748B"
                            axisLine={false}
                            tickLine={false}
                            tick={false}
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

            {/* Custom Legend Under Each Bar */}
            <div className="flex justify-around px-5">
                {data.map((item) => {
                    const dataKey = Object.keys(item).find(key => key !== 'type' && item[key] !== 0)
                    const legendConfig = dataKey ? config[dataKey] : null

                    return (
                        <div key={item.type} className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: legendConfig?.color || '#6B7280' }}
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.type}</span>
                        </div>
                    )
                })}
            </div>
        </DashboardPanel>
    )
}
