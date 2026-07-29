export interface AdminCasesFilters {
  status: string[]
  riskLevels: string[]
  verificationStatuses: string[]
  caseStatuses: string[]
  determinations: string[]
  recoveryOutcomes: string[]
  agencyIds: string[]
  saleFromDate: string
  saleToDate: string
  confidenceBands: string[]
  minSubscriptionRevenue: string
}

export const emptyAdminCasesFilters: AdminCasesFilters = {
  status: [],
  riskLevels: [],
  verificationStatuses: [],
  caseStatuses: [],
  determinations: [],
  recoveryOutcomes: [],
  agencyIds: [],
  saleFromDate: "",
  saleToDate: "",
  confidenceBands: [],
  minSubscriptionRevenue: "",
}

export const countActiveFilters = (filters: AdminCasesFilters): number => {
  let count = 0
  count += filters.status.length > 0 ? 1 : 0
  count += filters.riskLevels.length > 0 ? 1 : 0
  count += filters.verificationStatuses.length > 0 ? 1 : 0
  count += filters.caseStatuses.length > 0 ? 1 : 0
  count += filters.determinations.length > 0 ? 1 : 0
  count += filters.recoveryOutcomes.length > 0 ? 1 : 0
  count += filters.agencyIds.length > 0 ? 1 : 0
  count += filters.saleFromDate || filters.saleToDate ? 1 : 0
  count += filters.confidenceBands.length > 0 ? 1 : 0
  count += filters.minSubscriptionRevenue ? 1 : 0
  return count
}

export const statusOptions = [
  { value: "Open", label: "Open" },
  { value: "Under Legal Review", label: "Under Legal Review" },
  { value: "Flagged", label: "Flagged" },
  { value: "Pending Approval", label: "Pending Approval" },
  { value: "Closed", label: "Closed" },
]

export const riskLevelOptions = [
  { value: "Critical", label: "Critical (0–6 months)" },
  { value: "High", label: "High (6–12 months)" },
  { value: "Medium", label: "Medium (12–36 months)" },
  { value: "Low", label: "Low (36+ months)" },
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
  { value: "Fraudulent (Confirmed)", label: "Fraudulent (Confirmed)" },
  { value: "Not Fraudulent (Cleared)", label: "Not Fraudulent (Cleared)" },
]

export const recoveryOutcomeOptions = [
  { value: "recovered", label: "Recovered" },
  { value: "not_recovered", label: "Not Recovered" },
  { value: "n_a", label: "Not Applicable" },
]

export const confidenceBandOptions = [
  { value: "70-80", label: "70–80%" },
  { value: "80-90", label: "80–90%" },
  { value: "90-95", label: "90–95%" },
  { value: "95-100", label: "95–100%" },
]
