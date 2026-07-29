import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import {
    getAdminFraudDetectionGrowth,
    getAdminOverviewSummary,
    getAdminRevenueByPlan,
    getAdminSeverityDistribution,
} from "./adminOverviewService"

export const useAdminOverviewSummary = () =>
    useQuery({
        queryKey: queryKeys.adminOverview.summary(),
        queryFn: getAdminOverviewSummary,
    })

export const useAdminSeverityDistribution = () =>
    useQuery({
        queryKey: queryKeys.adminOverview.severityDistribution(),
        queryFn: getAdminSeverityDistribution,
    })

export const useAdminRevenueByPlan = () =>
    useQuery({
        queryKey: queryKeys.adminOverview.revenueByPlan(),
        queryFn: getAdminRevenueByPlan,
    })

export const useAdminFraudDetectionGrowth = () =>
    useQuery({
        queryKey: queryKeys.adminOverview.fraudDetectionGrowth(),
        queryFn: getAdminFraudDetectionGrowth,
    })
