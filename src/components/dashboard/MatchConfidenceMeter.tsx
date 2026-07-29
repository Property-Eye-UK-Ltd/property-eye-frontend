import { cn } from "@/lib/utils"

interface MatchConfidenceMeterProps {
  /** 0-100 */
  value: number
  className?: string
  /** Compact renders as an inline bar for table rows; default is the larger card layout. */
  variant?: "default" | "compact"
}

/**
 * Meter for FraudMatch.confidence_score ("Match Confidence" — how well the
 * PPD record matches the listing). Fill = --progress; track = the same hue
 * at low opacity, per the meter spec (lighter step of the same ramp, not a
 * generic gray), so the state reads across the whole bar.
 */
export const MatchConfidenceMeter = ({ value, className, variant = "default" }: MatchConfidenceMeterProps) => {
  const clamped = Math.max(0, Math.min(100, value))

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-end gap-2", className)}>
        <span className="text-sm font-medium tabular-nums">{Math.round(clamped)}%</span>
        <div
          className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-progress/15"
          role="meter"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Match confidence"
        >
          <div
            className="h-full rounded-full bg-progress transition-all"
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex w-full items-baseline justify-between">
        <span className="text-xs font-medium text-muted-foreground">Match Confidence</span>
        <span className="text-lg font-semibold text-foreground tabular-nums">{Math.round(clamped)}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-progress/15"
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Match confidence"
      >
        <div
          className="h-full rounded-full bg-progress transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground">How well the PPD sale record matches this listing</p>
    </div>
  )
}
