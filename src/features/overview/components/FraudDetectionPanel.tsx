import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Diagram } from "iconsax-react"
import { TooltipProps, ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Area, Line } from "recharts"

export interface FraudDataPoint {
  month: string
  [key: string]: number | string
}

export interface FraudSeriesConfig {
  label: string
  color: string
}

interface FraudDetectionPanelProps {
  data: FraudDataPoint[]
  config: Record<string, FraudSeriesConfig>
}

const FraudTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null
  }

  const uniquePayload = payload.reduce<(typeof payload)[number][]>((acc, entry) => {
    const existingIndex = acc.findIndex((item) => item.dataKey === entry.dataKey)
    if (existingIndex === -1) {
      acc.push(entry)
    } else if (entry.stroke && !acc[existingIndex].stroke) {
      acc[existingIndex] = entry
    }
    return acc
  }, [])

  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 shadow-sm">
      {label && <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="space-y-1">
        {uniquePayload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between text-xs text-foreground">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color || "#000" }} />
              <span>{entry.name}</span>
            </div>
            <span className="font-semibold">
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FraudDetectionPanel = ({ data, config }: FraudDetectionPanelProps) => (
  <DashboardPanel
    title="Fraud Detection Over Time"
    icon={<Diagram size={16} variant="TwoTone" className="text-muted-foreground" />}
    hasBorder
    actions={
      <div className="flex items-center gap-4">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: value.color }} />
            <span className="text-xs text-muted-foreground">{value.label}</span>
          </div>
        ))}
      </div>
    }
  >
    <ChartContainer config={config} className="h-[280px] w-full -ml-6">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <defs>
            {Object.entries(config).map(([key, value]) => (
              <linearGradient key={key} id={`gradient${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={value.color} stopOpacity={0.15} />
                <stop offset="100%" stopColor={value.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={12} stroke="#64748B" />
          <YAxis domain={[0, 100]} fontSize={12} stroke="#64748B" />
          <ChartTooltip content={<FraudTooltip />} />
          {Object.keys(config).map((key) => (
            <Area key={`area-${key}`} type="linear" dataKey={key} fill={`url(#gradient${key})`} stroke="none" />
          ))}
          {Object.entries(config).map(([key, value]) => (
            <Line
              key={key}
              type="linear"
              dataKey={key}
              stroke={value.color}
              strokeWidth={1.5}
              strokeOpacity={0.4}
              dot={{ r: 3, fill: value.color, fillOpacity: 0.4 }}
              activeDot={{ r: 5, fill: value.color, fillOpacity: 0.4 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  </DashboardPanel>
)

