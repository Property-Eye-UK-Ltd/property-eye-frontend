import apiClient from "@/lib/apiClient"
import type { NotificationResponse } from "@/types/checks.types"
import type { GenericActionResponse } from "@/types/settings.types"

export const listNotifications = async (params?: {
    read?: boolean
    page?: number
    page_size?: number
}): Promise<NotificationResponse[]> => {
    const { data } = await apiClient.get<NotificationResponse[]>("/dashboard/notifications", { params })
    return data
}

export const markNotificationRead = async (notificationId: string): Promise<GenericActionResponse> => {
    const { data } = await apiClient.patch<GenericActionResponse>(
        `/dashboard/notifications/${notificationId}/read`
    )
    return data
}

export const markAllNotificationsRead = async (): Promise<GenericActionResponse> => {
    const { data } = await apiClient.patch<GenericActionResponse>("/dashboard/notifications/read-all")
    return data
}
