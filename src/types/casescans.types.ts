export interface FraudMatch {
  id: string;
  property_listing_id: string;
  property_address: string;
  agency_id: string;
  agency_name: string;
  client_name: string;
  vendor_name: string;
  confidence_score: number;
  risk_level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  // Scan Result: the automated Land Registry/Stage-1&2 verification signal.
  verification_status: "suspicious" | "confirmed_fraud" | "not_fraud" | "error";
  // Case Status: the human/admin case-lifecycle state, layered on top of the
  // scan result — distinct field, do not conflate the two (see FraudMatch
  // model comment in backend/src/models/fraud_match.py).
  case_status: "open" | "under_legal_review" | "flagged" | "pending_approval" | "closed";
  verified_owner_name?: string;
  is_confirmed_fraud: boolean;
  detected_at: string;
  verified_at?: string;
  land_registry_response?: Record<string, unknown>;
}

export interface VerificationRequest {
  match_ids: string[];
}

export interface VerificationResult {
  match_id: string;
  property_address: string;
  client_name?: string;
  vendor_name?: string;
  verification_status: "confirmed_fraud" | "not_fraud" | "error";
  verified_owner_name?: string;
  is_confirmed_fraud: boolean;
  verified_at: string;
  error_message?: string;
}

export interface VerificationSummary {
  total_verified: number;
  confirmed_fraud_count: number;
  not_fraud_count: number;
  error_count: number;
  results: VerificationResult[];
  message: string;
}

export interface PaginatedFraudMatchResponse {
  items: FraudMatch[];
  total: number;
  page: number;
  limit: number;
}
