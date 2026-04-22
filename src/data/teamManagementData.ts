import { MetricCard } from "@/features/overview/components/MetricCards"

export type StaffRole = "Admin" | "Analyst" | "Viewer"

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
    Admin: {
        label: "Admin",
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
    Admin: "bg-purple-50 text-purple-600 border border-purple-100",
    Analyst: "bg-blue-50 text-blue-600 border border-blue-100",
    Viewer: "bg-gray-50 text-gray-600 border border-gray-100",
}

export const mockStaffMembers: StaffMember[] = [
    {
        id: "1",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst" as StaffRole,
        lastActiveDate: "3 November, 2025",
        status: "Active",
    },
    {
        id: "2",
        name: "Khalid Jaffar",
        email: "K.jaffar@gmail.com",
        role: "Analyst" as StaffRole,
        lastActiveDate: "3 November, 2025",
        status: "Disabled",
    },
    {
        id: "3",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Admin" as StaffRole,
        lastActiveDate: "3 November, 2025",
        status: "Active",
    },
    {
        id: "4",
        name: "Kurt Daniel",
        email: "Dankurt@gmail.com",
        role: "Admin" as StaffRole,
        lastActiveDate: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "5",
        name: "Angela Davies",
        email: "Angeladavies@gmail.com",
        role: "Viewer" as StaffRole,
        lastActiveDate: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "6",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst" as StaffRole,
        lastActiveDate: "21 October, 2025",
        status: "Active",
    },
    {
        id: "7",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Analyst" as StaffRole,
        lastActiveDate: "30 September, 2025",
        status: "Active",
    },
]

export const staffStatusStyles: Record<StaffMember["status"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Disabled: "bg-red-50 text-red-600 border border-red-100",
}

export const teamMetrics: MetricCard[] = [
    {
        title: "Total Staffs",
        value: "30",
        period: "",
        change: "",
        topBarClass: "bg-blue-500",
    },
    {
        title: "Active Today",
        value: "21",
        period: "",
        change: "",
        topBarClass: "bg-gray-500",
    },
    {
        title: "Suspended Staffs",
        value: "7",
        period: "",
        change: "",
        topBarClass: "bg-red-500",
    },
]
