import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GlobalCheckRunnerProps {
    className?: string
    /** Icon-only circular button for mobile header */
    compact?: boolean
}

export const GlobalCheckRunner = ({ className, compact = false }: GlobalCheckRunnerProps) => {
    const [isRunning, setIsRunning] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [isComplete, setIsComplete] = React.useState(false)

    const handleRunChecks = () => {
        if (isRunning) return

        setIsRunning(true)
        setIsComplete(false)
        setProgress(0)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsRunning(false)
                        setIsComplete(true)
                        setTimeout(() => setIsComplete(false), 3000)
                    }, 500)
                    return 100
                }
                const increment = Math.floor(Math.random() * 8) + 2
                return Math.min(prev + increment, 100)
            })
        }, 300)
    }

    if (compact) {
        return (
            <Button
                size="icon"
                onClick={handleRunChecks}
                disabled={isRunning || isComplete}
                aria-label={
                    isRunning
                        ? `Checks running ${progress}%`
                        : isComplete
                          ? "Checks complete"
                          : "Run checks"
                }
                className={cn(
                    "h-10 w-10 shrink-0 rounded-full",
                    isComplete
                        ? "border-0 bg-success text-white hover:bg-success"
                        : "bg-primary text-white hover:bg-primary/90",
                    className
                )}
            >
                {isRunning ? (
                    <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                ) : isComplete ? (
                    <TickCircle size={18} variant="Bold" />
                ) : (
                    <Play size={18} variant="Bold" />
                )}
            </Button>
        )
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button
                size="sm"
                onClick={handleRunChecks}
                disabled={isRunning || isComplete}
                className={cn(
                    "h-10 min-w-[180px] rounded-full px-6 transition-all duration-300",
                    isComplete
                        ? "border-0 bg-success text-white hover:bg-success"
                        : "bg-primary text-white hover:bg-primary/90"
                )}
            >
                {isRunning ? (
                    <div className="flex items-center gap-2.5">
                        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                        <span className="font-medium">Checks Running... {progress}%</span>
                    </div>
                ) : isComplete ? (
                    <div className="flex animate-in items-center gap-2 duration-300 zoom-in-95">
                        <TickCircle size={18} variant="Bold" />
                        <span>Checks Done</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Play size={16} variant="Bold" />
                        <span>Run Checks</span>
                    </div>
                )}
            </Button>
        </div>
    )
}
