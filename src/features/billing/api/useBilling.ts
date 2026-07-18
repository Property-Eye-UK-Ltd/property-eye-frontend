import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { cancelPlan, getInvoices, getSubscription } from "./billingService"

export const useSubscription = () =>
    useQuery({
        queryKey: queryKeys.billing.currentPlan(),
        queryFn: getSubscription,
        staleTime: 10_000,
    })

export const useInvoices = () =>
    useQuery({
        queryKey: queryKeys.billing.invoices(),
        queryFn: getInvoices,
        staleTime: 30_000,
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
