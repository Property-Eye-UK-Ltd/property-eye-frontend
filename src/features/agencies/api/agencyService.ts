import apiClient from "@/lib/apiClient"

export type AgencyIntegrationType = "ALTO" | "CSV" | "PDF" | "API" | "Reapit"

export interface AdminAgenciesSummary {
    total_agencies: number
    total_agency_users: number
    total_open_cases: number
}

export interface AdminAgencyListItem {
    id: string
    name: string | null
    plan_name: string | null
    users: number
    integration_type: AgencyIntegrationType | null
    fraud_detected: number
}

export interface AdminAgencyListResponse {
    agencies: AdminAgencyListItem[]
    total: number
    page: number
    page_size: number
}

export interface AdminAgencyDetail {
    id: string
    name: string | null
    address: string | null
    email: string | null
    phone_number: string | null
    logo_url: string | null
    integration_type: AgencyIntegrationType | null
    plan_name: string | null
    next_billing_date: string | null
    open_cases: number
    total_listings: number
    confirmed_fraud: number
    recovered_commission: number
}

export const getAdminAgenciesSummary = async (): Promise<AdminAgenciesSummary> => {
    const { data } = await apiClient.get<AdminAgenciesSummary>("/dashboard/admin/agencies/summary")
    return data
}

export const getAdminAgenciesList = async (params?: {
    page?: number
    page_size?: number
    search?: string
}): Promise<AdminAgencyListResponse> => {
    const { data } = await apiClient.get<AdminAgencyListResponse>("/dashboard/admin/agencies", { params })
    return data
}

export const getAdminAgenciesForExport = async (params?: {
    search?: string
}): Promise<AdminAgencyListResponse> => {
    const { data } = await apiClient.get<AdminAgencyListResponse>("/dashboard/admin/agencies", {
        params: { ...params, export: true },
    })
    return data
}

export const getAdminAgencyDetail = async (agencyId: string): Promise<AdminAgencyDetail> => {
    const { data } = await apiClient.get<AdminAgencyDetail>(`/dashboard/admin/agencies/${agencyId}`)
    return data
}

export type AgencyTeamRole = "agency_owner" | "agency_staff" | "agency_viewer"

export interface AdminAgencyUser {
    id: string
    name: string
    email: string
    role: AgencyTeamRole
    lastActive: string | null
    status: "Active" | "Pending" | "Inactive"
}

interface AdminAgencyUserApiResponse {
    id: string
    name: string
    email: string
    role: AgencyTeamRole
    last_active_at: string | null
    status: string
    avatar_url: string | null
}

const agencyUserStatusToLabel: Record<string, AdminAgencyUser["status"]> = {
    active: "Active",
    pending: "Pending",
    inactive: "Inactive",
}

const fromApiAgencyUser = (u: AdminAgencyUserApiResponse): AdminAgencyUser => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    lastActive: u.last_active_at,
    status: agencyUserStatusToLabel[u.status] ?? "Inactive",
})

export const getAdminAgencyUsers = async (
    agencyId: string,
    params?: { status?: string; sort_by?: string; sort_dir?: string }
): Promise<AdminAgencyUser[]> => {
    const { data } = await apiClient.get<AdminAgencyUserApiResponse[]>(
        `/dashboard/admin/agencies/${agencyId}/users`,
        { params }
    )
    return data.map(fromApiAgencyUser)
}
