/**
 * Central react-query key registry for the agency dashboard.
 * One namespace per domain service (see src/features/<domain>/api/).
 * Keep keys as arrays so partial invalidation (e.g. queryKeys.cases.all)
 * cascades to every more-specific key under it.
 */

export const queryKeys = {
    headerState: {
        all: ["header-state"] as const,
    },
    notifications: {
        all: ["notifications"] as const,
        list: (params?: Record<string, unknown>) => ["notifications", "list", params] as const,
    },
    overview: {
        all: ["overview"] as const,
        summary: () => ["overview", "summary"] as const,
        severityDistribution: () => ["overview", "severity-distribution"] as const,
        topRecoveries: (period?: string) => ["overview", "top-recoveries", period] as const,
        highPriorityAlerts: (params?: Record<string, unknown>) => ["overview", "high-priority-alerts", params] as const,
        fraudDetectionGrowth: (range?: string) => ["overview", "fraud-detection-growth", range] as const,
        nextSweep: () => ["overview", "next-sweep"] as const,
    },
    cases: {
        all: ["cases"] as const,
        list: (params?: Record<string, unknown>) => ["cases", "list", params] as const,
        summary: (period?: string) => ["cases", "summary", period] as const,
        detail: (caseId: string) => ["cases", "detail", caseId] as const,
        timeline: (caseId: string) => ["cases", "timeline", caseId] as const,
    },
    team: {
        all: ["team"] as const,
        summary: () => ["team", "summary"] as const,
        users: (params?: Record<string, unknown>) => ["team", "users", params] as const,
    },
    adminTeam: {
        all: ["admin-team"] as const,
        summary: () => ["admin-team", "summary"] as const,
        users: (params?: Record<string, unknown>) => ["admin-team", "users", params] as const,
        user: (userId: string) => ["admin-team", "user", userId] as const,
    },
    reports: {
        all: ["reports"] as const,
        eventLog: (params?: Record<string, unknown>) => ["reports", "event-log", params] as const,
    },
    adminCases: {
        all: ["admin-cases"] as const,
        list: (params?: Record<string, unknown>) => ["admin-cases", "list", params] as const,
        agencies: () => ["admin-cases", "agencies"] as const,
        detail: (caseId: string) => ["admin-cases", "detail", caseId] as const,
        timeline: (caseId: string) => ["admin-cases", "timeline", caseId] as const,
        disputes: (params?: Record<string, unknown>) => ["admin-cases", "disputes", params] as const,
        registerExtract: (caseId: string) => ["admin-cases", "register-extract", caseId] as const,
    },
    adminBilling: {
        all: ["admin-billing"] as const,
        metrics: (period: string) => ["admin-billing", "metrics", period] as const,
        invoices: (params?: Record<string, unknown>) => ["admin-billing", "invoices", params] as const,
        invoiceDetail: (invoiceId: string) => ["admin-billing", "invoice-detail", invoiceId] as const,
        commissions: (params?: Record<string, unknown>) => ["admin-billing", "commissions", params] as const,
        agencyRecoveries: (params?: Record<string, unknown>) => ["admin-billing", "agency-recoveries", params] as const,
    },
    adminOverview: {
        all: ["admin-overview"] as const,
        summary: () => ["admin-overview", "summary"] as const,
        severityDistribution: () => ["admin-overview", "severity-distribution"] as const,
        revenueByPlan: () => ["admin-overview", "revenue-by-plan"] as const,
        fraudDetectionGrowth: () => ["admin-overview", "fraud-detection-growth"] as const,
    },
    adminConfig: {
        all: ["admin-config"] as const,
        commissionRate: () => ["admin-config", "commission-rate"] as const,
        platformSettings: () => ["admin-config", "platform-settings"] as const,
    },
    agencies: {
        all: ["agencies"] as const,
        summary: () => ["agencies", "summary"] as const,
        list: (params?: Record<string, unknown>) => ["agencies", "list", params] as const,
        detail: (agencyId: string) => ["agencies", "detail", agencyId] as const,
        users: (agencyId: string, params?: Record<string, unknown>) => ["agencies", "users", agencyId, params] as const,
    },
    adminMarketers: {
        all: ["admin-marketers"] as const,
        list: () => ["admin-marketers", "list"] as const,
        detail: (marketerId: string) => ["admin-marketers", "detail", marketerId] as const,
        agencies: (marketerId: string) => ["admin-marketers", "agencies", marketerId] as const,
        unattributedAgencies: () => ["admin-marketers", "unattributed-agencies"] as const,
    },
    adminAttributions: {
        all: ["admin-attributions"] as const,
        list: (params?: Record<string, unknown>) => ["admin-attributions", "list", params] as const,
    },
    marketer: {
        all: ["marketer"] as const,
        profile: () => ["marketer", "profile"] as const,
        overview: () => ["marketer", "overview"] as const,
        agencies: () => ["marketer", "agencies"] as const,
        agencyDetail: (agencyId: string) => ["marketer", "agency-detail", agencyId] as const,
        agencySearch: (q: string) => ["marketer", "agency-search", q] as const,
        referralStats: () => ["marketer", "referral-stats"] as const,
        invites: () => ["marketer", "invites"] as const,
        inviteDetail: (inviteId: string) => ["marketer", "invite-detail", inviteId] as const,
        fraudCases: () => ["marketer", "fraud-cases"] as const,
        commissions: () => ["marketer", "commissions"] as const,
        commissionsSummary: () => ["marketer", "commissions-summary"] as const,
        payments: () => ["marketer", "payments"] as const,
        payoutStatement: (payoutId: string) => ["marketer", "payout-statement", payoutId] as const,
        notificationSettings: () => ["marketer", "notification-settings"] as const,
    },
    properties: {
        all: ["properties"] as const,
        list: (params?: Record<string, unknown>) => ["properties", "list", params] as const,
        detail: (listingId: string) => ["properties", "detail", listingId] as const,
    },
    billing: {
        all: ["billing"] as const,
        currentPlan: () => ["billing", "current-plan"] as const,
        invoices: (params?: Record<string, unknown>) => ["billing", "invoices", params] as const,
    },
    plans: {
        all: ["plans"] as const,
        public: () => ["plans", "public"] as const,
    },
    checks: {
        all: ["checks"] as const,
        progress: (jobId: string) => ["checks", "progress", jobId] as const,
        history: () => ["checks", "history"] as const,
    },
} as const;
