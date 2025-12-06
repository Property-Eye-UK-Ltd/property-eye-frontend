import { MetricCard } from "@/features/overview/components/MetricCards"

export interface BillingTransaction {
  id: string
  transactionId: string
  agencyName: string
  planTier: string
  amount: string
  transactionDate: string
  status: "Successful" | "Failed" | "Pending"
}

export const mockBillingTransactions: BillingTransaction[] = [
  {
    id: "1",
    transactionId: "#367280",
    agencyName: "Baltimore Homes",
    planTier: "Pro Plan",
    amount: "£340",
    transactionDate: "3 November, 2025",
    status: "Failed",
  },
  {
    id: "2",
    transactionId: "#367280",
    agencyName: "Drescket",
    planTier: "Enterprise Plan",
    amount: "£1,422",
    transactionDate: "3 November, 2025",
    status: "Successful",
  },
  {
    id: "3",
    transactionId: "#367280",
    agencyName: "Minecraft Homes",
    planTier: "Pro Plan",
    amount: "£340",
    transactionDate: "3 November, 2025",
    status: "Successful",
  },
  {
    id: "4",
    transactionId: "#367280",
    agencyName: "Baltimore Homes",
    planTier: "Basic Plan",
    amount: "£420",
    transactionDate: "21 October, 2025",
    status: "Pending",
  },
  {
    id: "5",
    transactionId: "#367280",
    agencyName: "Drescket",
    planTier: "Pro Plan",
    amount: "£1,422",
    transactionDate: "21 October, 2025",
    status: "Failed",
  },
  {
    id: "6",
    transactionId: "#367280",
    agencyName: "Minecraft Homes",
    planTier: "Basic Plan",
    amount: "£420",
    transactionDate: "21 October, 2025",
    status: "Successful",
  },
  {
    id: "7",
    transactionId: "#367280",
    agencyName: "Baltimore Homes",
    planTier: "Premium Plan",
    amount: "£340",
    transactionDate: "3 November, 2025",
    status: "Failed",
  },
  {
    id: "8",
    transactionId: "#367280",
    agencyName: "Drescket",
    planTier: "Premium Plan",
    amount: "£420",
    transactionDate: "21 October, 2025",
    status: "Successful",
  },
  {
    id: "9",
    transactionId: "#367280",
    agencyName: "Minecraft Homes",
    planTier: "Enterprise Plan",
    amount: "£1,422",
    transactionDate: "30 September, 2025",
    status: "Pending",
  },
]

export const billingStatusStyles: Record<BillingTransaction["status"], string> = {
  Successful: "bg-green-50 text-green-600 border border-green-100",
  Failed: "bg-red-50 text-red-600 border border-red-100",
  Pending: "bg-orange-50 text-orange-600 border border-orange-100",
}

export const billingMetrics: MetricCard[] = [
  {
    title: "Revenue Generated",
    value: "£94,320",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-green-500",
  },
  {
    title: "Total Subscribers",
    value: "329",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-purple-500",
  },
  {
    title: "Pending Renewal",
    value: "37",
    period: "All time",
    change: "+2%",
    topBarClass: "bg-orange-500",
  },
  {
    title: "Cancelled Subscriptions",
    value: "50",
    period: "All time",
    change: "+321",
    topBarClass: "bg-red-500",
  },
]

export const billingPeriods = ["All Time", "This Month", "Last Week"]
