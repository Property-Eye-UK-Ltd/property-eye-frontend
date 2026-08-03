import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTeamSummary } from "@/features/team/api/useTeam"
import { Skeleton } from "@/components/ui/skeleton"

export const TeamMetrics = () => {
    const { data: summary, isLoading } = useTeamSummary()

    return (
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Card className="relative overflow-hidden">
                <div className="absolute left-0 right-0 top-0 h-2 bg-blue-500" />
                <CardHeader className="p-3 pb-1 lg:pb-2">
                    <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                        Total Users
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 lg:p-6">
                    <div className="text-2xl font-medium text-foreground lg:text-4xl">
                        {isLoading ? <Skeleton className="h-8 w-12" /> : summary?.total_users ?? 0}
                    </div>
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
                <div className="absolute left-0 right-0 top-0 h-2 bg-orange-500" />
                <CardHeader className="p-3 pb-1 lg:pb-2">
                    <CardTitle className="text-xs font-normal text-muted-foreground lg:text-sm">
                        Active Today
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 lg:p-6">
                    <div className="text-2xl font-medium text-foreground lg:text-4xl">
                        {isLoading ? <Skeleton className="h-8 w-12" /> : summary?.active_today_count ?? 0}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

