// Mirrors backend/src/schemas/dashboard.py (Team Management section) and
// backend/src/schemas/enums.py::TeamRoleEnum/TeamUserStatusEnum.
export type TeamRole = "agency_owner" | "agency_staff" | "agency_viewer"
export type TeamUserStatus = "active" | "pending" | "inactive"

export interface TeamSummaryResponse {
    total_users: number
    active_today_count: number
    // Backend currently hardcodes these to the string "0" regardless of real
    // data (dashboard.py get_team/get_team_summary) — render as-is, known-inert.
    cases_opened_ratio: string
    fraud_percentage_ratio: string
}

export interface TeamUserResponse {
    id: string
    name: string
    email: string
    role: TeamRole
    last_active_at: string | null
    status: TeamUserStatus
    avatar_url: string | null
}

export interface TeamUserInviteRequest {
    name: string
    email: string
    role: string
}

export interface TeamUserUpdateRequest {
    name?: string
    role?: string
    status?: string
}
