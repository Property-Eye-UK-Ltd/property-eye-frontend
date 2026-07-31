import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    AdminMarketerAuthStatus,
    getAdminMarketerAgencies,
    getAdminMarketerDetail,
    getAdminMarketers,
    getUnattributedAgencies,
    linkAgencyToMarketer,
    updateAdminMarketerStatus,
} from "./adminMarketersService"

export const useAdminMarketers = (options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: queryKeys.adminMarketers.list(),
        queryFn: getAdminMarketers,
        staleTime: 15_000,
        enabled: options?.enabled !== false,
    })

export const useAdminMarketerDetail = (marketerId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.adminMarketers.detail(marketerId ?? ""),
        queryFn: () => getAdminMarketerDetail(marketerId as string),
        enabled: !!marketerId,
        staleTime: 15_000,
    })

export const useAdminMarketerAgencies = (marketerId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.adminMarketers.agencies(marketerId ?? ""),
        queryFn: () => getAdminMarketerAgencies(marketerId as string),
        enabled: !!marketerId,
        staleTime: 15_000,
    })

export const useUnattributedAgencies = () =>
    useQuery({
        queryKey: queryKeys.adminMarketers.unattributedAgencies(),
        queryFn: getUnattributedAgencies,
        staleTime: 15_000,
    })

export const useUpdateMarketerStatus = (marketerId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (status: AdminMarketerAuthStatus) => updateAdminMarketerStatus(marketerId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.adminMarketers.all })
        },
    })
}

export const useLinkAgencyToMarketer = (marketerId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (agencyId: string) => linkAgencyToMarketer(marketerId, agencyId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.adminMarketers.all })
        },
    })
}
