// Mirrors backend/src/schemas/dashboard.py (Billing section) and
// backend/src/models/billing.py (Plan/Subscription/Invoice).

// Subscription.status values (src/models/billing.py comment):
// unsubscribed, active, trialing, past_due, canceled.
// Per the agreed subscription design: only "active"/"trialing" allow scans
// without restriction, "past_due" is tolerated (still scanned, shown as a
// warning), "canceled"/"unsubscribed" are fully inactive.
export type SubscriptionStatus = "unsubscribed" | "active" | "trialing" | "past_due" | "canceled"

export interface BillingPlanResponse {
    plan_name: string
    price_gbp: number
    billing_interval: string
    // checks_used/checks_quota are no longer enforced anywhere (PPD checks
    // are not quota-metered per the agreed design) — display-only if shown
    // at all; do not build usage-bar UI implying a hard limit.
    checks_used: number
    checks_quota: number
    crm_users_used: number
    crm_users_quota: number
    next_billing_date: string
    status: SubscriptionStatus | string
}

export interface BillingInvoiceResponse {
    invoice_number: string
    payment_type: string
    billing_date: string
    amount_gbp: number
    status: string
    invoice_pdf_url: string
}

export interface InvoiceDownloadResponse {
    download_url: string
}

export interface CancelPlanResponse {
    status: string
    message: string
    expires_at: string
}

// GET /public/plans — the real, fixed pricing catalog. Source of truth for
// the Subscription Plans page. Mirrors backend/src/schemas/public_site.py::
// PublicPlanResponse exactly. `id` is the real Plan.id (added to this
// response so the authenticated subscribe flow has something to pass to
// POST /dashboard/billing/subscribe). No usage/quota fields — checks
// aren't metered and there's no seat cap.
export interface PublicPlanResponse {
    id: string
    slug: string
    name: string
    price_gbp_monthly: number
    billing_interval: string
    target_customer_description: string
    feature_list: string[]
    cta_text: string
    schema_default: boolean
}
