import apiClient from "@/lib/apiClient"

// --- Raw backend shapes (src/schemas/admin_agency_recoveries.py) ---

export interface AdminAgencyRecoveryApi {
    id: string
    agency_id: string
    agency_name: string | null
    fraud_match_id: string
    amount: number
    status: "pending" | "paid"
    paid_at: string | null
    created_at: string
}

export type AgencyRecoveryStatus = "Pending" | "Paid"

export interface AdminAgencyRecoveryRow {
    id: string
    agency: string
    fraudCase: string
    amount: number
    amountLabel: string
    status: AgencyRecoveryStatus
    createdAt: string
}

const statusToLabel: Record<AdminAgencyRecoveryApi["status"], AgencyRecoveryStatus> = {
    pending: "Pending",
    paid: "Paid",
}

const formatGbp = (amount: number): string => `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

export const fromApiAgencyRecovery = (r: AdminAgencyRecoveryApi): AdminAgencyRecoveryRow => ({
    id: r.id,
    agency: r.agency_name ?? "Unknown Agency",
    fraudCase: `#${r.fraud_match_id.slice(0, 8).toUpperCase()}`,
    amount: r.amount,
    amountLabel: formatGbp(r.amount),
    status: statusToLabel[r.status],
    createdAt: formatDate(r.created_at),
})

export const getAdminAgencyRecoveries = async (params?: {
    status?: string
    agency_id?: string
}): Promise<AdminAgencyRecoveryRow[]> => {
    const { data } = await apiClient.get<AdminAgencyRecoveryApi[]>("/admin/agency-recoveries", { params })
    return data.map(fromApiAgencyRecovery)
}

export const markAgencyRecoveryPaid = async (recoveryId: string): Promise<AdminAgencyRecoveryRow> => {
    const { data } = await apiClient.post<AdminAgencyRecoveryApi>(`/admin/agency-recoveries/${recoveryId}/mark-paid`)
    return fromApiAgencyRecovery(data)
}

export const markAgencyRecoveryUnpaid = async (recoveryId: string): Promise<AdminAgencyRecoveryRow> => {
    const { data } = await apiClient.post<AdminAgencyRecoveryApi>(`/admin/agency-recoveries/${recoveryId}/mark-unpaid`)
    return fromApiAgencyRecovery(data)
}

export const updateAgencyRecoveryAmount = async (recoveryId: string, amount: number): Promise<AdminAgencyRecoveryRow> => {
    const { data } = await apiClient.patch<AdminAgencyRecoveryApi>(`/admin/agency-recoveries/${recoveryId}`, { amount })
    return fromApiAgencyRecovery(data)
}
