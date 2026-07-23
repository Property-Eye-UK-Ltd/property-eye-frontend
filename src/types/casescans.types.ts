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
  verification_status: "suspicious" | "confirmed_fraud" | "not_fraud" | "error";
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
