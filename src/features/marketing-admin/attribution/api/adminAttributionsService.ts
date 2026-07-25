import apiClient from "@/lib/apiClient"

// --- Raw backend shapes (src/schemas/admin_attributions.py) ---

export interface AdminAttributionApi {
    id: string
    marketer_id: string
    marketer_name: string | null
    agency_id: string | null
    claimed_agency_name: string | null
    method: string
    status: "pending" | "approved" | "denied" | "locked"
    has_conflict: boolean
    evidence: string | null
    created_at: string
}

export const getAdminAttributions = async (params?: {
    status?: string
    has_conflict?: boolean
    method?: string
}): Promise<AdminAttributionApi[]> => {
    const { data } = await apiClient.get<AdminAttributionApi[]>("/admin/attributions", { params })
    return data
}

export const approveAttribution = async (attributionId: string): Promise<AdminAttributionApi> => {
    const { data } = await apiClient.post<AdminAttributionApi>(`/admin/attributions/${attributionId}/approve`)
    return data
}

export const rejectAttribution = async (attributionId: string, reason: string): Promise<AdminAttributionApi> => {
    const { data } = await apiClient.post<AdminAttributionApi>(`/admin/attributions/${attributionId}/reject`, {
        reason,
    })
    return data
}
