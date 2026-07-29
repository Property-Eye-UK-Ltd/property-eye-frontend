import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getFraudDetectionGrowth,
    getHighPriorityAlerts,
    getNextSweep,
    getOverviewSummary,
    getSeverityDistribution,
    getTopRecoveries,
} from "./overviewService"

export const useOverviewSummary = () =>
    useQuery({
        queryKey: queryKeys.overview.summary(),
        queryFn: () => getOverviewSummary(),
        staleTime: 30_000,
    })

export const useSeverityDistribution = () =>
    useQuery({
        queryKey: queryKeys.overview.severityDistribution(),
        queryFn: () => getSeverityDistribution(),
        staleTime: 30_000,
    })

export const useTopRecoveries = () =>
    useQuery({
        queryKey: queryKeys.overview.topRecoveries(),
        queryFn: () => getTopRecoveries(),
        staleTime: 30_000,
    })

export const useHighPriorityAlerts = (page: number) =>
    useQuery({
        queryKey: queryKeys.overview.highPriorityAlerts({ page }),
        queryFn: () => getHighPriorityAlerts({ page, page_size: 10 }),
        staleTime: 30_000,
    })

// Backend stub today (always []) — still wired for real, not faked.
export const useFraudDetectionGrowth = () =>
    useQuery({
        queryKey: queryKeys.overview.fraudDetectionGrowth(),
        queryFn: () => getFraudDetectionGrowth(),
        staleTime: 60_000,
    })

export const useNextSweep = () =>
    useQuery({
        queryKey: queryKeys.overview.nextSweep(),
        queryFn: () => getNextSweep(),
        staleTime: 60_000,
    })
