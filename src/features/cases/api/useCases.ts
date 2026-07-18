import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getCaseDetail, getCaseTimeline, getCases, getCasesSummary, raiseDispute } from "./casesService"

export const useCases = (params?: {
    period?: string
    status?: string
    page?: number
    page_size?: number
    sort_by?: string
    sort_dir?: string
}) =>
    useQuery({
        queryKey: queryKeys.cases.list(params),
        queryFn: () => getCases(params),
        staleTime: 15_000,
    })

export const useCasesSummary = (period?: string) =>
    useQuery({
        queryKey: queryKeys.cases.summary(period),
        queryFn: () => getCasesSummary(period),
        staleTime: 15_000,
    })

export const useCaseDetail = (caseId: string) =>
    useQuery({
        queryKey: queryKeys.cases.detail(caseId),
        queryFn: () => getCaseDetail(caseId),
        enabled: !!caseId,
        staleTime: 10_000,
    })

export const useCaseTimeline = (caseId: string) =>
    useQuery({
        queryKey: queryKeys.cases.timeline(caseId),
        queryFn: () => getCaseTimeline(caseId),
        enabled: !!caseId,
        staleTime: 10_000,
    })

export const useRaiseDispute = (caseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (reason: string) => raiseDispute(caseId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
            queryClient.invalidateQueries({ queryKey: queryKeys.cases.timeline(caseId) })
        },
    })
}
