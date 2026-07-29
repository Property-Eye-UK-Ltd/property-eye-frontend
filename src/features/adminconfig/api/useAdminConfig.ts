import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getCommissionRateSetting, updateCommissionRateSetting } from "./adminConfigService"

export const useCommissionRateSetting = () =>
    useQuery({
        queryKey: queryKeys.adminConfig.commissionRate(),
        queryFn: getCommissionRateSetting,
    })

export const useUpdateCommissionRateSetting = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (ratePercent: number) => updateCommissionRateSetting(ratePercent),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.adminConfig.all }),
    })
}
