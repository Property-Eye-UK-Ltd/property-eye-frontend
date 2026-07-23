import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getAdminTeamSummary,
    getAdminTeamUsers,
    getAdminTeamUser,
    inviteAdminTeamUser,
    updateAdminTeamUser,
    type AdminRole,
} from "./adminTeamService"

export const useAdminTeamSummary = () =>
    useQuery({
        queryKey: queryKeys.adminTeam.summary(),
        queryFn: getAdminTeamSummary,
        staleTime: 30_000,
    })

export const useAdminTeamUsers = (params?: {
    status?: string
    sort_by?: string
    sort_dir?: string
    search?: string
    page?: number
    limit?: number
}) =>
    useQuery({
        queryKey: queryKeys.adminTeam.users(params),
        queryFn: () => getAdminTeamUsers(params),
        staleTime: 15_000,
        placeholderData: (prev) => prev,
    })

export const useAdminTeamUser = (userId?: string) =>
    useQuery({
        queryKey: queryKeys.adminTeam.user(userId ?? ""),
        queryFn: () => getAdminTeamUser(userId as string),
        enabled: !!userId,
    })

export const useInviteAdminTeamUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: inviteAdminTeamUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.adminTeam.all })
        },
    })
}

export const useUpdateAdminTeamUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ userId, req }: { userId: string; req: { name?: string; role?: AdminRole; status?: string } }) =>
            updateAdminTeamUser(userId, req),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.adminTeam.all })
        },
    })
}
