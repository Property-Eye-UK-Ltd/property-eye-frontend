import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getCommissionRateSetting,
    getPlatformSettings,
    updateCommissionRateSetting,
    updatePlatformSettings,
} from "./adminConfigService"

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

export const usePlatformSettings = () =>
    useQuery({
        queryKey: queryKeys.adminConfig.platformSettings(),
        queryFn: getPlatformSettings,
    })

export const useUpdatePlatformSettings = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (propertyEyeSharePercent: number) => updatePlatformSettings(propertyEyeSharePercent),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.adminConfig.all }),
    })
}
