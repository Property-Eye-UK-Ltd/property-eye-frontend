import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { approveAttribution, getAdminAttributions, rejectAttribution } from "./adminAttributionsService"

export const useAdminAttributions = (params?: { status?: string; has_conflict?: boolean; method?: string }) =>
    useQuery({
        queryKey: queryKeys.adminAttributions.list(params),
        queryFn: () => getAdminAttributions(params),
        staleTime: 15_000,
    })

const useInvalidateAttributions = () => {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: queryKeys.adminAttributions.all })
}

export const useApproveAttribution = () => {
    const invalidate = useInvalidateAttributions()
    return useMutation({
        mutationFn: (attributionId: string) => approveAttribution(attributionId),
        onSuccess: invalidate,
    })
}

export const useRejectAttribution = () => {
    const invalidate = useInvalidateAttributions()
    return useMutation({
        mutationFn: ({ attributionId, reason }: { attributionId: string; reason: string }) =>
            rejectAttribution(attributionId, reason),
        onSuccess: invalidate,
    })
}
