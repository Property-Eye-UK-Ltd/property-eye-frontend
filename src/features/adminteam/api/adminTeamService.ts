import apiClient from "@/lib/apiClient"

export type AdminRole = "superadmin" | "analyst" | "viewer"

export interface AdminUser {
    id: string
    name: string
    email: string
    role: AdminRole
    lastActive: string | null
    status: "Active" | "Disabled"
    avatar?: string
}

export const adminUserRoles = ["Superadmin", "Analyst", "Viewer"] as const

const roleLabelToValue: Record<string, AdminRole> = {
    Superadmin: "superadmin",
    Analyst: "analyst",
    Viewer: "viewer",
}

const roleValueToLabel: Record<AdminRole, string> = {
    superadmin: "Superadmin",
    analyst: "Analyst",
    viewer: "Viewer",
}

export const toAdminRoleValue = (label: string): AdminRole => roleLabelToValue[label] ?? "viewer"
export const toAdminRoleLabel = (value: AdminRole): string => roleValueToLabel[value] ?? value

interface AdminTeamUserApiResponse {
    id: string
    name: string
    email: string
    role: AdminRole
    last_active_at: string | null
    status: string
    avatar_url: string | null
}

const fromApiUser = (u: AdminTeamUserApiResponse): AdminUser => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    lastActive: u.last_active_at,
    status: u.status === "disabled" ? "Disabled" : "Active",
    avatar: u.avatar_url ?? undefined,
})

export interface AdminTeamSummary {
    total_users: number
    active_today_count: number
    suspended_count: number
}

export const getAdminTeamSummary = async (): Promise<AdminTeamSummary> => {
    const { data } = await apiClient.get<AdminTeamSummary>("/dashboard/admin/team/summary")
    return data
}

export const getAdminTeamUsers = async (params?: {
    status?: string
    sort_by?: string
    sort_dir?: string
}): Promise<AdminUser[]> => {
    const { data } = await apiClient.get<AdminTeamUserApiResponse[]>("/dashboard/admin/team/users", { params })
    return data.map(fromApiUser)
}

export const inviteAdminTeamUser = async (req: { name: string; email: string; role: AdminRole }): Promise<AdminUser> => {
    const { data } = await apiClient.post<AdminTeamUserApiResponse>("/dashboard/admin/team/users", req)
    return fromApiUser(data)
}

export const updateAdminTeamUser = async (
    userId: string,
    req: { name?: string; role?: AdminRole; status?: string }
): Promise<AdminUser> => {
    const { data } = await apiClient.patch<AdminTeamUserApiResponse>(`/dashboard/admin/team/users/${userId}`, req)
    return fromApiUser(data)
}
