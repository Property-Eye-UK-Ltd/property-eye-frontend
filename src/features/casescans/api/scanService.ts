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

export interface FraudReportsFilterParams {
  search?: string;
  page?: number;
  page_size?: number;
  risk_levels?: string[];
  verification_statuses?: string[];
  case_statuses?: string[];
  determinations?: string[];
  recovery_outcomes?: string[];
  agency_ids?: string[];
  detected_from?: string;
  detected_to?: string;
  confidence_min?: number;
  confidence_max?: number;
  flag_active?: boolean;
  min_subscription_revenue?: number;
}

export const getSuspiciousMatches = async (
  params: FraudReportsFilterParams
): Promise<PaginatedFraudMatchResponse> => {
  const { data } = await apiClient.get<PaginatedFraudMatchResponse>(
    "/admin/fraud-reports",
    {
      params,
      // Axios defaults to `foo[]=a&foo[]=b` for arrays, which FastAPI does
      // NOT parse into list[str] — it expects repeated bare params
      // (foo=a&foo=b). This matches how FastAPI's Query(list[str]) binds.
      paramsSerializer: {
        indexes: null,
      },
    }
  );
  return data;
};

export interface FraudReportAgencyOption {
  id: string;
  name: string;
}

export const getFraudReportAgencies = async (): Promise<
  FraudReportAgencyOption[]
> => {
  const { data } = await apiClient.get<FraudReportAgencyOption[]>(
    "/admin/fraud-reports/agencies"
  );
  return data;
};
