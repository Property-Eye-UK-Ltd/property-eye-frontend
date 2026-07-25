export interface BillingTransaction {
  id: string
  transactionId: string
  agencyName: string
  planTier: string
  amount: string
  transactionDate: string
  status: "Successful" | "Failed" | "Pending"
}

export const billingStatusStyles: Record<BillingTransaction["status"], string> = {
  Successful: "bg-green-50 text-green-600 border border-green-100",
  Failed: "bg-red-50 text-red-600 border border-red-100",
  Pending: "bg-orange-50 text-orange-600 border border-orange-100",
}

export const billingPeriods = ["All Time", "This Month", "Last Week"]
