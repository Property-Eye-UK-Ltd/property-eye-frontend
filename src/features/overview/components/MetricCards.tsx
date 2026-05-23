import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUp } from "iconsax-react"

export interface MetricCard {
  title: string
  value: string
  period: string
  change: string
  topBarClass: string
}

interface MetricCardsProps {
  metrics: MetricCard[]
  columns?: 2 | 3 | 4
}

export const MetricCards = ({ metrics, columns = 4 }: MetricCardsProps) => {
  const gridClass = cn("grid grid-cols-2 gap-3 lg:gap-4", {
    "lg:grid-cols-2": columns === 2,
    "lg:grid-cols-3": columns === 3,
    "lg:grid-cols-4": columns === 4,
  })

  return (
    <div className={gridClass}>
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <div className={cn("absolute top-0 left-0 right-0 h-2", metric.topBarClass)} />
          <CardHeader className="p-3 pb-1 lg:p-6 lg:pb-3">
            <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 lg:p-6 lg:pt-0">
            <div className="space-y-1.5 lg:space-y-2">
              <p className="text-xl font-medium text-foreground lg:text-3xl">{metric.value}</p>
              <div className="flex items-center justify-between gap-2 text-[10px] lg:text-xs">
                <span className="truncate text-muted-foreground">{metric.period}</span>
                {metric.change && (
                  <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-green-500/10 px-1.5 py-0.5 font-medium text-green-600 lg:gap-1 lg:px-2 lg:py-1">
                    <ArrowUp size={10} className="lg:h-3 lg:w-3" />
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
