import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommissionBreakdownDatum } from "./CommissionBreakdownPanel"
import { agenciesData } from "@/data/agenciesData"

interface FraudDistributionPanelProps {
    data: CommissionBreakdownDatum[]
    title: string
}

export const FraudDistributionPanel = ({ data, title }: FraudDistributionPanelProps) => {
    return (
        <DashboardPanel
            title={title}
            className="lg:col-span-2"
            actions={
                <div className="flex gap-2">
                    <Select defaultValue="2025">
                        <SelectTrigger className="h-8 w-[80px] rounded-full border-border bg-background px-3 text-[10px] focus:ring-0">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="h-8 w-[120px] rounded-full border-border bg-background px-3 text-[10px] focus:ring-0">
                            <SelectValue placeholder="Agency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Agencies</SelectItem>
                            {Array.from(new Set(agenciesData.map((a) => a.name))).map((name) => (
                                <SelectItem key={name} value={name}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
        >
            <div className="flex h-[320px] flex-col pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                        />
                        <Tooltip 
                            cursor={{ fill: "transparent" }}
                            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        />
                        <Bar 
                            dataKey="value" 
                            radius={[6, 6, 0, 0]}
                            barSize={40}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="var(--progress)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                
                {/* Legend - Styled like other legends in the app */}
                <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-border pt-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--progress)" }} />
                            <span className="text-[12px] font-medium text-primary">{item.name}</span>
                            <span className="text-[12px] text-muted-foreground">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardPanel>
    )
}
