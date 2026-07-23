import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { RunChecksModal } from "@/components/dashboard/RunChecksModal"
import { getAdminSweepRun } from "@/features/checks/api/checksService"
import { toast } from "@/hooks/use-toast"

interface GlobalCheckRunnerProps {
    className?: string
    /** Icon-only circular button for mobile header */
    compact?: boolean
}

const POLL_INTERVAL_MS = 3000
// Safety cutoff so a wedged worker (or one that was never started) doesn't
// leave the button spinning forever — surfaces as an error instead.
const MAX_POLL_MS = 5 * 60 * 1000

const PENDING_STATUSES = new Set(["queued", "running"])

export const GlobalCheckRunner = ({ className, compact = false }: GlobalCheckRunnerProps) => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [isRunning, setIsRunning] = React.useState(false)
    const [isComplete, setIsComplete] = React.useState(false)
    const [progressLabel, setProgressLabel] = React.useState<string | null>(null)

    const pollUntilSettled = async (sweepRunIds: string[]) => {
        let remaining = sweepRunIds
        const deadline = Date.now() + MAX_POLL_MS
        let timedOut = false

        while (remaining.length > 0) {
            if (Date.now() > deadline) {
                timedOut = true
                break
            }
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
            const results = await Promise.all(remaining.map((id) => getAdminSweepRun(id).catch(() => null)))

            const processed = results.reduce((sum, run) => sum + (run?.agencies_processed ?? 0), 0)
            const total = results.reduce((sum, run) => sum + (run?.total_agencies ?? 0), 0)
            if (total > 0) {
                setProgressLabel(`${processed} of ${total} agencies scanned`)
            }

            remaining = remaining.filter((id, idx) => {
                const run = results[idx]
                return !run || PENDING_STATUSES.has(run.status)
            })
        }

        return timedOut
    }

    const handleRunStarted = (enqueuedIds: string[]) => {
        setIsRunning(true)
        setIsComplete(false)
        setProgressLabel(null)

        pollUntilSettled(enqueuedIds)
            .then((timedOut) => {
                if (timedOut) {
                    toast({
                        title: "Still running",
                        description: "Checks are taking longer than expected. They'll keep running in the background — check back shortly.",
                    })
                    return
                }
                setIsComplete(true)
                setTimeout(() => setIsComplete(false), 3000)
            })
            .finally(() => {
                setIsRunning(false)
                setProgressLabel(null)
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
                        isRunning
                            ? progressLabel ?? "Checks running"
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
                        <span className="font-medium">{progressLabel ?? "Checks Running..."}</span>
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
