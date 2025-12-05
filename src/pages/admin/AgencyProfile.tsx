import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { Button } from "@/components/ui/button"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { AgencyStatsCard } from "@/features/agencies/components/AgencyStatsCard"
import { AgencyTimelinePanel } from "@/features/agencies/components/AgencyTimelinePanel"
import { AgencyInformationCard } from "@/features/agencies/components/AgencyInformationCard"
import { AgencyUsersTable } from "@/features/agencies/components/AgencyUsersTable"
import { AgencyCasesTable } from "@/features/agencies/components/AgencyCasesTable"
import { AgencyProfileData, mockTimeline } from "@/data/agencyProfileData"
import { mockAgencyUsers, AgencyUser } from "@/data/agencyUsersData"
import { mockAgencyCases, AgencyCase } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { ArrowDown2, ArrowLeft, ArrowRight } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const AgencyProfile = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<"summary" | "users" | "cases">("summary")
    const [usersSortColumn, setUsersSortColumn] = useState<keyof AgencyUser | null>(null)
    const [usersSortDirection, setUsersSortDirection] = useState<"asc" | "desc">("asc")
    const [casesSortColumn, setCasesSortColumn] = useState<keyof AgencyCase | null>(null)
    const [casesSortDirection, setCasesSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)

    // Find the agency data
    const agencyData = agenciesData.find((a) => a.id === agencyId)

    if (!agencyData) {
        return (
            <DashboardLayout variant="super-admin">
                <div className="mx-auto w-full max-w-7xl px-6 py-6">
                    <p>Agency not found</p>
                </div>
            </DashboardLayout>
        )
    }

    // Map agency data to profile format
    const agencyProfile: AgencyProfileData = {
        id: agencyData.id,
        name: agencyData.name,
        address: "22 Ashfield Road, Leicester", // Default address
        email: `${agencyData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: "+44 207132 4567", // Default phone
        subscriptionPlan: agencyData.planTier,
        checksUsed: 318, // Mock data - would come from API
        checksTotal: 500, // Mock data - would come from API
        checksPercentage: 60, // Mock data - would come from API
        lastDataPull: agencyData.lastDataSync,
        dataPullStatus: agencyData.syncStatus,
        openCases: agencyData.openCases,
        recoveredCommission: "£45,317", // Mock data - would come from API
        overdueInvoices: 7, // Mock data - would come from API
        nextBillingDate: "2 Nov, 2025", // Mock data - would come from API
        landRegistry: "Land Registry", // Mock data - would come from API
        completionDate: "2 Nov, 2025", // Mock data - would come from API
        buyerName: "Kris Luther", // Mock data - would come from API
    }

    const tabs = [
        { label: "Summary", value: "summary" },
        { label: "Users", value: "users" },
        { label: "Cases", value: "cases" },
    ]

    const handleUsersSort = (column: keyof AgencyUser) => {
        if (usersSortColumn === column) {
            setUsersSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setUsersSortColumn(column)
            setUsersSortDirection("asc")
        }
    }

    const handleCasesSort = (column: keyof AgencyCase) => {
        if (casesSortColumn === column) {
            setCasesSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setCasesSortColumn(column)
            setCasesSortDirection("asc")
        }
    }

    const sortedUsers = useMemo(() => {
        if (!usersSortColumn) return mockAgencyUsers

        return [...mockAgencyUsers].sort((a, b) => {
            const aValue = a[usersSortColumn]
            const bValue = b[usersSortColumn]
            const direction = usersSortDirection === "asc" ? 1 : -1

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * direction
            }
            if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                return (aValue === bValue ? 0 : aValue ? 1 : -1) * direction
            }
            return 0
        })
    }, [usersSortColumn, usersSortDirection])

    const sortedCases = useMemo(() => {
        if (!casesSortColumn) return mockAgencyCases

        return [...mockAgencyCases].sort((a, b) => {
            const aValue = a[casesSortColumn]
            const bValue = b[casesSortColumn]
            const direction = casesSortDirection === "asc" ? 1 : -1

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * direction
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                return (aValue - bValue) * direction
            }
            return 0
        })
    }, [casesSortColumn, casesSortDirection])

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Agency Profile"
                breadcrumbs={[
                    { label: "Agencies", href: "/admin/agencies" },
                    { label: agencyData.name },
                ]}
                actions={
                    <Button
                        variant="destructive"
                        className="rounded-full bg-red-50 text-red-600 hover:bg-red-100 border-0"
                    >
                        Suspend Account
                    </Button>
                }
            />

            {/* Tabs */}
            <div className="mx-auto w-full max-w-7xl px-6 py-4">
                <CaseTypeTabs
                    tabs={tabs}
                    selected={activeTab}
                    onSelect={(value) => setActiveTab(value as "summary" | "users" | "cases")}
                />
            </div>

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl px-6 py-4">
                {activeTab === "summary" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Stats and Timeline */}
                        <div className="space-y-6 lg:col-span-2">
                            <AgencyStatsCard data={agencyProfile} />
                            <AgencyTimelinePanel data={mockTimeline} />
                        </div>

                        {/* Right Column - Agency Information (Sticky) */}
                        <div className="lg:col-span-1">
                            <AgencyInformationCard data={agencyProfile} />
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <DashboardPanel
                        title="Agency Users List"
                        noPadding
                        hasBorder
                        actions={
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted h-10 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Action
                                        <ArrowDown2 size={18} variant="Outline" className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="cursor-pointer">Invite User</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Export List</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer text-destructive">
                                        Suspend Selected
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    >
                        <AgencyUsersTable data={sortedUsers} onSort={handleUsersSort} />

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    className={cn(
                                        "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                                        currentPage === 1 ? "bg-primary text-secondary" : "text-primary"
                                    )}
                                >
                                    1
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary/10"
                                >
                                    <ArrowLeft size={16} variant="Outline" className="text-primary" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary/10"
                                >
                                    Next
                                    <ArrowRight size={16} variant="Outline" className="text-primary" />
                                </Button>
                            </div>
                        </div>
                    </DashboardPanel>
                )}

                {activeTab === "cases" && (
                    <DashboardPanel
                        title="Case List"
                        description="Monitor property-related fraud cases and recovery outcomes."
                        noPadding
                        hasBorder
                    >
                        <AgencyCasesTable data={sortedCases} onSort={handleCasesSort} />

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    className={cn(
                                        "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                                        currentPage === 1 ? "bg-primary text-secondary" : "text-primary"
                                    )}
                                >
                                    1
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary/10"
                                >
                                    <ArrowLeft size={16} variant="Outline" className="text-primary" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary/10"
                                >
                                    Next
                                    <ArrowRight size={16} variant="Outline" className="text-primary" />
                                </Button>
                            </div>
                        </div>
                    </DashboardPanel>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AgencyProfile
