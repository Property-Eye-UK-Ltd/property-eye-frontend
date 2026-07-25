// Scan Session and Register Extract types for Land Registry integration

export interface RegisterExtractProp {
  name: string | null
  type: string | null
  address: string | null
  mismatch: boolean
}

export interface RegisterExtractEntry {
  entry_number: string | null
  entry_text: string | null
  registration_date: string | null
}

export interface RegisterExtractProperty {
  address: string | null
  tenure: string | null
  description: string | null
}

/** Full register extract, as returned by GET /admin/fraud-reports/{id}/register-extract */
export interface RegisterExtractData {
  report_id: string
  title_number: string | null
  fetched_at: string
  status: "complete" | "pending" | "failed"
  property: RegisterExtractProperty
  proprietors: RegisterExtractProp[]
  charges: RegisterExtractEntry[]
  restrictions: RegisterExtractEntry[]
  leases: RegisterExtractEntry[]
  notices: RegisterExtractEntry[]
  quick_reference_flags: string[]
  official_copy_available: boolean
  error_message?: string | null
}

/** Register extract summary embedded in a scan session result, as returned by
 *  RegisterExtractSummarySchema — counts only, not the full entry lists. */
export interface RegisterExtractSummary {
  title_number: string | null
  property_address: string | null
  tenure: string | null
  proprietor_count: number
  charge_count: number
  restriction_count: number
  has_mismatch: boolean
  quick_reference_flags: string[]
  official_copy_available: boolean
}

export interface ScanSessionResult {
  fraud_match_id: string
  case_id: string
  verification_status: "confirmed_fraud" | "not_fraud" | "error"
  register_extract: RegisterExtractSummary | null
  scanned_at: string
  error_message?: string | null
}

export interface ScanSession {
  id: string
  admin_user_id: string
  admin_user_name?: string
  agency_id: string
  fraud_match_ids: string[]
  scan_type: "manual_batch" | "auto_scheduled"
  status: "running" | "completed" | "failed"
  total_count: number
  confirmed_fraud_count: number
  not_fraud_count: number
  error_count: number
  started_at: string
  completed_at?: string
  error_message?: string
  results?: ScanSessionResult[]
}

export interface ScanSessionResponse {
  data: ScanSession
  pagination?: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface ScanSessionListResponse {
  items: ScanSession[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}
