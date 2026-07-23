import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { RunChecksModal } from "@/components/dashboard/RunChecksModal"
import { getAdminSweepRun } from "@/features/checks/api/checksService"

interface GlobalCheckRunnerProps {
    className?: string
    /** Icon-only circular button for mobile header */
    compact?: boolean
}

const POLL_INTERVAL_MS = 3000

export const GlobalCheckRunner = ({ className, compact = false }: GlobalCheckRunnerProps) => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [isRunning, setIsRunning] = React.useState(false)
    const [isComplete, setIsComplete] = React.useState(false)

    const pollRunningIds = async (sweepRunIds: string[]) => {
        let remaining = sweepRunIds
        while (remaining.length > 0) {
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
            const results = await Promise.all(
                remaining.map((id) =>
                    getAdminSweepRun(id).catch(() => null)
                )
            )
            remaining = remaining.filter((id, idx) => {
                const run = results[idx]
                return !run || run.status === "running"
            })
        }
    }

    const handleRunStarted = (enqueuedIds: string[]) => {
        setIsRunning(true)
        setIsComplete(false)

        pollRunningIds(enqueuedIds).finally(() => {
            setIsRunning(false)
            setIsComplete(true)
            setTimeout(() => setIsComplete(false), 3000)
        })
    }

    if (compact) {
        return (
            <>
                <Button
                    size="icon"
                    onClick={() => setModalOpen(true)}
                    disabled={isRunning || isComplete}
                    aria-label={
                        isRunning ? "Checks running" : isComplete ? "Checks complete" : "Run checks"
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
                <RunChecksModal open={modalOpen} onOpenChange={setModalOpen} onRunStarted={handleRunStarted} />
            </>
        )
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button
                size="sm"
                onClick={() => setModalOpen(true)}
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
                        <span className="font-medium">Checks Running...</span>
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
            <RunChecksModal open={modalOpen} onOpenChange={setModalOpen} onRunStarted={handleRunStarted} />
        </div>
    )
}
