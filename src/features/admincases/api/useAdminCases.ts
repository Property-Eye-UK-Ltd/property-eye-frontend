import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    approveAndCloseCase,
    flagCase,
    getAdminCaseAgencies,
    getAdminCaseDetail,
    getAdminCasePropertyParties,
    getAdminCases,
    getAdminCaseTimeline,
    getCaseDisputes,
    reopenCase,
    resolveAgencyDisputeApi,
    returnCase,
    startCaseReview,
    submitCaseDetermination,
    SubmitDeterminationPayload,
} from "./adminCasesService"
import { getRegisterExtract } from "@/features/casescans/api/scanSessionService"

export const useAdminCases = (params?: {
    page?: number
    page_size?: number
    search?: string
    status?: string
    agency_id?: string
}) =>
    useQuery({
        queryKey: queryKeys.adminCases.list(params),
        queryFn: () => getAdminCases(params),
        staleTime: 15_000,
    })

export const useAdminCaseAgencies = () =>
    useQuery({
        queryKey: queryKeys.adminCases.agencies(),
        queryFn: getAdminCaseAgencies,
        staleTime: 60_000,
    })

export const useAdminCaseDetail = (caseId: string) =>
    useQuery({
        queryKey: queryKeys.adminCases.detail(caseId),
        queryFn: () => getAdminCaseDetail(caseId),
        enabled: !!caseId,
        staleTime: 10_000,
    })

export const useAdminCasePropertyParties = (caseId: string) =>
    useQuery({
        queryKey: [...queryKeys.adminCases.detail(caseId), "property-parties"] as const,
        queryFn: () => getAdminCasePropertyParties(caseId),
        enabled: !!caseId,
        staleTime: 10_000,
    })

export const useAdminCaseTimeline = (caseId: string) =>
    useQuery({
        queryKey: queryKeys.adminCases.timeline(caseId),
        queryFn: () => getAdminCaseTimeline(caseId),
        enabled: !!caseId,
        staleTime: 10_000,
    })

export const useAdminCaseDisputes = (params: { fraud_match_id?: string; agency_id?: string; status?: string }) =>
    useQuery({
        queryKey: queryKeys.adminCases.disputes(params),
        queryFn: () => getCaseDisputes(params),
        enabled: !!(params.fraud_match_id || params.agency_id),
        staleTime: 10_000,
    })

/**
 * Fetches the full register extract for a case. GET .../register-extract
 * performs the live HMLR fetch itself when no cached extract exists, so
 * enabling this query is what actually runs "verify with register" for a
 * single case (no separate scan-session round trip needed).
 */
export const useRegisterExtract = (caseId: string, enabled: boolean) =>
    useQuery({
        queryKey: queryKeys.adminCases.registerExtract(caseId),
        queryFn: () => getRegisterExtract(caseId),
        enabled: !!caseId && enabled,
        staleTime: 60_000,
    })

export const useVerifyWithRegister = (caseId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (forceRefresh: boolean = false) => getRegisterExtract(caseId, forceRefresh),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.adminCases.registerExtract(caseId), data)
            queryClient.invalidateQueries({ queryKey: queryKeys.adminCases.detail(caseId) })
        },
    })
}

const useInvalidateCase = (caseId: string) => {
    const queryClient = useQueryClient()
    return () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.adminCases.detail(caseId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.adminCases.timeline(caseId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.adminCases.all })
    }
}

export const useStartCaseReview = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: () => startCaseReview(caseId),
        onSuccess: invalidate,
    })
}

export const useSubmitCaseDetermination = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: (payload: SubmitDeterminationPayload) => submitCaseDetermination(caseId, payload),
        onSuccess: invalidate,
    })
}

export const useApproveAndCloseCase = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: () => approveAndCloseCase(caseId),
        onSuccess: invalidate,
    })
}

export const useReturnCase = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: (returnReason: string) => returnCase(caseId, returnReason),
        onSuccess: invalidate,
    })
}

export const useFlagCase = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: (flagNote: string) => flagCase(caseId, flagNote),
        onSuccess: invalidate,
    })
}

export const useReopenCase = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: () => reopenCase(caseId),
        onSuccess: invalidate,
    })
}

export const useResolveAgencyDispute = (caseId: string) => {
    const invalidate = useInvalidateCase(caseId)
    return useMutation({
        mutationFn: ({ disputeId, resolutionNotes }: { disputeId: string; resolutionNotes: string }) =>
            resolveAgencyDisputeApi(disputeId, resolutionNotes),
        onSuccess: invalidate,
    })
}
