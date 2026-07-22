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

export const getAdminAgencyDetail = async (agencyId: string): Promise<AdminAgencyDetail> => {
    const { data } = await apiClient.get<AdminAgencyDetail>(`/dashboard/admin/agencies/${agencyId}`)
    return data
}
