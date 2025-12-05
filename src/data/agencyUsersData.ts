export interface AgencyUser {
    id: string
    name: string
    role: "Analyst" | "Admin" | "Viewer"
    accountStatus: "Active" | "Suspended"
    lastActive: string
    lastLogin: string
    twoFactorEnabled: boolean
}

export const mockAgencyUsers: AgencyUser[] = [
    {
        id: "1",
        name: "Kurt Daniel",
        role: "Analyst",
        accountStatus: "Active",
        lastActive: "3 Nov, 2025",
        lastLogin: "8 Nov 2025, 14:23",
        twoFactorEnabled: true,
    },
    {
        id: "2",
        name: "John Smith",
        role: "Analyst",
        accountStatus: "Suspended",
        lastActive: "21 Oct, 2025",
        lastLogin: "21 Oct, 2025, 14:23",
        twoFactorEnabled: false,
    },
    {
        id: "3",
        name: "khalid jaffar",
        role: "Analyst",
        accountStatus: "Suspended",
        lastActive: "21 Oct, 2025",
        lastLogin: "21 Oct, 2025, 14:23",
        twoFactorEnabled: false,
    },
    {
        id: "4",
        name: "Maria Sheldon",
        role: "Admin",
        accountStatus: "Active",
        lastActive: "21 Oct, 2025",
        lastLogin: "21 Oct, 2025, 14:23",
        twoFactorEnabled: true,
    },
    {
        id: "5",
        name: "Kurt Daniel",
        role: "Admin",
        accountStatus: "Suspended",
        lastActive: "21 Oct, 2025",
        lastLogin: "21 Oct, 2025, 14:23",
        twoFactorEnabled: false,
    },
    {
        id: "6",
        name: "Angela Davies",
        role: "Viewer",
        accountStatus: "Active",
        lastActive: "21 Oct, 2025",
        lastLogin: "21 Oct, 2025, 14:23",
        twoFactorEnabled: true,
    },
    {
        id: "7",
        name: "John Smith",
        role: "Viewer",
        accountStatus: "Suspended",
        lastActive: "30 Sep, 2025",
        lastLogin: "30 Sep, 2025, 14:23",
        twoFactorEnabled: true,
    },
    {
        id: "8",
        name: "khalid jaffar",
        role: "Analyst",
        accountStatus: "Active",
        lastActive: "24 Sep, 2025",
        lastLogin: "24 Sep, 2025, 14:23",
        twoFactorEnabled: false,
    },
    {
        id: "9",
        name: "Kurt Daniel",
        role: "Analyst",
        accountStatus: "Active",
        lastActive: "24 Sep, 2025",
        lastLogin: "24 Sep, 2025, 14:23",
        twoFactorEnabled: true,
    },
]

export const userAccountStatusStyles: Record<AgencyUser["accountStatus"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Suspended: "bg-red-50 text-red-600 border border-red-100",
}

export const twoFactorStatusStyles = {
    enabled: "bg-blue-50 text-blue-600 border border-blue-100",
    disabled: "bg-red-50 text-red-600 border border-red-100",
}
