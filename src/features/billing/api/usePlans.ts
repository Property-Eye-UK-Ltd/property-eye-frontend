import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getPlan } from "./billingService"

export const usePlan = () =>
    useQuery({
        queryKey: queryKeys.plans.public(),
        queryFn: getPlan,
        staleTime: 60_000,
    })
