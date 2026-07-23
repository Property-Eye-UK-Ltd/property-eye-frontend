import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { cancelPlan, getInvoices, getSubscription } from "./billingService"

export const useSubscription = () =>
    useQuery({
        queryKey: queryKeys.billing.currentPlan(),
        queryFn: getSubscription,
        staleTime: 10_000,
    })

export const useInvoices = (page: number = 1, limit: number = 10) =>
    useQuery({
        queryKey: queryKeys.billing.invoices({ page, limit }),
        queryFn: () => getInvoices(page, limit),
        staleTime: 30_000,
        placeholderData: (prev) => prev,
    })

export const useCancelPlan = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cancelPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.billing.currentPlan() })
        },
    })
}
