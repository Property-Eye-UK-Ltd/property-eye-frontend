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

// --- Raw backend shapes (src/schemas/platform_settings.py) ---

export interface PlatformSettingsApi {
    property_eye_share_percent: number
    updated_at: string
}

export const getPlatformSettings = async (): Promise<PlatformSettingsApi> => {
    const { data } = await apiClient.get<PlatformSettingsApi>("/admin/settings/platform")
    return data
}

export const updatePlatformSettings = async (propertyEyeSharePercent: number): Promise<PlatformSettingsApi> => {
    const { data } = await apiClient.patch<PlatformSettingsApi>("/admin/settings/platform", {
        property_eye_share_percent: propertyEyeSharePercent,
    })
    return data
}
