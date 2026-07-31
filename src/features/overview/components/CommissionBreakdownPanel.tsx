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
  chartSize?: number
  className?: string
}

export const CommissionBreakdownPanel = ({ data, title = "Commission Avoidance Breakdown", chartSize = 160, className }: CommissionBreakdownPanelProps) => (
  <DashboardPanel
    title={title}
    icon={<ChartCircle size={18} variant="Bulk" className="text-muted-foreground" />}
    className={className}
    hasBorder
    compactContent
  >
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-4">
      <div className="relative flex-shrink-0">
        <ResponsiveContainer width={chartSize} height={chartSize}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={chartSize * 0.34}
              outerRadius={chartSize * 0.46}
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
      <div className="w-full sm:max-w-xs space-y-2.5">
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
