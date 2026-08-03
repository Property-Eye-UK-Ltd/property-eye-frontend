import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartCircle } from "iconsax-react"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

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
  isLoading?: boolean
}

export const CommissionBreakdownPanel = ({ 
  data, 
  title = "Commission Avoidance Breakdown", 
  chartSize = 160, 
  className,
  isLoading = false,
}: CommissionBreakdownPanelProps) => (
  <DashboardPanel
    title={title}
    icon={<ChartCircle size={18} variant="Bulk" className="text-muted-foreground" />}
    className={className}
    hasBorder
    compactContent
  >
    {isLoading ? (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-4 animate-pulse">
        <div className="relative flex-shrink-0">
          <div 
            className="rounded-full bg-slate-100 flex items-center justify-center"
            style={{ width: chartSize, height: chartSize }}
          >
            <div 
              className="rounded-full bg-white"
              style={{ width: chartSize * 0.68, height: chartSize * 0.68 }}
            />
          </div>
        </div>
        <div className="w-full sm:max-w-xs space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    ) : (
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
    )}
  </DashboardPanel>
)
