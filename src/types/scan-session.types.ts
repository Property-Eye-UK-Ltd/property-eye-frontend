// Scan Session and Register Extract types for Land Registry integration

export interface RegisterExtractProp {
  name: string
  type: "Individual" | "Company"
  address: string
  is_mismatch_flag: boolean
}

export interface RegisterExtractCharge {
  entry_number: string
  description: string
  date?: string
}

export interface RegisterExtractRestriction {
  entry_number: string
  description: string
  date?: string
}

export interface RegisterExtractLease {
  entry_number: string
  description: string
  commencement_date?: string
}

export interface RegisterExtractNotice {
  entry_number: string
  description: string
  date?: string
}

export interface RegisterExtractData {
  id: string
  fraud_match_id: string
  title_number: string
  tenure: string
  property_address: string
  proprietors: RegisterExtractProp[]
  charges: RegisterExtractCharge[]
  restrictions: RegisterExtractRestriction[]
  leases: RegisterExtractLease[]
  notices: RegisterExtractNotice[]
  fetched_at: string
  status: "complete" | "pending" | "failed"
  error_message?: string
}

export interface ScanSessionResult {
  fraud_match_id: string
  case_id: string
  verification_status: "confirmed_fraud" | "not_fraud" | "error"
  register_extract: RegisterExtractData | null
  scanned_at: string
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
