import apiClient from "@/lib/apiClient"

export type TeamRole = "agency_owner" | "agency_staff" | "agency_viewer"

export interface User {
    id: string
    name: string
    email: string
    role: TeamRole
    lastActive: string | null
    status: "Active" | "Disabled"
    avatar?: string
}

export const userRoles = ["Agency Owner", "Agency Staff", "Agency Viewer"] as const

const roleLabelToValue: Record<string, TeamRole> = {
    "Agency Owner": "agency_owner",
    "Agency Staff": "agency_staff",
    "Agency Viewer": "agency_viewer",
}

const roleValueToLabel: Record<TeamRole, string> = {
    agency_owner: "Agency Owner",
    agency_staff: "Agency Staff",
    agency_viewer: "Agency Viewer",
}

export const toRoleValue = (label: string): TeamRole => roleLabelToValue[label] ?? "agency_staff"
export const toRoleLabel = (value: TeamRole): string => roleValueToLabel[value] ?? value

interface TeamUserApiResponse {
    id: string
    name: string
    email: string
    role: TeamRole
    last_active_at: string | null
    status: string
    avatar_url: string | null
}

const fromApiUser = (u: TeamUserApiResponse): User => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    lastActive: u.last_active_at,
    status: u.status === "disabled" ? "Disabled" : "Active",
    avatar: u.avatar_url ?? undefined,
})

export interface TeamSummary {
    total_users: number
    active_today_count: number
    cases_opened_ratio: string
    fraud_percentage_ratio: string
}

export const getTeamSummary = async (): Promise<TeamSummary> => {
    const { data } = await apiClient.get<TeamSummary>("/dashboard/team/summary")
    return data
}

export interface PaginatedUsersResponse {
    items: User[]
    total: number
}

export const getTeamUsers = async (params?: {
    status?: string
    sort_by?: string
    sort_dir?: string
    page?: number
    limit?: number
}): Promise<PaginatedUsersResponse> => {
    const { data } = await apiClient.get<{ items: TeamUserApiResponse[]; total: number }>(
        "/dashboard/team/users",
        { params }
    )
    return { items: data.items.map(fromApiUser), total: data.total }
}

export const inviteTeamUser = async (req: { name: string; email: string; role: TeamRole }): Promise<User> => {
    const { data } = await apiClient.post<TeamUserApiResponse>("/dashboard/team/users", req)
    return fromApiUser(data)
}

export const updateTeamUser = async (
    userId: string,
    req: { name?: string; role?: TeamRole; status?: string }
): Promise<User> => {
    const { data } = await apiClient.patch<TeamUserApiResponse>(`/dashboard/team/users/${userId}`, req)
    return fromApiUser(data)
}

export const removeTeamUser = async (userId: string): Promise<void> => {
    await apiClient.delete(`/dashboard/team/users/${userId}`)
}
