import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getPlans } from "./billingService"

export const usePlans = () =>
    useQuery({
        queryKey: queryKeys.plans.public(),
        queryFn: getPlans,
        staleTime: 60_000,
    })
