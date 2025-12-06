import { MetricCard } from "@/features/overview/components/MetricCards"

export interface StaffMember {
    id: string
    name: string
    email: string
    role: string
    lastActiveDate: string
    status: "Active" | "Disabled"
}

export const mockStaffMembers: StaffMember[] = [
    {
        id: "1",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst",
        lastActiveDate: "3 November, 2025",
        status: "Active",
    },
    {
        id: "2",
        name: "Khalid Jaffar",
        email: "K.jaffar@gmail.com",
        role: "Analyst",
        lastActiveDate: "3 November, 2025",
        status: "Disabled",
    },
    {
        id: "3",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Admin",
        lastActiveDate: "3 November, 2025",
        status: "Active",
    },
    {
        id: "4",
        name: "Kurt Daniel",
        email: "Dankurt@gmail.com",
        role: "Admin",
        lastActiveDate: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "5",
        name: "Angela Davies",
        email: "Angeladavies@gmail.com",
        role: "Viewer",
        lastActiveDate: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "6",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst",
        lastActiveDate: "21 October, 2025",
        status: "Active",
    },
    {
        id: "7",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Analyst",
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
