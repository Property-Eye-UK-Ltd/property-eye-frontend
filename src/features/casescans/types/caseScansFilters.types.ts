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
    confidenceMin: string
    confidenceMax: string
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
    confidenceMin: "",
    confidenceMax: "",
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
    count += filters.confidenceMin || filters.confidenceMax ? 1 : 0
    count += filters.flagActiveOnly ? 1 : 0
    count += filters.minSubscriptionRevenue ? 1 : 0
    return count
}

export const riskLevelOptions = [
    { value: "CRITICAL", label: "Critical" },
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
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
