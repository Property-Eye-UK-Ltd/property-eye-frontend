import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { approveCommission, getAdminCommissions, markCommissionPaid, markCommissionUnpaid, updateCommissionAmount } from "./adminCommissionsService"

export const useAdminCommissions = (params?: { status?: string; marketer_id?: string; agency_id?: string }) =>
    useQuery({
        queryKey: queryKeys.adminBilling.commissions(params),
        queryFn: () => getAdminCommissions(params),
        staleTime: 15_000,
    })

const useInvalidateCommissions = () => {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: queryKeys.adminBilling.all })
}

export const useApproveCommission = () => {
    const invalidate = useInvalidateCommissions()
    return useMutation({
        mutationFn: (commissionId: string) => approveCommission(commissionId),
        onSuccess: invalidate,
    })
}

export const useMarkCommissionPaid = () => {
    const invalidate = useInvalidateCommissions()
    return useMutation({
        mutationFn: (commissionId: string) => markCommissionPaid(commissionId),
        onSuccess: invalidate,
    })
}

export const useMarkCommissionUnpaid = () => {
    const invalidate = useInvalidateCommissions()
    return useMutation({
        mutationFn: (commissionId: string) => markCommissionUnpaid(commissionId),
        onSuccess: invalidate,
    })
}

export const useUpdateCommissionAmount = () => {
    const invalidate = useInvalidateCommissions()
    return useMutation({
        mutationFn: ({ commissionId, amount }: { commissionId: string; amount: number }) =>
            updateCommissionAmount(commissionId, amount),
        onSuccess: invalidate,
    })
}
