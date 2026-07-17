import apiClient from "@/lib/apiClient"
import type {
    OverviewSummaryResponse,
    SeverityDistributionResponse,
    TopRecoveryItem,
    HighPriorityAlertItem,
    FraudGrowthPoint,
    NextSweepResponse,
} from "@/types/overview.types"

export type OverviewPeriod = "all_time" | "h1" | "h2"

export const getOverviewSummary = async (period: OverviewPeriod = "all_time"): Promise<OverviewSummaryResponse> => {
    const { data } = await apiClient.get<OverviewSummaryResponse>("/dashboard/overview/summary", {
        params: { period },
    })
    return data
}

export const getSeverityDistribution = async (
    period: OverviewPeriod = "all_time"
): Promise<SeverityDistributionResponse> => {
    const { data } = await apiClient.get<SeverityDistributionResponse>(
        "/dashboard/overview/severity-distribution",
        { params: { period } }
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
    period?: OverviewPeriod
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
