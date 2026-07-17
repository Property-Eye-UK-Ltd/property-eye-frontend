// Mirrors backend/src/schemas/dashboard.py (Case Management section) and
// backend/src/schemas/enums.py::VerificationStatusEnum.
//
// NOTE: this is the automated Stage-1/Stage-2 verification signal, not a
// human-facing "open/closed" case-lifecycle status. The backend also has a
// separate `FraudMatch.case_status` field (open/under_legal_review/flagged/
// pending_approval/closed) used by the admin case-detail screenshot ("Closed
// (Confirmed Fraud)") — that field is NOT exposed on CaseDetailResponse today.
// Do not conflate the two; only `status` below actually exists on this
// endpoint's response.
export type CaseVerificationStatus = "suspicious" | "confirmed_fraud" | "not_fraud" | "error"

export interface CaseListItem {
    case_id: string
    property_address: string
    completion_date: string | null
    buyer_name: string | null
    status: CaseVerificationStatus
    created_at: string
}

export interface CaseListPaginatedResponse {
    items: CaseListItem[]
    total: number
    page: number
    page_size: number
}

export interface CaseSummaryResponse {
    total_fraud_alerts: number
    avg_fraud_likelihood: number
}

export interface CaseDetailResponse {
    case_id: string
    status: CaseVerificationStatus
    property_address: string
    owner_name: string | null
    agency_name: string | null
    date_withdrawn: string | null
    date_sold: string | null
    sold_amount: number | null
    buyer_name: string | null
    lr_completion_date: string | null
    lr_buyer_name: string | null
    fraud_score: number | null
    fraud_type: string | null
    severity: string | null
    created_at: string
    updated_at: string
}

export interface CaseTimelineEntryResponse {
    timestamp: string
    event_description: string
    actor_name: string
    actor_type: string
}
