import apiClient from "@/lib/apiClient"
import type {
    AgencyPortalHeaderStateResponse,
    AgencySelectOption,
    RunChecksResponse,
    RunChecksProgressResponse,
    ChecksHistoryItemResponse,
    SweepRunResponse,
    TriggerSweepRunResponse,
} from "@/types/checks.types"

export const getHeaderState = async (): Promise<AgencyPortalHeaderStateResponse> => {
    const { data } = await apiClient.get<AgencyPortalHeaderStateResponse>("/dashboard/header-state")
    return data
}

export const runChecks = async (): Promise<RunChecksResponse> => {
    const { data } = await apiClient.post<RunChecksResponse>("/dashboard/checks/run")
    return data
}

export const getChecksProgress = async (jobId: string): Promise<RunChecksProgressResponse> => {
    const { data } = await apiClient.get<RunChecksProgressResponse>(`/dashboard/checks/progress/${jobId}`)
    return data
}

export interface PaginatedChecksHistoryResponse {
    items: ChecksHistoryItemResponse[]
    total: number
}

export const getChecksHistory = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedChecksHistoryResponse> => {
    const { data } = await apiClient.get<PaginatedChecksHistoryResponse>("/dashboard/checks/history", {
        params: { page, limit },
    })
    return data
}

// Admin-only: triggers Stage 1 PPD scan jobs via the queue. Omit agencyIds
// (or pass an empty array) to run the full platform; pass specific agency
// IDs to scope the run to just those agencies.
export const runAdminChecks = async (agencyIds?: string[]): Promise<TriggerSweepRunResponse> => {
    const { data } = await apiClient.post<TriggerSweepRunResponse>("/admin/sweep/run", {
        agency_ids: agencyIds && agencyIds.length > 0 ? agencyIds : undefined,
    })
    return data
}

export const getAdminAgencyList = async (): Promise<AgencySelectOption[]> => {
    const { data } = await apiClient.get<AgencySelectOption[]>("/agencies/select")
    return data
}

export const getAdminSweepRun = async (sweepRunId: string): Promise<SweepRunResponse> => {
    const { data } = await apiClient.get<SweepRunResponse>(`/admin/sweep/${sweepRunId}`)
    return data
}
