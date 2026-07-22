import { Skeleton } from "@/components/ui/skeleton"

interface DashboardDetailsSkeletonProps {
    layoutType?: "profile" | "billing" | "simple"
}

export const DashboardDetailsSkeleton = ({ layoutType = "profile" }: DashboardDetailsSkeletonProps) => {
    if (layoutType === "simple") {
        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        )
    }

    if (layoutType === "billing") {
        return (
            <div className="space-y-6">
                {/* Heading / Info grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-border">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-10 w-24 rounded-full" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/6" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                            <Skeleton className="h-6 w-1/3" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Default: "profile" layout (similar to AgencyProfile, CaseDetails, StaffDetails)
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
            {/* Left Column (Main content / Tabs / Stats / Activity) */}
            <div className="space-y-6 lg:col-span-2">
                {/* Tabs Skeleton */}
                <div className="flex space-x-2 border-b border-border pb-3">
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                </div>
                {/* Stats / Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                </div>
                {/* Table/List Panel Skeleton */}
                <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>

            {/* Right Column (Sidebar Card Info) */}
            <div className="lg:col-span-1 space-y-6">
                <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-6">
                    <div className="flex flex-col items-center space-y-3 pb-4 border-b border-border">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
