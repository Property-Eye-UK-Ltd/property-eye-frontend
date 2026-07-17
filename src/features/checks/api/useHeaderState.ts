import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getHeaderState } from "./checksService"

export const useHeaderState = () => {
    return useQuery({
        queryKey: queryKeys.headerState.all,
        queryFn: getHeaderState,
        staleTime: 30_000,
    })
}
