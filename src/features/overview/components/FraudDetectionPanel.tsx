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
}

interface FraudDetectionPanelProps {
  data: FraudDataPoint[]
  config: Record<string, FraudSeriesConfig>
  showCategoryFilter?: boolean
}

const timeRangeOptions = [
  { label: "Last Month", value: "1" },
  { label: "Last 3 Months", value: "3" },
  { label: "Last 6 Months", value: "6" },
  { label: "Last Year", value: "12" },
  { label: "Last 2 Years", value: "24" },
]

// Generate daily data for last month (mock data)
const generateDailyData = (categories: string[]): FraudDataPoint[] => {
  const days = 30
  const dailyData: FraudDataPoint[] = []

  for (let i = 1; i <= days; i++) {
    const dataPoint: FraudDataPoint = { month: `Day ${i}` }
    categories.forEach(category => {
      dataPoint[category] = Math.floor(Math.random() * 100)
    })
    dailyData.push(dataPoint)
  }

  return dailyData
}

// Generate extended monthly data by repeating the base data
const generateExtendedMonthlyData = (baseData: FraudDataPoint[], monthsNeeded: number): FraudDataPoint[] => {
  const extended: FraudDataPoint[] = []
  const baseLength = baseData.length

  // Repeat the base data to fill the required months
  for (let i = 0; i < monthsNeeded; i++) {
    const baseIndex = i % baseLength
    const yearOffset = Math.floor(i / baseLength)
    const dataPoint = { ...baseData[baseIndex] }

    // Add year suffix for multi-year views
    if (yearOffset > 0) {
      dataPoint.month = `${dataPoint.month} '${24 - yearOffset}`
    }

    extended.push(dataPoint)
  }

  return extended
}

const FraudTooltip = ({ active, payload, label, config }: TooltipProps<number, string> & { config: Record<string, FraudSeriesConfig> }) => {
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
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span>{entry.name}</span>
              </div>
              <span className="font-semibold">
                {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const FraudDetectionPanel = ({ data, config, showCategoryFilter = true }: FraudDetectionPanelProps) => {
  const [timeRange, setTimeRange] = useState("12")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(config))

  const filteredData = useMemo(() => {
    const monthsToShow = parseInt(timeRange)

    // If "Last Month" is selected, generate daily data
    if (monthsToShow === 1) {
      return generateDailyData(Object.keys(config))
    }

    // If we need more months than we have, generate extended data
    if (monthsToShow > data.length) {
      return generateExtendedMonthlyData(data, monthsToShow)
    }

    // Otherwise, slice the monthly data
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
        // Don't allow deselecting all categories
        if (prev.length === 1) return prev
        return prev.filter((c) => c !== category)
      }
      return [...prev, category]
    })
  }

  return (
    <DashboardPanel
      title="Fraud Detection Over Time"
      icon={<Diagram size={16} variant="TwoTone" className="text-muted-foreground" />}
      hasBorder
      actions={
        <div className="flex items-center gap-4">
          {/* Time Range Filter */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-[140px] text-xs rounded-full">
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

          {/* Category Filter Pills - Conditionally rendered */}
          {showCategoryFilter && (
            <div className="flex items-center gap-2">
              {Object.entries(config).map(([key, value]) => {
                const isActive = selectedCategories.includes(key)
                return (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                      isActive
                        ? "bg-muted text-foreground border border-progress"
                        : "bg-muted text-muted-foreground border border-transparent hover:border-border"
                    )}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: value.color }}
                    />
                    {value.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      }
    >
      <ChartContainer config={filteredConfig} className="h-[280px] w-full -ml-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
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
              fontSize={12}
              stroke="#64748B"
              interval={0}
              angle={filteredData.length > 12 ? -45 : 0}
              textAnchor={filteredData.length > 12 ? "end" : "middle"}
              height={filteredData.length > 12 ? 60 : 30}
            />
            <YAxis domain={[0, 100]} fontSize={12} stroke="#64748B" />
            <ChartTooltip content={<FraudTooltip config={config} />} />
            {Object.keys(filteredConfig).map((key) => (
              <Area key={`area-${key}`} type="linear" dataKey={key} fill={`url(#gradient${key})`} stroke="none" />
            ))}
            {Object.entries(filteredConfig).map(([key, value]) => (
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
}
