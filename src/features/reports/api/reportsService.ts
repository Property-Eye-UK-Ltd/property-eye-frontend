import apiClient from "@/lib/apiClient"

export type EventLogAction = "login" | "logout" | "create_case" | "update_case" | "export_report"

export interface AdminEventLogEntry {
    actor_name: string
    actor_role: string
    action: EventLogAction
    target_type: string
    target_id: string | null
    agency_name: string | null
    date: string
}

export interface PaginatedAdminEventLogResponse {
    items: AdminEventLogEntry[]
    total: number
}

export const getAdminEventLog = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedAdminEventLogResponse> => {
    const { data } = await apiClient.get<PaginatedAdminEventLogResponse>(
        "/dashboard/admin/analytics/event-log",
        { params: { page, limit } }
    )
    return data
}

export const getAdminEventLogForExport = async (
    dateFrom?: string,
    dateTo?: string
): Promise<PaginatedAdminEventLogResponse> => {
    const { data } = await apiClient.get<PaginatedAdminEventLogResponse>(
        "/dashboard/admin/analytics/event-log",
        {
            params: {
                export: true,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
            },
        }
    )
    return data
}
