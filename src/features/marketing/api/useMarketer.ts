import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    AttributionClaimRequest,
    MarketerNotificationPreferences,
    MarketerProfileUpdate,
    getMarketerAgencies,
    getMarketerAgencyDetail,
    getMarketerCommissions,
    getMarketerCommissionsSummary,
    getMarketerFraudCases,
    getMarketerInviteDetail,
    getMarketerInvites,
    getMarketerNotificationSettings,
    getMarketerOverview,
    getMarketerPayments,
    getMarketerPayoutStatement,
    getMarketerProfile,
    getMarketerReferralStats,
    searchMarketerAgencies,
    sendMarketerInvite,
    submitAttributionClaim,
    updateMarketerNotificationSettings,
    updateMarketerProfile,
} from "./marketerService"

export const useMarketerProfile = () =>
    useQuery({
        queryKey: queryKeys.marketer.profile(),
        queryFn: getMarketerProfile,
        staleTime: 30_000,
    })

export const useUpdateMarketerProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: MarketerProfileUpdate) => updateMarketerProfile(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.marketer.profile() }),
    })
}

export const useMarketerOverview = () =>
    useQuery({
        queryKey: queryKeys.marketer.overview(),
        queryFn: getMarketerOverview,
        staleTime: 15_000,
    })

export const useMarketerAgencies = () =>
    useQuery({
        queryKey: queryKeys.marketer.agencies(),
        queryFn: getMarketerAgencies,
        staleTime: 15_000,
    })

export const useMarketerAgencyDetail = (agencyId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.marketer.agencyDetail(agencyId ?? ""),
        queryFn: () => getMarketerAgencyDetail(agencyId as string),
        enabled: !!agencyId,
        staleTime: 15_000,
    })

export const useSearchMarketerAgencies = (q: string) =>
    useQuery({
        queryKey: queryKeys.marketer.agencySearch(q),
        queryFn: () => searchMarketerAgencies(q),
        enabled: q.trim().length > 0,
        staleTime: 10_000,
    })

export const useSubmitAttributionClaim = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: AttributionClaimRequest) => submitAttributionClaim(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.marketer.agencies() }),
    })
}

export const useMarketerReferralStats = () =>
    useQuery({
        queryKey: queryKeys.marketer.referralStats(),
        queryFn: getMarketerReferralStats,
        staleTime: 15_000,
    })

export const useMarketerInvites = () =>
    useQuery({
        queryKey: queryKeys.marketer.invites(),
        queryFn: getMarketerInvites,
        staleTime: 15_000,
    })

export const useMarketerInviteDetail = (inviteId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.marketer.inviteDetail(inviteId ?? ""),
        queryFn: () => getMarketerInviteDetail(inviteId as string),
        enabled: !!inviteId,
        staleTime: 15_000,
    })

export const useSendMarketerInvite = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: { invited_email: string; message?: string }) => sendMarketerInvite(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.marketer.invites() })
            queryClient.invalidateQueries({ queryKey: queryKeys.marketer.referralStats() })
        },
    })
}

export const useMarketerFraudCases = () =>
    useQuery({
        queryKey: queryKeys.marketer.fraudCases(),
        queryFn: getMarketerFraudCases,
        staleTime: 15_000,
    })

export const useMarketerCommissions = () =>
    useQuery({
        queryKey: queryKeys.marketer.commissions(),
        queryFn: getMarketerCommissions,
        staleTime: 15_000,
    })

export const useMarketerCommissionsSummary = () =>
    useQuery({
        queryKey: queryKeys.marketer.commissionsSummary(),
        queryFn: getMarketerCommissionsSummary,
        staleTime: 15_000,
    })

export const useMarketerPayments = () =>
    useQuery({
        queryKey: queryKeys.marketer.payments(),
        queryFn: getMarketerPayments,
        staleTime: 15_000,
    })

export const useMarketerPayoutStatement = (payoutId: string | undefined) =>
    useQuery({
        queryKey: queryKeys.marketer.payoutStatement(payoutId ?? ""),
        queryFn: () => getMarketerPayoutStatement(payoutId as string),
        enabled: !!payoutId,
        staleTime: 60_000,
    })

export const useMarketerNotificationSettings = () =>
    useQuery({
        queryKey: queryKeys.marketer.notificationSettings(),
        queryFn: getMarketerNotificationSettings,
        staleTime: 30_000,
    })

export const useUpdateMarketerNotificationSettings = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: Partial<MarketerNotificationPreferences>) =>
            updateMarketerNotificationSettings(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.marketer.notificationSettings() }),
    })
}
