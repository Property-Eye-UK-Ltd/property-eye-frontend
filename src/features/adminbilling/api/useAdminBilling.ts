import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getAdminBillingMetrics, getAdminInvoiceDetail, getAdminInvoices } from "./adminBillingService"

export const useAdminBillingMetrics = (period: string) =>
    useQuery({
        queryKey: queryKeys.adminBilling.metrics(period),
        queryFn: () => getAdminBillingMetrics(period),
        staleTime: 15_000,
    })

export const useAdminInvoices = (
    params?: {
        page?: number
        page_size?: number
        search?: string
        status?: string
    },
    options?: { enabled?: boolean }
) =>
    useQuery({
        queryKey: queryKeys.adminBilling.invoices(params),
        queryFn: () => getAdminInvoices(params),
        staleTime: 15_000,
        enabled: options?.enabled !== false,
    })

export const useAdminInvoiceDetail = (invoiceId: string) =>
    useQuery({
        queryKey: queryKeys.adminBilling.invoiceDetail(invoiceId),
        queryFn: () => getAdminInvoiceDetail(invoiceId),
        enabled: !!invoiceId,
        staleTime: 10_000,
    })
