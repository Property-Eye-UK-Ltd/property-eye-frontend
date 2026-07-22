export type StaffRole = "Superadmin" | "Analyst" | "Viewer"

export interface StaffMember {
    id: string
    name: string
    email: string
    role: StaffRole
    lastActiveDate: string
    status: "Active" | "Disabled"
}

export interface RolePermission {
    label: string
    description: string
    actions: string[]
}

export const rolePermissions: Record<StaffRole, RolePermission> = {
    Superadmin: {
        label: "Superadmin",
        description: "Full system access with user management capabilities",
        actions: [
            "Manage staff accounts",
            "Configure system settings",
            "Trigger & close cases",
            "Run checks & sweeps",
            "View & export reports",
            "Manage agency accounts",
            "Override roles & permissions",
            "Access billing & finance",
        ],
    },
    Analyst: {
        label: "Analyst",
        description: "Investigate fraud cases and manage evidence",
        actions: [
            "View & investigate cases",
            "Upload & review evidence",
            "Trigger cases for review",
            "View agency profiles",
            "Export case reports",
            "View dashboard analytics",
        ],
    },
    Viewer: {
        label: "Viewer",
        description: "Read-only access to dashboards and reports",
        actions: [
            "View dashboard overview",
            "View case summaries",
            "View agency profiles",
            "View reports (no export)",
        ],
    },
}

export const roleStyles: Record<StaffRole, string> = {
    Superadmin: "bg-purple-50 text-purple-600 border border-purple-100",
    Analyst: "bg-blue-50 text-blue-600 border border-blue-100",
    Viewer: "bg-gray-50 text-gray-600 border border-gray-100",
}

export const staffStatusStyles: Record<StaffMember["status"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Disabled: "bg-red-50 text-red-600 border border-red-100",
}
