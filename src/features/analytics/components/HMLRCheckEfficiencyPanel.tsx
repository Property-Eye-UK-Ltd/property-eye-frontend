import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { ChartCircle } from "iconsax-react"

interface HMLRCheckEfficiencyPanelProps {
    percentage: number
}

export const HMLRCheckEfficiencyPanel = ({ percentage }: HMLRCheckEfficiencyPanelProps) => {
    // Create 20 segments for the gauge
    const totalSegments = 20
    const filledSegments = Math.round((percentage / 100) * totalSegments)

    return (
        <DashboardPanel
            title="HMLR Check Efficiency"
            icon={<ChartCircle size={16} variant="TwoTone" className="text-muted-foreground" />}
            hasBorder
        >
            <div className="flex items-center justify-center">
                <div className="relative -mt-10 -mx-10" style={{ width: '600px', height: '200px' }}>
                    {/* Segments */}
                    <svg viewBox="0 0 200 120" className="w-full h-full">
                        {Array.from({ length: totalSegments }).map((_, index) => {
                            // Calculate angle for each segment (180 degrees total, from left to right)
                            // Increase gap to 7 degrees to maintain visual spacing with thicker stroke
                            const gapDegrees = 7
                            const segmentDegrees = (180 / totalSegments) - gapDegrees

                            const startAngle = 180 - (index * 180 / totalSegments) - (gapDegrees / 2)
                            const endAngle = startAngle - segmentDegrees

                            // Convert to radians
                            const startRad = (startAngle * Math.PI) / 180
                            const endRad = (endAngle * Math.PI) / 180

                            // Radii - adjusted to maintain visual size with thicker stroke
                            // Original visual: 49-86. New stroke 6 (3px/side).
                            // Path should be: 52-83
                            const innerRadius = 52
                            const outerRadius = 83
                            const centerX = 100
                            const centerY = 110

                            // Calculate points
                            // 1. Inner Start
                            const x1 = centerX + innerRadius * Math.cos(startRad)
                            const y1 = centerY - innerRadius * Math.sin(startRad)
                            // 2. Outer Start
                            const x2 = centerX + outerRadius * Math.cos(startRad)
                            const y2 = centerY - outerRadius * Math.sin(startRad)
                            // 3. Outer End
                            const x3 = centerX + outerRadius * Math.cos(endRad)
                            const y3 = centerY - outerRadius * Math.sin(endRad)
                            // 4. Inner End
                            const x4 = centerX + innerRadius * Math.cos(endRad)
                            const y4 = centerY - innerRadius * Math.sin(endRad)

                            const isFilled = index < filledSegments
                            const color = isFilled ? "#22C55E" : "#E5E7EB"

                            return (
                                <path
                                    key={index}
                                    d={`
                                        M ${x1} ${y1} 
                                        L ${x2} ${y2} 
                                        A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} 
                                        L ${x4} ${y4} 
                                        A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} 
                                        Z
                                    `}
                                    fill={color}
                                    stroke={color}
                                    strokeWidth="6"
                                    strokeLinejoin="round"
                                    className="transition-colors duration-300"
                                />
                            )
                        })}
                    </svg>

                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: '100px' }}>
                        <span className="text-4xl font-medium text-foreground">{percentage}%</span>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
