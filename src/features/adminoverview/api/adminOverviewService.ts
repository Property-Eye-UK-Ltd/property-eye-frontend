import apiClient from "@/lib/apiClient"

// --- Raw backend shapes (src/schemas/admin_overview.py) ---

export interface AdminOverviewSummaryApi {
    total_lr_checks: number
    total_agencies: number
    total_identified_leaks: number
    total_income_gbp: number
    commission_recovered_total: number
    clearance_rate_percent: number
    active_marketers: number
}

export interface AdminSeverityDistributionApi {
    low: number
    medium: number
    high: number
    critical: number
}

export interface AdminRevenueByPlanItemApi {
    plan_name: string
    total_income_gbp: number
}

export interface AdminFraudGrowthPointApi {
    period_label: string
    count: number
}

export const getAdminOverviewSummary = async (): Promise<AdminOverviewSummaryApi> => {
    const { data } = await apiClient.get<AdminOverviewSummaryApi>("/admin/overview/summary")
    return data
}

export const getAdminSeverityDistribution = async (): Promise<AdminSeverityDistributionApi> => {
    const { data } = await apiClient.get<AdminSeverityDistributionApi>("/admin/overview/severity-distribution")
    return data
}

export const getAdminRevenueByPlan = async (): Promise<AdminRevenueByPlanItemApi[]> => {
    const { data } = await apiClient.get<AdminRevenueByPlanItemApi[]>("/admin/overview/revenue-by-plan")
    return data
}

export const getAdminFraudDetectionGrowth = async (): Promise<AdminFraudGrowthPointApi[]> => {
    const { data } = await apiClient.get<AdminFraudGrowthPointApi[]>("/admin/overview/fraud-detection-growth")
    return data
}
