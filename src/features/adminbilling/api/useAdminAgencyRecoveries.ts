import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getAdminAgencyRecoveries,
    markAgencyRecoveryPaid,
    markAgencyRecoveryUnpaid,
    updateAgencyRecoveryAmount,
} from "./adminAgencyRecoveriesService"

export const useAdminAgencyRecoveries = (params?: { status?: string; agency_id?: string }) =>
    useQuery({
        queryKey: queryKeys.adminBilling.agencyRecoveries(params),
        queryFn: () => getAdminAgencyRecoveries(params),
        staleTime: 15_000,
    })

const useInvalidateAgencyRecoveries = () => {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: queryKeys.adminBilling.all })
}

export const useMarkAgencyRecoveryPaid = () => {
    const invalidate = useInvalidateAgencyRecoveries()
    return useMutation({
        mutationFn: (recoveryId: string) => markAgencyRecoveryPaid(recoveryId),
        onSuccess: invalidate,
    })
}

export const useMarkAgencyRecoveryUnpaid = () => {
    const invalidate = useInvalidateAgencyRecoveries()
    return useMutation({
        mutationFn: (recoveryId: string) => markAgencyRecoveryUnpaid(recoveryId),
        onSuccess: invalidate,
    })
}

export const useUpdateAgencyRecoveryAmount = () => {
    const invalidate = useInvalidateAgencyRecoveries()
    return useMutation({
        mutationFn: ({ recoveryId, amount }: { recoveryId: string; amount: number }) =>
            updateAgencyRecoveryAmount(recoveryId, amount),
        onSuccess: invalidate,
    })
}
