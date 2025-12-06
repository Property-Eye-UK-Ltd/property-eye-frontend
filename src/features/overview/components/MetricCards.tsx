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
  columns?: 3 | 4
}

export const MetricCards = ({ metrics, columns = 4 }: MetricCardsProps) => (
  <div className={columns === 3 ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"}>
    {metrics.map((metric) => (
      <Card key={metric.title} className="relative overflow-hidden">
        <div className={cn("absolute top-0 left-0 right-0 h-2", metric.topBarClass)} />
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-normal text-muted-foreground">{metric.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-3xl font-medium text-foreground">{metric.value}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{metric.period}</span>
              {metric.change && (
                <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 font-medium text-green-600">
                  <ArrowUp size={12} />
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
