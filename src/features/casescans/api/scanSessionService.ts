import apiClient from "@/lib/apiClient"
import {
  ScanSession,
  ScanSessionResponse,
  ScanSessionListResponse,
  ScanSessionResult,
  RegisterExtractData,
} from "@/types/scan-session.types"

/**
 * Fetch (and cache) the full register extract for a single case.
 * GET .../register-extract performs the live HMLR fetch itself when no
 * cached extract exists yet, so this doubles as the "verify this case
 * against the Register" action.
 */
export const getRegisterExtract = async (
  caseId: string,
  forceRefresh = false
): Promise<RegisterExtractData> => {
  const { data } = await apiClient.get<RegisterExtractData>(
    `/admin/fraud-reports/${caseId}/register-extract`,
    { params: forceRefresh ? { force_refresh: true } : undefined }
  )
  return data
}

export const downloadRegisterExtractPdf = async (caseId: string): Promise<Blob> => {
  const response = await apiClient.get(`/admin/fraud-reports/${caseId}/register-extract/pdf`, {
    responseType: "blob",
  })
  return response.data
}

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
