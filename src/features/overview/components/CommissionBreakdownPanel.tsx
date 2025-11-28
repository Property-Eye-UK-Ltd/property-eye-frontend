import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartCircle } from "iconsax-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export interface CommissionBreakdownDatum {
  name: string
  value: number
  color: string
}

interface CommissionBreakdownPanelProps {
  data: CommissionBreakdownDatum[]
  title?: string
}

export const CommissionBreakdownPanel = ({ data, title = "Commission Avoidance Breakdown" }: CommissionBreakdownPanelProps) => (
  <DashboardPanel
    title={title}
    icon={<ChartCircle size={18} variant="Bulk" className="text-muted-foreground" />}
    className="lg:col-span-2"
    hasBorder
  >
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex-shrink-0">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={74}
              paddingAngle={2}
              dataKey="value"
              cornerRadius={8}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full space-y-2.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardPanel>
)
