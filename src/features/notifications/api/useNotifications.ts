import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { listNotifications, markAllNotificationsRead, markNotificationRead } from "./notificationsService"

export const useNotifications = () => {
    return useQuery({
        queryKey: queryKeys.notifications.list(),
        queryFn: () => listNotifications(),
        staleTime: 30_000,
    })
}

export const useMarkNotificationRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: markNotificationRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
            queryClient.invalidateQueries({ queryKey: queryKeys.headerState.all })
        },
    })
}

export const useMarkAllNotificationsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: markAllNotificationsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
            queryClient.invalidateQueries({ queryKey: queryKeys.headerState.all })
        },
    })
}
