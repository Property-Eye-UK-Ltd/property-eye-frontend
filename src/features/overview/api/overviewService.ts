import apiClient from "@/lib/apiClient"
import type {
    OverviewSummaryResponse,
    SeverityDistributionResponse,
    TopRecoveryItem,
    HighPriorityAlertItem,
    FraudGrowthPoint,
    NextSweepResponse,
} from "@/types/overview.types"

export const getOverviewSummary = async (): Promise<OverviewSummaryResponse> => {
    const { data } = await apiClient.get<OverviewSummaryResponse>("/dashboard/overview/summary")
    return data
}

export const getSeverityDistribution = async (): Promise<SeverityDistributionResponse> => {
    const { data } = await apiClient.get<SeverityDistributionResponse>(
        "/dashboard/overview/severity-distribution"
    )
    return data
}

export const getTopRecoveries = async (): Promise<TopRecoveryItem[]> => {
    const { data } = await apiClient.get<TopRecoveryItem[]>("/dashboard/overview/top-recoveries")
    return data
}

export const getHighPriorityAlerts = async (params?: {
    page?: number
    page_size?: number
}): Promise<HighPriorityAlertItem[]> => {
    const { data } = await apiClient.get<HighPriorityAlertItem[]>(
        "/dashboard/overview/high-priority-alerts",
        { params }
    )
    return data
}

// Backend stub — always returns []. Kept wired for real (not faked) so it
// starts working the moment the backend implements it; UI must render an
// honest empty/"coming soon" state, never synthetic data.
export const getFraudDetectionGrowth = async (range = "last_year"): Promise<FraudGrowthPoint[]> => {
    const { data } = await apiClient.get<FraudGrowthPoint[]>("/dashboard/overview/fraud-detection-growth", {
        params: { range },
    })
    return data
}

export const getNextSweep = async (): Promise<NextSweepResponse> => {
    const { data } = await apiClient.get<NextSweepResponse>("/dashboard/overview/next-sweep")
    return data
}
