import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getAdminEventLog } from "./reportsService"

export const useAdminEventLog = (page: number = 1, limit: number = 20, options?: { enabled?: boolean }) =>
    useQuery({
        queryKey: queryKeys.reports.eventLog({ page, limit }),
        queryFn: () => getAdminEventLog(page, limit),
        staleTime: 15_000,
        placeholderData: (prev) => prev,
        enabled: options?.enabled !== false,
    })
