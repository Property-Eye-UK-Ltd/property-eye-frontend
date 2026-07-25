import apiClient from "@/lib/apiClient"

export type AdminMarketerAuthStatus = "active" | "disabled"

export interface AdminMarketerRecord {
    id: string
    name: string | null
    email: string
    phone_number: string | null
    referral_code: string
    status: AdminMarketerAuthStatus
    created_at: string
}

export interface AdminUnattributedAgency {
    id: string
    name: string
    created_at: string
}

export interface AdminMarketerAttribution {
    id: string
    marketer_id: string
    agency_id: string
    claimed_agency_name: string
    method: string
    status: string
    approved_at: string | null
    created_at: string
}

export const getAdminMarketers = async (): Promise<AdminMarketerRecord[]> => {
    const { data } = await apiClient.get<AdminMarketerRecord[]>("/admin/marketers")
    return data
}

export const getAdminMarketerDetail = async (marketerId: string): Promise<AdminMarketerRecord> => {
    const { data } = await apiClient.get<AdminMarketerRecord>(`/admin/marketers/${marketerId}`)
    return data
}

export const updateAdminMarketerStatus = async (
    marketerId: string,
    status: AdminMarketerAuthStatus
): Promise<AdminMarketerRecord> => {
    const { data } = await apiClient.patch<AdminMarketerRecord>(`/admin/marketers/${marketerId}/status`, { status })
    return data
}

export const getUnattributedAgencies = async (): Promise<AdminUnattributedAgency[]> => {
    const { data } = await apiClient.get<AdminUnattributedAgency[]>(
        "/admin/marketers/attributions/unattributed-agencies"
    )
    return data
}

export const linkAgencyToMarketer = async (
    marketerId: string,
    agencyId: string
): Promise<AdminMarketerAttribution> => {
    const { data } = await apiClient.post<AdminMarketerAttribution>(`/admin/marketers/${marketerId}/attributions`, {
        agency_id: agencyId,
    })
    return data
}
