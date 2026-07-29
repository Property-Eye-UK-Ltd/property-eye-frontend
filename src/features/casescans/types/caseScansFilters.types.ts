// Mirrors the query params accepted by GET /admin/fraud-reports
// (backend/src/api/v1/endpoints/admin_fraud_reports.py). Every field here is
// optional/empty by default — an empty array or undefined means "no
// restriction on this field", never "match nothing".
export interface CaseScansFilters {
    riskLevels: string[]
    verificationStatuses: string[]
    caseStatuses: string[]
    determinations: string[]
    recoveryOutcomes: string[]
    agencyIds: string[]
    detectedFrom: string
    detectedTo: string
    confidenceBands: string[]
    flagActiveOnly: boolean
    minSubscriptionRevenue: string
}

export const emptyCaseScansFilters: CaseScansFilters = {
    riskLevels: [],
    verificationStatuses: [],
    caseStatuses: [],
    determinations: [],
    recoveryOutcomes: [],
    agencyIds: [],
    detectedFrom: "",
    detectedTo: "",
    confidenceBands: [],
    flagActiveOnly: false,
    minSubscriptionRevenue: "",
}

export const countActiveFilters = (filters: CaseScansFilters): number => {
    let count = 0
    count += filters.riskLevels.length > 0 ? 1 : 0
    count += filters.verificationStatuses.length > 0 ? 1 : 0
    count += filters.caseStatuses.length > 0 ? 1 : 0
    count += filters.determinations.length > 0 ? 1 : 0
    count += filters.recoveryOutcomes.length > 0 ? 1 : 0
    count += filters.agencyIds.length > 0 ? 1 : 0
    count += filters.detectedFrom || filters.detectedTo ? 1 : 0
    count += filters.confidenceBands.length > 0 ? 1 : 0
    count += filters.flagActiveOnly ? 1 : 0
    count += filters.minSubscriptionRevenue ? 1 : 0
    return count
}

// Thresholds mirror backend/src/core/config.py (FRAUD_RISK_CRITICAL_DAYS=180,
// FRAUD_RISK_HIGH_DAYS=365, FRAUD_RISK_MEDIUM_DAYS=1095) as read via
// backend/src/utils/constants.py's FraudDetectionConfig, and
// _calculate_risk_level in backend/src/services/fraud_detector.py, which
// buckets abs(days between withdrawal and sale) into these bands.
export const riskLevelOptions = [
    { value: "CRITICAL", label: "Critical (0–6 months)" },
    { value: "HIGH", label: "High (6–12 months)" },
    { value: "MEDIUM", label: "Medium (12–36 months)" },
    { value: "LOW", label: "Low (36+ months)" },
]

// Bands over match confidence score (FraudMatch.confidence_score), which is
// only ever populated for scores >= FRAUD_MIN_CONFIDENCE (70%, see
// backend/src/core/config.py). Sent to the backend as confidence_min/
// confidence_max on GET /admin/fraud-reports; a case matches if its score
// falls in any one selected band (bands are combined with OR client-side
// before querying, since the backend only accepts a single min/max range).
export const confidenceBandOptions = [
    { value: "70-80", label: "70–80%", min: 70, max: 80 },
    { value: "80-90", label: "80–90%", min: 80, max: 90 },
    { value: "90-95", label: "90–95%", min: 90, max: 95 },
    { value: "95-100", label: "95–100%", min: 95, max: 100 },
]

export const verificationStatusOptions = [
    { value: "suspicious", label: "Suspicious" },
    { value: "confirmed_fraud", label: "Confirmed Fraud" },
    { value: "not_fraud", label: "Not Fraud" },
    { value: "error", label: "Error" },
]

export const caseStatusOptions = [
    { value: "open", label: "Open" },
    { value: "under_legal_review", label: "Under Legal Review" },
    { value: "flagged", label: "Flagged" },
    { value: "pending_approval", label: "Pending Approval" },
    { value: "closed", label: "Closed" },
]

export const determinationOptions = [
    { value: "fraudulent", label: "Fraudulent" },
    { value: "not_fraudulent", label: "Not Fraudulent" },
    { value: "inconclusive", label: "Inconclusive" },
]

export const recoveryOutcomeOptions = [
    { value: "recovered", label: "Recovered" },
    { value: "not_recovered", label: "Not Recovered" },
    { value: "n_a", label: "Not Applicable" },
]
