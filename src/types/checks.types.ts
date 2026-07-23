// Mirrors backend/src/schemas/dashboard.py (header-state, notifications, Run
// Checks sections).

export interface AgencyPortalHeaderStateResponse {
    agency_id: string
    last_data_pull_at: string | null
    // checks_used/checks_total_quota kept for backward compatibility with the
    // response shape, but no longer drive access decisions anywhere — scans
    // are gated purely on subscription status, not a quota. Do not build a
    // "check usage pill" implying a hard limit from these fields.
    checks_used: number
    checks_total_quota: number
    unread_notification_count: number
    next_scheduled_sweep_at: string | null
    run_checks_enabled: boolean
}

export interface NotificationResponse {
    id: string
    type: string
    title: string
    message: string
    is_read: boolean
    created_at: string
    metadata: Record<string, unknown> | null
}

export interface RunChecksResponse {
    job_id: string
}

// percent_complete is binary only server-side today (0.0 or 100.0, not
// granular) — UI must render a two-state (running/complete) indicator, not
// a percentage progress bar implying precision the backend can't deliver.
export interface RunChecksProgressResponse {
    status: string
    total_properties: number
    completed: number
    new_cases_found: number
    percent_complete: number
}

export interface ChecksHistoryItemResponse {
    job_id: string
    triggered_by: string
    triggered_at: string
    completed_at: string | null
    total_checked: number
    new_cases_found: number
    status: string
}

// Mirrors backend/src/schemas/sweep.py — admin-triggered platform/agency
// scan jobs, enqueued via the arq queue rather than run inline.
export interface TriggerSweepRunRequest {
    agency_ids?: string[]
}

export interface TriggerSweepRunResponse {
    enqueued: string[]
}

export interface SweepRunResponse {
    id: string
    status: string
    triggered_by: string
    total_agencies: number
    agencies_processed: number
    new_matches_found: number
    error_summary: string | null
    started_at: string
    completed_at: string | null
}

// Mirrors backend/src/schemas/agency.py::AgencySelectOptionSchema
export interface AgencySelectOption {
    id: string
    name: string | null
}
