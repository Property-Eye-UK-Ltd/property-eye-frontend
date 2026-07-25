import { ChartPoint } from "./marketerService"
import { DonutBreakdownDatum } from "@/features/marketing/components/DonutBreakdownPanel"

const DONUT_PALETTE = ["#4D66EA", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

const formatGbp = (value: number) => `£${value.toLocaleString()}`

export const toDonutData = (points: ChartPoint[]): DonutBreakdownDatum[] =>
    points.map((point, index) => ({
        name: point.label,
        value: point.value,
        valueLabel: formatGbp(point.value),
        color: DONUT_PALETTE[index % DONUT_PALETTE.length],
    }))
