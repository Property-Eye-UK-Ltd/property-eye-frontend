import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const GlobalCheckRunner = () => {
    const [isRunning, setIsRunning] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [isComplete, setIsComplete] = React.useState(false)
    
    // Mock scheduling logic
    const [canRun, setCanRun] = React.useState(true) 

    const handleRunChecks = () => {
        if (!canRun || isRunning) return

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
                        // Reset after showing completion for 3 seconds
                        setTimeout(() => setIsComplete(false), 3000)
                    }, 500)
                    return 100
                }
                const increment = Math.floor(Math.random() * 8) + 2
                return Math.min(prev + increment, 100)
            })
        }, 300)
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                onClick={handleRunChecks}
                disabled={!canRun || isRunning || isComplete}
                className={cn(
                    "rounded-full px-6 transition-all duration-300 min-w-[180px] h-10",
                    isComplete ? "bg-success hover:bg-success text-white border-0" : "bg-primary hover:bg-primary/90 text-white"
                )}
            >
                {isRunning ? (
                    <div className="flex items-center gap-2.5">
                        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                        <span className="font-medium">Checks Running... {progress}%</span>
                    </div>
                ) : isComplete ? (
                    <div className="flex items-center gap-2 animate-in zoom-in-95 duration-300">
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
