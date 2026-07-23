import apiClient from "@/lib/apiClient"
import {
  ScanSession,
  ScanSessionResponse,
  ScanSessionListResponse,
  ScanSessionResult,
} from "@/types/scan-session.types"

/**
 * Get a specific scan session by ID
 */
export const getScanSession = async (sessionId: string): Promise<ScanSessionResponse> => {
  const { data } = await apiClient.get<ScanSessionResponse>(`/admin/scan-sessions/${sessionId}`)
  return data
}

/**
 * Create a new scan session by scanning a batch of fraud match IDs
 */
export const createScanSession = async (
  matchIds: string[],
  scanType: "manual_batch" | "auto_scheduled" = "manual_batch"
): Promise<ScanSessionResponse> => {
  const { data } = await apiClient.post<ScanSessionResponse>("/admin/scan-sessions", {
    fraud_match_ids: matchIds,
    scan_type: scanType,
  })
  return data
}

/**
 * Get list of all scan sessions with pagination
 */
export const getScanSessions = async (params?: {
  page?: number
  limit?: number
  agency_id?: string
}): Promise<ScanSessionListResponse> => {
  const { data } = await apiClient.get<ScanSessionListResponse>("/admin/scan-sessions", {
    params,
  })
  return data
}

/**
 * Get paginated results from a scan session
 */
export const getScanSessionResults = async (
  sessionId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  results: ScanSessionResult[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}> => {
  const { data } = await apiClient.get<any>(`/admin/scan-sessions/${sessionId}/results`, {
    params: { page, limit },
  })
  return data
}
