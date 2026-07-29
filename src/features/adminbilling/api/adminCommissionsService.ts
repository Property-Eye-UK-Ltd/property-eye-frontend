import apiClient from "@/lib/apiClient"
import { CommissionLineStatus } from "@/data/marketing-data"

// --- Raw backend shapes (src/schemas/admin_commissions.py) ---

export interface AdminCommissionApi {
    id: string
    marketer_id: string
    marketer_name: string | null
    agency_id: string | null
    agency_name: string | null
    fraud_match_id: string | null
    property_eye_share_amount: number | null
    amount: number
    status: "pending" | "approved" | "paid"
    created_at: string
}

export interface AdminCommissionRow {
    id: string
    marketer: string
    agency: string
    fraudCase: string
    amount: number
    amountLabel: string
    status: CommissionLineStatus
}

const statusToLabel: Record<AdminCommissionApi["status"], CommissionLineStatus> = {
    pending: "Pending",
    approved: "Approved",
    paid: "Paid",
}

const formatGbp = (amount: number): string => `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

export const fromApiCommission = (c: AdminCommissionApi): AdminCommissionRow => ({
    id: c.id,
    marketer: c.marketer_name ?? "Unknown Marketer",
    agency: c.agency_name ?? "—",
    fraudCase: c.fraud_match_id ? `#${c.fraud_match_id.slice(0, 8).toUpperCase()}` : "—",
    amount: c.amount,
    amountLabel: formatGbp(c.amount),
    status: statusToLabel[c.status],
})

export const getAdminCommissions = async (params?: {
    status?: string
    marketer_id?: string
    agency_id?: string
}): Promise<AdminCommissionRow[]> => {
    const { data } = await apiClient.get<AdminCommissionApi[]>("/admin/commissions", { params })
    return data.map(fromApiCommission)
}

export const getAdminCommissionsForExport = async (params?: {
    status?: string
    marketer_id?: string
    agency_id?: string
    date_from?: string
    date_to?: string
}): Promise<AdminCommissionRow[]> => {
    const { data } = await apiClient.get<AdminCommissionApi[]>("/admin/commissions", { params })
    return data.map(fromApiCommission)
}

export const approveCommission = async (commissionId: string): Promise<AdminCommissionRow> => {
    const { data } = await apiClient.post<AdminCommissionApi>(`/admin/commissions/${commissionId}/approve`)
    return fromApiCommission(data)
}

export const markCommissionPaid = async (commissionId: string): Promise<AdminCommissionRow> => {
    const { data } = await apiClient.post<AdminCommissionApi>(`/admin/commissions/${commissionId}/mark-paid`)
    return fromApiCommission(data)
}

export const updateCommissionAmount = async (commissionId: string, amount: number): Promise<AdminCommissionRow> => {
    const { data } = await apiClient.patch<AdminCommissionApi>(`/admin/commissions/${commissionId}`, { amount })
    return fromApiCommission(data)
}
