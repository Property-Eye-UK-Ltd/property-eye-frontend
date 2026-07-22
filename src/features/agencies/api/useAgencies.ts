import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getAdminAgenciesSummary, getAdminAgenciesList, getAdminAgencyDetail } from "./agencyService"

export const useAdminAgenciesSummary = () =>
    useQuery({
        queryKey: queryKeys.agencies.summary(),
        queryFn: getAdminAgenciesSummary,
        staleTime: 30_000,
    })

export const useAdminAgenciesList = (params?: { page?: number; page_size?: number; search?: string }) =>
    useQuery({
        queryKey: queryKeys.agencies.list(params),
        queryFn: () => getAdminAgenciesList(params),
        staleTime: 15_000,
    })

export const useAdminAgencyDetail = (agencyId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.agencies.detail(agencyId ?? ""),
        queryFn: () => getAdminAgencyDetail(agencyId as string),
        enabled: !!agencyId,
        staleTime: 15_000,
    })
