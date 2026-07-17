import apiClient from "@/lib/apiClient"
import type {
    AgencyPortalHeaderStateResponse,
    RunChecksResponse,
    RunChecksProgressResponse,
    ChecksHistoryItemResponse,
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

export const getChecksHistory = async (): Promise<ChecksHistoryItemResponse[]> => {
    const { data } = await apiClient.get<ChecksHistoryItemResponse[]>("/dashboard/checks/history")
    return data
}
