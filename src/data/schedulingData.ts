/** Shared scheduling config — Admin Settings → Scheduling feeds Overview Next Sweep countdown */

export interface SweepSchedulingSettings {
    frequency: "annually" | "bi-annually" | "quarterly" | "monthly"
    /** ISO date strings for scheduled sweep dates */
    sweepDates: string[]
}

export const defaultSweepScheduling: SweepSchedulingSettings = {
    frequency: "bi-annually",
    sweepDates: ["2026-06-15", "2026-12-15"],
}

export function getNextSweepDate(settings: SweepSchedulingSettings = defaultSweepScheduling): Date {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const upcoming = settings.sweepDates
        .map((d) => {
            const date = new Date(d)
            date.setHours(0, 0, 0, 0)
            return date
        })
        .filter((d) => d >= today)
        .sort((a, b) => a.getTime() - b.getTime())

    if (upcoming.length > 0) return upcoming[0]

    // If all past, advance the earliest date by one year
    const sorted = [...settings.sweepDates]
        .map((d) => new Date(d))
        .sort((a, b) => a.getTime() - b.getTime())
    const next = sorted[0] ?? new Date()
    next.setFullYear(next.getFullYear() + 1)
    return next
}

export function formatSweepDateLabel(date: Date): string {
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function getDaysUntilSweep(date: Date = getNextSweepDate()): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(date)
    target.setHours(0, 0, 0, 0)
    return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
}
