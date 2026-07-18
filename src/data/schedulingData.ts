/** Shared scheduling config — reference dates shown on Admin Settings → Scheduling. Run Checks is a manual, always-available action and is not gated by these dates. */

export interface SweepSchedulingSettings {
    frequency: "annually" | "bi-annually" | "quarterly" | "monthly"
    /** ISO date strings for scheduled sweep dates */
    sweepDates: string[]
}

export const defaultSweepScheduling: SweepSchedulingSettings = {
    frequency: "bi-annually",
    sweepDates: ["2026-06-15", "2026-12-15"],
}
