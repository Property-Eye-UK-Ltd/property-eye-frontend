import apiClient from "@/lib/apiClient"

export interface MarketerProfile {
    id: string
    name: string | null
    email: string
    phone_number: string | null
    referral_code: string
    status: string
}

export interface MarketerProfileUpdate {
    name?: string
    phone_number?: string
}

export interface RecentInvite {
    agency_name: string | null
    invited_email: string
    created_at: string
    status: string
}

export interface MarketerOverview {
    total_agencies_referred: number
    active_agencies: number
    fraud_cases_identified: number
    referral_code: string
    referral_link: string
    recent_invites: RecentInvite[]
}

export interface ReferredAgency {
    id: string
    name: string
    status: string
    created_at: string
    attribution_method: string
    total_fraud_value: number
    commission_earned: number
}

export interface AgencySearchResult {
    id: string
    name: string
}

export interface AttributionClaimRequest {
    agency_id: string
    evidence: string
}

export interface AttributionClaimResult {
    id: string
    claimed_agency_name: string
    evidence: string
    status: string
    created_at: string
}

export interface ReferralStats {
    referral_link: string
    invites_sent: number
    invites: RecentInvite[]
}

export interface AgencyInvite {
    id: string
    token: string
    marketer_id: string
    invited_email: string
    message: string | null
    status: string
    created_at: string
}

export interface FraudCase {
    id: string
    agency_name: string
    case_ref: string
    fraud_value: number
    status: string
    commission: number
    eligibility: string
}

export interface MarketerFraudCases {
    total_fraud_value: number
    cases_recovered: number
    commission_eligible: number
    cases: FraudCase[]
}

export interface ChartPoint {
    label: string
    value: number
}

export interface CommissionRow {
    id: string
    agency_name: string
    fraud_value: number
    commission_percent: number
    commission_amount: number
    status: string
    created_at: string
}

export interface MarketerCommissions {
    total_commission_earned: number
    pending_commission: number
    paid_commission: number
    chart_data: ChartPoint[]
    donut_data: ChartPoint[]
    commissions: CommissionRow[]
}

export interface CommissionsSummary {
    earned: number
    pending_approval: number
    approved_awaiting_payment: number
    paid: number
}

export interface Payout {
    id: string
    amount: number
    status: string
    created_at: string
}

export interface PayoutsOverview {
    total_paid_out: number
    paid_this_year: number
    pending_payout: number
    chart_data: ChartPoint[]
    donut_data: ChartPoint[]
    payments: Payout[]
}

export interface PayoutStatement {
    statement_url: string
}

export interface MarketerNotificationPreferences {
    email_enabled: boolean
    sms_enabled: boolean
    push_enabled: boolean
}

export const getMarketerProfile = async (): Promise<MarketerProfile> => {
    const { data } = await apiClient.get<MarketerProfile>("/marketer/profile")
    return data
}

export const updateMarketerProfile = async (payload: MarketerProfileUpdate): Promise<MarketerProfile> => {
    const { data } = await apiClient.patch<MarketerProfile>("/marketer/profile", payload)
    return data
}

export const getMarketerOverview = async (): Promise<MarketerOverview> => {
    const { data } = await apiClient.get<MarketerOverview>("/marketer/overview")
    return data
}

export const getMarketerAgencies = async (): Promise<ReferredAgency[]> => {
    const { data } = await apiClient.get<ReferredAgency[]>("/marketer/agencies")
    return data
}

export const getMarketerAgencyDetail = async (agencyId: string): Promise<ReferredAgency> => {
    const { data } = await apiClient.get<ReferredAgency>(`/marketer/agencies/${agencyId}`)
    return data
}

export const searchMarketerAgencies = async (q: string): Promise<AgencySearchResult[]> => {
    const { data } = await apiClient.get<AgencySearchResult[]>("/marketer/agencies/search", { params: { q } })
    return data
}

export const submitAttributionClaim = async (
    payload: AttributionClaimRequest
): Promise<AttributionClaimResult> => {
    const { data } = await apiClient.post<AttributionClaimResult>("/marketer/attributions/claim", payload)
    return data
}

export const getMarketerReferralStats = async (): Promise<ReferralStats> => {
    const { data } = await apiClient.get<ReferralStats>("/marketer/referral")
    return data
}

export const getMarketerInvites = async (): Promise<AgencyInvite[]> => {
    const { data } = await apiClient.get<AgencyInvite[]>("/marketer/invites")
    return data
}

export const getMarketerInviteDetail = async (inviteId: string): Promise<AgencyInvite> => {
    const { data } = await apiClient.get<AgencyInvite>(`/marketer/invites/${inviteId}`)
    return data
}

export const sendMarketerInvite = async (payload: { invited_email: string; message?: string }): Promise<AgencyInvite> => {
    const { data } = await apiClient.post<AgencyInvite>("/marketer/invites", payload)
    return data
}

export const getMarketerFraudCases = async (): Promise<MarketerFraudCases> => {
    const { data } = await apiClient.get<MarketerFraudCases>("/marketer/cases")
    return data
}

export const getMarketerCommissions = async (): Promise<MarketerCommissions> => {
    const { data } = await apiClient.get<MarketerCommissions>("/marketer/commissions")
    return data
}

export const getMarketerCommissionsSummary = async (): Promise<CommissionsSummary> => {
    const { data } = await apiClient.get<CommissionsSummary>("/marketer/commissions/summary")
    return data
}

export const getMarketerPayments = async (): Promise<PayoutsOverview> => {
    const { data } = await apiClient.get<PayoutsOverview>("/marketer/payments")
    return data
}

export const getMarketerPayoutStatement = async (payoutId: string): Promise<PayoutStatement> => {
    const { data } = await apiClient.get<PayoutStatement>(`/marketer/payments/${payoutId}/statement`)
    return data
}

export const getMarketerNotificationSettings = async (): Promise<MarketerNotificationPreferences> => {
    const { data } = await apiClient.get<MarketerNotificationPreferences>("/marketer/settings/notifications")
    return data
}

export const updateMarketerNotificationSettings = async (
    payload: Partial<MarketerNotificationPreferences>
): Promise<MarketerNotificationPreferences> => {
    const { data } = await apiClient.patch<MarketerNotificationPreferences>(
        "/marketer/settings/notifications",
        payload
    )
    return data
}
