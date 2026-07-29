import apiClient from "@/lib/apiClient"
import { BillingTransaction } from "@/data/adminBillingData"
import { MetricCard } from "@/features/overview/components/MetricCards"

// --- Raw backend shapes (src/schemas/admin_billing.py) ---

export interface AdminBillingMetricsApi {
    total_subscription_revenue_gbp: number
    total_subscribers: number
    pending_renewal: number
    cancelled_subscriptions: number
}

export interface AdminInvoiceApi {
    id: string
    agency_id: string | null
    agency_name: string | null
    plan_name: string | null
    amount_gbp: number
    status: "paid" | "failed" | "open"
    billing_date: string
}

export interface AdminInvoiceListResponse {
    items: AdminInvoiceApi[]
    total: number
    page: number
    page_size: number
}

export interface AdminInvoiceDetailApi extends AdminInvoiceApi {
    agency_email: string | null
    agency_phone_number: string | null
    agency_address: string | null
}

const statusToLabel: Record<AdminInvoiceApi["status"], BillingTransaction["status"]> = {
    paid: "Successful",
    failed: "Failed",
    open: "Pending",
}

const formatGbp = (amount: number): string => `£${Math.round(amount).toLocaleString("en-GB")}`

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })

export const fromApiInvoice = (inv: AdminInvoiceApi): BillingTransaction => ({
    id: inv.id,
    transactionId: `#${inv.id.slice(0, 8).toUpperCase()}`,
    agencyName: inv.agency_name ?? "Unknown Agency",
    planTier: inv.plan_name ?? "—",
    amount: formatGbp(inv.amount_gbp),
    transactionDate: formatDate(inv.billing_date),
    status: statusToLabel[inv.status],
})

export const getAdminBillingMetrics = async (period: string): Promise<AdminBillingMetricsApi> => {
    const { data } = await apiClient.get<AdminBillingMetricsApi>("/admin/billing/metrics", {
        params: { period },
    })
    return data
}

export const toBillingMetricCards = (metrics: AdminBillingMetricsApi, period: string): MetricCard[] => [
    {
        title: "Total Subscription Revenue",
        value: formatGbp(metrics.total_subscription_revenue_gbp),
        period,
        change: "",
        topBarClass: "bg-green-500",
    },
    {
        title: "Total Subscribers",
        value: metrics.total_subscribers.toLocaleString("en-GB"),
        period,
        change: "",
        topBarClass: "bg-purple-500",
    },
    {
        title: "Pending Renewal",
        value: metrics.pending_renewal.toLocaleString("en-GB"),
        period,
        change: "",
        topBarClass: "bg-orange-500",
    },
    {
        title: "Cancelled Subscriptions",
        value: metrics.cancelled_subscriptions.toLocaleString("en-GB"),
        period,
        change: "",
        topBarClass: "bg-red-500",
    },
]

export const getAdminInvoices = async (params?: {
    page?: number
    page_size?: number
    search?: string
    status?: string
}): Promise<{ items: BillingTransaction[]; total: number; page: number; page_size: number }> => {
    const { data } = await apiClient.get<AdminInvoiceListResponse>("/admin/billing/invoices", { params })
    return {
        items: data.items.map(fromApiInvoice),
        total: data.total,
        page: data.page,
        page_size: data.page_size,
    }
}

export const getAdminInvoicesForExport = async (params?: {
    search?: string
    status?: string
    date_from?: string
    date_to?: string
}): Promise<{ items: BillingTransaction[]; total: number }> => {
    const { data } = await apiClient.get<AdminInvoiceListResponse>("/admin/billing/invoices", {
        params: { ...params, export: true },
    })
    return {
        items: data.items.map(fromApiInvoice),
        total: data.total,
    }
}

export interface AdminInvoiceDetail {
    id: string
    transactionId: string
    agencyName: string
    agencyEmail: string
    agencyPhoneNumber: string
    agencyAddress: string
    planTier: string
    amount: string
    transactionDate: string
    status: BillingTransaction["status"]
}

export const getAdminInvoiceDetail = async (invoiceId: string): Promise<AdminInvoiceDetail> => {
    const { data } = await apiClient.get<AdminInvoiceDetailApi>(`/admin/billing/invoices/${invoiceId}`)
    return {
        id: data.id,
        transactionId: `#${data.id.slice(0, 8).toUpperCase()}`,
        agencyName: data.agency_name ?? "Unknown Agency",
        agencyEmail: data.agency_email ?? "—",
        agencyPhoneNumber: data.agency_phone_number ?? "—",
        agencyAddress: data.agency_address ?? "—",
        planTier: data.plan_name ?? "—",
        amount: formatGbp(data.amount_gbp),
        transactionDate: formatDate(data.billing_date),
        status: statusToLabel[data.status],
    }
}
