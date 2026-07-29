import apiClient from "@/lib/apiClient"

// Derived composite of case_status + determination (open / closed as
// confirmed fraud / closed as not fraudulent) — distinct from the raw
// verification_status (automated scan result) and case_status (admin
// lifecycle state) fields used on the admin side. Field is still named
// `status` (matches the backend wire format exactly), but its own type name
// (AgencyCaseStatus) makes clear it's neither of those two.
export type AgencyCaseStatus = "open" | "closed_confirmed_fraud" | "closed_not_fraudulent"

export interface CaseListItem {
    case_id: string
    property_address: string
    completion_date: string | null
    buyer_name: string | null
    status: AgencyCaseStatus
    created_at: string
}

export interface CaseListPaginatedResponse {
    items: CaseListItem[]
    total: number
    page: number
    page_size: number
}

export interface CaseSummary {
    total_fraud_alerts: number
    avg_fraud_likelihood: number
}

export interface CaseDetail {
    case_id: string
    status: AgencyCaseStatus
    property_address: string
    owner_name: string | null
    agency_name: string | null
    date_withdrawn: string | null
    date_sold: string | null
    buyer_name: string | null
    lr_completion_date: string | null
    lr_buyer_name: string | null
    created_at: string
    updated_at: string
    agency_dispute_status: "none" | "open" | "resolved" | null
}

export interface CaseTimelineEntry {
    timestamp: string
    event_description: string
    actor_name: string
    actor_type: string
}

export const getCases = async (params?: {
    period?: string
    status?: string
    page?: number
    page_size?: number
    sort_by?: string
    sort_dir?: string
}): Promise<CaseListPaginatedResponse> => {
    const { data } = await apiClient.get<CaseListPaginatedResponse>("/dashboard/cases", { params })
    return data
}

export const getCasesSummary = async (period?: string): Promise<CaseSummary> => {
    const { data } = await apiClient.get<CaseSummary>("/dashboard/cases/summary", { params: { period } })
    return data
}

export const getCaseDetail = async (caseId: string): Promise<CaseDetail> => {
    const { data } = await apiClient.get<CaseDetail>(`/dashboard/cases/${caseId}`)
    return data
}

export const getCaseTimeline = async (caseId: string): Promise<CaseTimelineEntry[]> => {
    const { data } = await apiClient.get<CaseTimelineEntry[]>(`/dashboard/cases/${caseId}/timeline`)
    return data
}

export const raiseDispute = async (caseId: string, reason: string): Promise<void> => {
    await apiClient.post(`/fraud/reports/${caseId}/dispute`, { reason })
}
