import { StaffMember } from "./teamManagementData"

export interface ActivityLogRecord {
    timestamp: string
    event: string
    ipAddress: string
}

export const mockActivityLog: ActivityLogRecord[] = [
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
    {
        timestamp: "2025-11-08 14:29",
        event: "Triggered Case",
        ipAddress: "192.168.1.13",
    },
]

// Extended staff data for details page
export const mockStaffDetails: Record<string, Partial<StaffMember> & { profileImage?: string }> = {
    "2": {
        id: "2",
        name: "Khalid Jaffar",
        email: "K.jaffar@gmail.com",
        role: "Managed",
        lastActiveDate: "3 Nov, 2025",
        status: "Active",
        profileImage: "", // Would be actual image URL in real app
    },
}
