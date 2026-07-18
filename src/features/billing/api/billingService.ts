import apiClient from "@/lib/apiClient"
import { PublicPlanResponse } from "@/types/billing.types"

export interface SubscriptionOverviewResponse {
    plan_name: string
    price_gbp: number
    billing_interval: string
    next_billing_date: string
    status: string
}

export interface InvoiceResponse {
    invoice_number: string
    payment_type: string
    billing_date: string
    amount_gbp: number
    status: string
    invoice_pdf_url: string
}

export interface CheckoutResponse {
    checkout_url: string
}

export const getSubscription = async (): Promise<SubscriptionOverviewResponse> => {
    const { data } = await apiClient.get<SubscriptionOverviewResponse>("/dashboard/billing/current-plan");
    return data;
};

export const subscribeToPlan = async (planId: string): Promise<CheckoutResponse> => {
    const { data } = await apiClient.post<CheckoutResponse>(`/dashboard/billing/subscribe?plan_id=${planId}`);
    return data;
};

export const getPlans = async (): Promise<PublicPlanResponse[]> => {
    const { data } = await apiClient.get<PublicPlanResponse[]>("/public/plans");
    return data;
};

export const getInvoices = async (): Promise<InvoiceResponse[]> => {
    const { data } = await apiClient.get<InvoiceResponse[]>("/dashboard/billing/invoices");
    return data;
};

export const downloadInvoice = async (invoiceNumber: string): Promise<string> => {
    const { data } = await apiClient.get<{ download_url: string }>(
        `/dashboard/billing/invoices/${invoiceNumber}/download`
    );
    return data.download_url;
};

export interface CancelPlanResponse {
    status: string
    message: string
    expires_at: string
}

export const cancelPlan = async (): Promise<CancelPlanResponse> => {
    const { data } = await apiClient.post<CancelPlanResponse>("/dashboard/billing/cancel-plan");
    return data;
};
