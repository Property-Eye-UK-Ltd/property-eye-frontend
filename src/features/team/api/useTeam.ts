import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getTeamSummary,
    getTeamUsers,
    inviteTeamUser,
    removeTeamUser,
    updateTeamUser,
    type TeamRole,
} from "./teamService"

export const useTeamSummary = () =>
    useQuery({
        queryKey: queryKeys.team.summary(),
        queryFn: getTeamSummary,
        staleTime: 30_000,
    })

export const useTeamUsers = (params?: { status?: string; sort_by?: string; sort_dir?: string }) =>
    useQuery({
        queryKey: queryKeys.team.users(params),
        queryFn: () => getTeamUsers(params),
        staleTime: 15_000,
    })

export const useInviteTeamUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: inviteTeamUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.team.all })
        },
    })
}

export const useUpdateTeamUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ userId, req }: { userId: string; req: { name?: string; role?: TeamRole; status?: string } }) =>
            updateTeamUser(userId, req),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.team.all })
        },
    })
}

export const useRemoveTeamUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeTeamUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.team.all })
        },
    })
}
