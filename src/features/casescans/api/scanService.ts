import apiClient from "@/lib/apiClient";
import type {
  VerificationSummary,
  VerificationResult,
  PaginatedFraudMatchResponse,
  FraudMatch,
} from "@/types/casescans.types";

export const verifyMatches = async (
  matchIds: string[]
): Promise<VerificationSummary> => {
  const { data } = await apiClient.post<VerificationSummary>(
    "/verification/verify",
    { match_ids: matchIds }
  );
  return data;
};

export const getVerificationStatus = async (
  matchId: string
): Promise<VerificationResult> => {
  const { data } = await apiClient.get<VerificationResult>(
    `/verification/status/${matchId}`
  );
  return data;
};

export const getSuspiciousMatches = async (params: {
  confidence_min?: number;
  confidence_max?: number;
  risk_level?: string;
  agency_id?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedFraudMatchResponse> => {
  const { data } = await apiClient.get<PaginatedFraudMatchResponse>(
    "/admin/fraud-reports",
    { params }
  );
  return data;
};
