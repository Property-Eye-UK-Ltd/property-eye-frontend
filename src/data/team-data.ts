export interface User {
    id: string
    name: string
    email: string
    role: string
    lastActive: string
    status: "Active" | "Disabled"
    avatar?: string
}

export const users: User[] = [
    {
        id: "1",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst",
        lastActive: "3 November, 2025",
        status: "Active",
        avatar: "/avatars/john.png"
    },
    {
        id: "2",
        name: "Khalid Jaffar",
        email: "K.jaffar@gmail.com",
        role: "Admin",
        lastActive: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "3",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Viewer",
        lastActive: "21 October, 2025",
        status: "Disabled",
        avatar: "/avatars/maria.png"
    },
    {
        id: "4",
        name: "Kurt Daniel",
        email: "Dankurt@gmail.com",
        role: "Analyst",
        lastActive: "21 October, 2025",
        status: "Active",
        avatar: "/avatars/kurt.png"
    },
    {
        id: "5",
        name: "Angela Davies",
        email: "Angeladavies@gmail.com",
        role: "Analyst",
        lastActive: "30 September, 2025",
        status: "Active",
        avatar: "/avatars/angela.png"
    },
]

export const userRoles = ["Admin", "Analyst", "Viewer"] as const
