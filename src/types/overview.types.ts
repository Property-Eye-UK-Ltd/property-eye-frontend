// Mirrors backend/src/schemas/dashboard.py (Overview section).

export interface OverviewSummaryResponse {
    total_fraud_alerts: number
    total_recoveries: number
    total_checks: number
    total_recovery_revenue: number
    // Hardcoded to 0 server-side today (no real period-over-period
    // comparison implemented) — render as-is, known-inert.
    delta_fraud_alerts: number
    delta_recoveries: number
    delta_checks: number
}

export interface SeverityDistributionResponse {
    low: number
    medium: number
    high: number
    critical: number
}

export interface TopRecoveryItem {
    property_address: string
    location: string
    recovered_amount: number
}

export interface HighPriorityAlertItem {
    case_id: string
    property_address: string
    fraud_score: number | null
    severity: string
    date_detected: string
}

// GET /dashboard/overview/fraud-detection-growth — backend stub, always
// returns []. Render an honest empty/"coming soon" state, not fake data.
export interface FraudGrowthPoint {
    period_label: string
    count: number
}

export interface NextSweepResponse {
    next_scheduled_sweep_date: string | null
    days_remaining: number
}
