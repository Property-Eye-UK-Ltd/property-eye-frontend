import { useState, useMemo } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Diagram } from "iconsax-react"
import { TooltipProps, ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Area, Line } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface FraudDataPoint {
  month: string
  [key: string]: number | string
}

export interface FraudSeriesConfig {
  label: string
  color: string
  strokeOpacity?: number
}

interface FraudDetectionPanelProps {
  data: FraudDataPoint[]
  config: Record<string, FraudSeriesConfig>
  showCategoryFilter?: boolean
  showArea?: boolean
  title?: string
  yAxisDomain?: [number | "auto", number | "auto"]
  valueFormatter?: (value: number) => string
  yAxisTickFormatter?: (value: number) => string
}

const timeRangeOptions = [
  { label: "Last Month", value: "1" },
  { label: "Last 3 Months", value: "3" },
  { label: "Last 6 Months", value: "6" },
  { label: "Last Year", value: "12" },
  { label: "Last 2 Years", value: "24" },
]

const generateDailyData = (categories: string[]): FraudDataPoint[] => {
  const days = 30
  const dailyData: FraudDataPoint[] = []

  for (let i = 1; i <= days; i++) {
    const dataPoint: FraudDataPoint = { month: `Day ${i}` }
    categories.forEach((category) => {
      dataPoint[category] = Math.floor(Math.random() * 100)
    })
    dailyData.push(dataPoint)
  }

  return dailyData
}

const generateExtendedMonthlyData = (baseData: FraudDataPoint[], monthsNeeded: number): FraudDataPoint[] => {
  const extended: FraudDataPoint[] = []
  const baseLength = baseData.length

  for (let i = 0; i < monthsNeeded; i++) {
    const baseIndex = i % baseLength
    const yearOffset = Math.floor(i / baseLength)
    const dataPoint = { ...baseData[baseIndex] }

    if (yearOffset > 0) {
      dataPoint.month = `${dataPoint.month} '${24 - yearOffset}`
    }

    extended.push(dataPoint)
  }

  return extended
}

const FraudTooltip = ({
  active,
  payload,
  label,
  config,
  valueFormatter = (value) => value.toLocaleString(),
}: TooltipProps<number, string> & {
  config: Record<string, FraudSeriesConfig>
  valueFormatter?: (value: number) => string
}) => {
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
        {uniquePayload.map((entry) => {
          const dataKey = String(entry.dataKey)
          const color = config[dataKey]?.color || entry.stroke || entry.fill || "#000"

          return (
            <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs text-foreground">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="font-semibold">
                {typeof entry.value === "number" ? valueFormatter(entry.value) : entry.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const FraudDetectionPanel = ({
  data,
  config,
  showCategoryFilter = true,
  showArea = true,
  title = "Fraud Detection Over Time",
  yAxisDomain = [0, 100],
  valueFormatter,
  yAxisTickFormatter,
}: FraudDetectionPanelProps) => {
  const [timeRange, setTimeRange] = useState("12")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(config))

  const filteredData = useMemo(() => {
    const monthsToShow = parseInt(timeRange)

    if (monthsToShow === 1) {
      return generateDailyData(Object.keys(config))
    }

    if (monthsToShow > data.length) {
      return generateExtendedMonthlyData(data, monthsToShow)
    }

    return data.slice(-monthsToShow)
  }, [data, timeRange, config])

  const filteredConfig = useMemo(() => {
    return Object.fromEntries(
      Object.entries(config).filter(([key]) => selectedCategories.includes(key))
    )
  }, [config, selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        if (prev.length === 1) return prev
        return prev.filter((c) => c !== category)
      }
      return [...prev, category]
    })
  }

  return (
    <DashboardPanel
      title={title}
      icon={<Diagram size={16} variant="TwoTone" className="text-muted-foreground" />}
      hasBorder
      compactContent
      actions={
        <div className="flex max-w-none flex-nowrap items-center justify-end gap-1.5 overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-7 w-[108px] shrink-0 rounded-full text-[11px] lg:h-8 lg:w-[130px] lg:text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showCategoryFilter &&
            Object.entries(config).map(([key, value]) => {
              const isActive = selectedCategories.includes(key)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleCategory(key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium transition-all lg:gap-1.5 lg:px-2.5 lg:py-1.5 lg:text-xs",
                    isActive
                      ? "border border-progress bg-muted text-foreground"
                      : "border border-transparent bg-muted text-muted-foreground hover:border-border"
                  )}
                >
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full lg:h-2 lg:w-2"
                    style={{ backgroundColor: value.color }}
                  />
                  <span className="whitespace-nowrap">{value.label}</span>
                </button>
              )
            })}
        </div>
      }
    >
      <ChartContainer config={filteredConfig} className="h-[240px] w-full sm:h-[260px] lg:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ left: -8, right: 4, top: 4, bottom: 0 }}>
            <defs>
              {Object.entries(filteredConfig).map(([key, value]) => (
                <linearGradient key={key} id={`gradient${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={value.color} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={value.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              fontSize={11}
              stroke="#64748B"
              interval="preserveStartEnd"
              angle={filteredData.length > 12 ? -45 : 0}
              textAnchor={filteredData.length > 12 ? "end" : "middle"}
              height={filteredData.length > 12 ? 48 : 24}
            />
            <YAxis
              domain={yAxisDomain}
              fontSize={11}
              stroke="#64748B"
              width={yAxisTickFormatter ? 44 : 32}
              tickFormatter={yAxisTickFormatter}
            />
            <ChartTooltip content={<FraudTooltip config={config} valueFormatter={valueFormatter} />} />
            {(showArea ?? true) && Object.keys(filteredConfig).map((key) => (
              <Area key={`area-${key}`} type="linear" dataKey={key} fill={`url(#gradient${key})`} stroke="none" />
            ))}
            {Object.entries(filteredConfig).map(([key, value]) => (
              <Line
                key={key}
                type="linear"
                dataKey={key}
                stroke={value.color}
                strokeWidth={1.5}
                strokeOpacity={value.strokeOpacity ?? 0.4}
                dot={{ r: 2, fill: value.color, fillOpacity: value.strokeOpacity ?? 0.4 }}
                activeDot={{ r: 4, fill: value.color, fillOpacity: value.strokeOpacity ?? 0.4 }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardPanel>
  )
}
