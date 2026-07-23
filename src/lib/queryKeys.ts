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
        summary: (period?: string) => ["overview", "summary", period] as const,
        severityDistribution: (period?: string) => ["overview", "severity-distribution", period] as const,
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
    },
    adminCases: {
        all: ["admin-cases"] as const,
        list: (params?: Record<string, unknown>) => ["admin-cases", "list", params] as const,
        agencies: () => ["admin-cases", "agencies"] as const,
        detail: (caseId: string) => ["admin-cases", "detail", caseId] as const,
        timeline: (caseId: string) => ["admin-cases", "timeline", caseId] as const,
        disputes: (params?: Record<string, unknown>) => ["admin-cases", "disputes", params] as const,
    },
    agencies: {
        all: ["agencies"] as const,
        summary: () => ["agencies", "summary"] as const,
        list: (params?: Record<string, unknown>) => ["agencies", "list", params] as const,
        detail: (agencyId: string) => ["agencies", "detail", agencyId] as const,
        users: (agencyId: string, params?: Record<string, unknown>) => ["agencies", "users", agencyId, params] as const,
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
