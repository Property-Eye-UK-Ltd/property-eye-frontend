import apiClient from "@/lib/apiClient"
import {
    AdminCaseStatus,
    AgencyCase,
    CaseDetermination,
    ReasonForClearing,
    RecoveryOutcome,
} from "@/data/agencyCasesData"
import { PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"

// --- Raw backend shapes (src/schemas/register_extract.py) ---

export interface AdminFraudCaseApi {
    id: string
    property_listing_id: string
    agency_id: string
    agency_name: string
    property_address: string
    title_number: string | null
    client_name: string | null
    vendor_name: string | null
    price: string | null
    postcode: string | null
    withdrawn_date: string | null
    confidence_score: number
    risk_level: string | null
    verification_status: string
    verified_owner_name: string | null
    is_confirmed_fraud: boolean
    detected_at: string
    verified_at: string | null
    register_extract_status: string | null
    register_extract_fetched_at: string | null
    case_status: string
    determination: string | null
    recovery_outcome: string | null
    recovered_amount: number | null
    agency_share: number | null
    property_eye_share: number | null
    reason_for_clearing: string | null
    reason_for_clearing_note: string | null
    submitted_at: string | null
    closed_at: string | null
    return_reason: string | null
    flag_note: string | null
    flag_active: boolean
}

export interface AdminFraudCaseDetailApi extends AdminFraudCaseApi {
    ppd_transaction_id: string | null
    ppd_price: number | null
    ppd_transfer_date: string | null
    ppd_postcode: string | null
    ppd_full_address: string | null
    address_similarity: number
}

export interface AdminFraudCaseListResponse {
    items: AdminFraudCaseApi[]
    total: number
    page: number
    page_size: number
}

export interface AdminFraudAgencyFilter {
    id: string
    name: string
}

export interface AdminCaseTimelineEntry {
    timestamp: string
    event_description: string
    actor_name: string
    actor_type: string
}

export interface AgencyDisputeApi {
    id: string
    agency_id: string
    fraud_match_id: string
    reason: string
    status: "open" | "resolved"
    resolution_notes: string | null
    resolved_at: string | null
    created_at: string
}

// --- Status/enum mapping between backend snake_case and existing UI labels ---

const caseStatusToAdminStatus: Record<string, AdminCaseStatus> = {
    open: "Open",
    under_legal_review: "Under Legal Review",
    flagged: "Flagged",
    pending_approval: "Pending Approval",
    closed: "Closed",
}

export const adminStatusToCaseStatus: Record<AdminCaseStatus, string> = {
    Open: "open",
    "Under Legal Review": "under_legal_review",
    Flagged: "flagged",
    "Pending Approval": "pending_approval",
    Closed: "closed",
}

const determinationToLabel: Record<string, CaseDetermination> = {
    fraudulent: "Fraudulent (Confirmed)",
    not_fraudulent: "Not Fraudulent (Cleared)",
}

export const determinationToApi: Record<CaseDetermination, string> = {
    "Fraudulent (Confirmed)": "fraudulent",
    "Not Fraudulent (Cleared)": "not_fraudulent",
}

const recoveryOutcomeToLabel: Record<string, RecoveryOutcome> = {
    recovered: "Recovered",
    not_recovered: "Unrecovered",
    n_a: "N/A",
}

export const recoveryOutcomeToApi: Record<RecoveryOutcome, string> = {
    Recovered: "recovered",
    Unrecovered: "not_recovered",
    "N/A": "n_a",
}

const reasonForClearingToLabel: Record<string, ReasonForClearing> = {
    data_error: "Data Error",
    coincidental_match: "Coincidental Match",
    agency_documentation_provided: "Agency Documentation Provided",
    other: "Other",
}

export const reasonForClearingToApi: Record<ReasonForClearing, string> = {
    "Data Error": "data_error",
    "Coincidental Match": "coincidental_match",
    "Agency Documentation Provided": "agency_documentation_provided",
    Other: "other",
}

const severityFromRisk: Record<string, AgencyCase["severity"]> = {
    CRITICAL: "Critical",
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
}

const formatGbp = (amount: number | null): string | undefined => {
    if (amount === null || amount === undefined) return undefined
    return `£${Math.round(amount).toLocaleString("en-GB")}`
}

const formatDate = (iso: string | null): string => {
    if (!iso) return "—"
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export const fromApiAdminCase = (c: AdminFraudCaseApi): AgencyCase => ({
    id: c.id,
    caseId: c.id,
    propertyAddress: c.property_address,
    completionDate: formatDate(c.withdrawn_date),
    withdrawalDate: formatDate(c.withdrawn_date),
    saleDate: formatDate(c.withdrawn_date),
    purchaserName: c.client_name ?? "Unknown Purchaser",
    hasRegisterCheck: Boolean(c.register_extract_status),
    verificationStatus: c.verification_status as AgencyCase["verificationStatus"],
    scanDate: c.register_extract_fetched_at,
    agencyName: c.agency_name,
    adminStatus: caseStatusToAdminStatus[c.case_status] ?? "Open",
    severity: (c.risk_level && severityFromRisk[c.risk_level]) || "Medium",
    determination: c.determination ? determinationToLabel[c.determination] : undefined,
    recoveryOutcome: c.recovery_outcome ? recoveryOutcomeToLabel[c.recovery_outcome] : undefined,
    recoveredAmount: formatGbp(c.recovered_amount),
    reasonForClearing: c.reason_for_clearing ? reasonForClearingToLabel[c.reason_for_clearing] : undefined,
    clearingReason: c.reason_for_clearing_note ?? undefined,
    flagNote: c.flag_note ?? undefined,
    returnNote: c.return_reason ?? undefined,
    submittedAt: c.submitted_at ?? undefined,
    sellerName: c.vendor_name ?? "—",
    amount: c.price ? (c.price.startsWith("£") ? c.price : `£${Number(c.price).toLocaleString("en-GB")}`) : "—",
})

export const getAdminCases = async (params?: {
    page?: number
    page_size?: number
    search?: string
    status?: string
    agency_ids?: string[]
}): Promise<{ items: AgencyCase[]; total: number; page: number; page_size: number }> => {
    const { data } = await apiClient.get<AdminFraudCaseListResponse>("/admin/fraud-reports", { params })
    return {
        items: data.items.map(fromApiAdminCase),
        total: data.total,
        page: data.page,
        page_size: data.page_size,
    }
}

export const getAdminCasesForExport = async (params?: {
    search?: string
    status?: string
    agency_ids?: string[]
    detected_from?: string
    detected_to?: string
}): Promise<{ items: AgencyCase[]; total: number }> => {
    const { data } = await apiClient.get<AdminFraudCaseListResponse>("/admin/fraud-reports", {
        params: { ...params, export: true },
    })
    return {
        items: data.items.map(fromApiAdminCase),
        total: data.total,
    }
}

export const getAdminCaseAgencies = async (): Promise<AdminFraudAgencyFilter[]> => {
    const { data } = await apiClient.get<AdminFraudAgencyFilter[]>("/admin/fraud-reports/agencies")
    return data
}

export const getAdminCaseDetail = async (caseId: string): Promise<AgencyCase> => {
    const { data } = await apiClient.get<AdminFraudCaseDetailApi>(`/admin/fraud-reports/${caseId}`)
    return fromApiAdminCase(data)
}

export const getAdminCasePropertyParties = async (caseId: string): Promise<PropertyPartiesData> => {
    const { data } = await apiClient.get<AdminFraudCaseDetailApi>(`/admin/fraud-reports/${caseId}`)
    return {
        owner: data.vendor_name ?? data.verified_owner_name ?? "Unknown Owner",
        agency: data.agency_name,
        dateWithdrawn: formatDate(data.withdrawn_date),
        dateSold: formatDate(data.ppd_transfer_date),
        soldAmount: data.ppd_price ? formatGbp(data.ppd_price) ?? "—" : (data.price ?? "—"),
        purchaser: data.client_name ?? "Unknown Purchaser",
        landRegistry: {
            completionDate: formatDate(data.ppd_transfer_date),
            purchaserName: data.verified_owner_name ?? data.client_name ?? "—",
        },
    }
}

export const getAdminCaseTimeline = async (caseId: string): Promise<AdminCaseTimelineEntry[]> => {
    const { data } = await apiClient.get<AdminCaseTimelineEntry[]>(`/admin/fraud-reports/${caseId}/timeline`)
    return data
}

export const startCaseReview = async (caseId: string): Promise<AgencyCase> => {
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/admin/fraud-reports/${caseId}/start-review`)
    return fromApiAdminCase(data)
}

export interface SubmitDeterminationPayload {
    determination: CaseDetermination
    recoveryOutcome: RecoveryOutcome
    recoveredAmount?: string
    reasonForClearing?: ReasonForClearing
    clearingReason?: string
}

export const submitCaseDetermination = async (
    caseId: string,
    payload: SubmitDeterminationPayload
): Promise<AgencyCase> => {
    const amount = payload.recoveredAmount
        ? parseFloat(payload.recoveredAmount.replace(/[£,]/g, ""))
        : undefined
    const isFraudulent = payload.determination === "Fraudulent (Confirmed)"
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/fraud/reports/${caseId}/submit-for-approval`, {
        determination: determinationToApi[payload.determination],
        recovery_outcome: isFraudulent ? recoveryOutcomeToApi[payload.recoveryOutcome] : undefined,
        recovered_amount: isFraudulent ? amount : undefined,
        reason_for_clearing: !isFraudulent && payload.reasonForClearing
            ? reasonForClearingToApi[payload.reasonForClearing]
            : undefined,
        reason_for_clearing_note: payload.clearingReason,
    })
    return fromApiAdminCase(data)
}

export const approveAndCloseCase = async (caseId: string): Promise<AgencyCase> => {
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/admin/fraud-reports/${caseId}/approve`)
    return fromApiAdminCase(data)
}

export const returnCase = async (caseId: string, returnReason: string): Promise<AgencyCase> => {
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/admin/fraud-reports/${caseId}/return`, {
        return_reason: returnReason,
    })
    return fromApiAdminCase(data)
}

export const flagCase = async (caseId: string, flagNote: string): Promise<AgencyCase> => {
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/admin/fraud-reports/${caseId}/flag`, {
        flag_note: flagNote,
    })
    return fromApiAdminCase(data)
}

export const reopenCase = async (caseId: string): Promise<AgencyCase> => {
    const { data } = await apiClient.post<AdminFraudCaseApi>(`/admin/fraud-reports/${caseId}/reopen`)
    return fromApiAdminCase(data)
}

export const getCaseDisputes = async (params: {
    fraud_match_id?: string
    agency_id?: string
    status?: string
}): Promise<AgencyDisputeApi[]> => {
    const { data } = await apiClient.get<AgencyDisputeApi[]>("/admin/agency-disputes", { params })
    return data
}

export const resolveAgencyDisputeApi = async (
    disputeId: string,
    resolutionNotes: string
): Promise<AgencyDisputeApi> => {
    const { data } = await apiClient.post<AgencyDisputeApi>(`/admin/agency-disputes/${disputeId}/resolve`, {
        resolution_notes: resolutionNotes,
    })
    return data
}
