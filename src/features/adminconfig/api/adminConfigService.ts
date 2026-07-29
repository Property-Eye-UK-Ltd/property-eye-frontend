import apiClient from "@/lib/apiClient"

// --- Raw backend shapes (src/schemas/admin_commissions.py) ---

export interface CommissionRateSettingApi {
    rate_percent: number
    updated_at: string
}

export const getCommissionRateSetting = async (): Promise<CommissionRateSettingApi> => {
    const { data } = await apiClient.get<CommissionRateSettingApi>("/admin/commissions/settings/rate")
    return data
}

export const updateCommissionRateSetting = async (ratePercent: number): Promise<CommissionRateSettingApi> => {
    const { data } = await apiClient.patch<CommissionRateSettingApi>("/admin/commissions/settings/rate", {
        rate_percent: ratePercent,
    })
    return data
}
