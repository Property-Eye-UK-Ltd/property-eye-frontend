import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { MetricCards, MetricCard } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2, ProfileAdd } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StaffListTable } from "@/features/adminteam/components/StaffListTable"
import type { StaffRole } from "@/data/teamManagementData"
import { AddStaffModal, AddStaffFormValues } from "@/features/adminteam/components/modals/AddStaffModal"
import { toAdminRoleLabel, toAdminRoleValue } from "@/features/adminteam/api/adminTeamService"
import { useAdminTeamSummary, useAdminTeamUsers, useInviteAdminTeamUser } from "@/features/adminteam/api/useAdminTeam"
import { toast } from "sonner"

const panelBtnClass =
    "h-8 shrink-0 rounded-full border-border px-3 text-xs lg:h-9 lg:px-4 lg:text-sm"

const PAGE_SIZE = 10

const sortByMap: Record<string, string> = {
    role: "role",
    lastActiveDate: "last_active_at",
    status: "status",
}

const TeamManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<"role" | "lastActiveDate" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false)

    const { data: summary } = useAdminTeamSummary()
    const { data: staffPage } = useAdminTeamUsers({
        page,
        limit: PAGE_SIZE,
        search: searchQuery || undefined,
        sort_by: sortColumn ? sortByMap[sortColumn] : "name",
        sort_dir: sortDirection,
    })
    const inviteMutation = useInviteAdminTeamUser()

    const handleSortChange = (column: "role" | "lastActiveDate" | "status") => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
        setPage(1)
    }

    const metrics: MetricCard[] = [
        {
            title: "Total Staffs",
            value: String(summary?.total_users ?? 0),
            period: "",
            change: "",
            topBarClass: "bg-blue-500",
        },
        {
            title: "Active Today",
            value: String(summary?.active_today_count ?? 0),
            period: "",
            change: "",
            topBarClass: "bg-gray-500",
        },
        {
            title: "Suspended Staffs",
            value: String(summary?.suspended_count ?? 0),
            period: "",
            change: "",
            topBarClass: "bg-red-500",
        },
    ]

    const staffItems = (staffPage?.items ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        role: toAdminRoleLabel(s.role) as StaffRole,
        lastActiveDate: s.lastActive ?? "Never",
        status: s.status,
    }))
    const totalStaff = staffPage?.total ?? 0

    const handleAddStaff = async (values: AddStaffFormValues) => {
        try {
            await inviteMutation.mutateAsync({
                name: values.name,
                email: values.email,
                role: toAdminRoleValue(values.role),
            })
            setIsAddStaffModalOpen(false)
            toast.success("Staff invited successfully", {
                description: `An invitation has been sent to ${values.email}`,
            })
        } catch (error) {
            console.error("Failed to invite staff:", error)
            toast.error("Failed to invite staff. Please try again.")
        }
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Team Management"
                actions={
                    <Button
                        onClick={() => setIsAddStaffModalOpen(true)}
                        className="h-9 shrink-0 rounded-full bg-primary px-3 text-sm font-normal text-white lg:h-10 lg:px-4"
                    >
                        <ProfileAdd size={16} variant="Outline" className="mr-1.5 lg:mr-2" />
                        <span className="hidden sm:inline">Add a Staff</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                }
            />

            {/* Page Content */}
            <DashboardPageContent className="space-y-3 lg:space-y-4">
                {/* Metric Cards */}
                <MetricCards metrics={metrics} columns={3} />

                {/* Staff List Panel */}
                <DashboardPanel
                    title="Staff List"
                    description="Manage staffs, roles, and access permissions"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex flex-nowrap items-center gap-1.5 lg:gap-2">
                            <div className="relative min-w-[9rem] flex-1 sm:min-w-0 sm:flex-none sm:w-44 lg:w-56">
                                <SearchNormal
                                    size={16}
                                    variant="Outline"
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground lg:left-3"
                                />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setPage(1)
                                    }}
                                    className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                                />
                            </div>

                            <Button variant="outline" className={panelBtnClass}>
                                <Filter size={16} variant="Outline" className="mr-1 lg:mr-2" />
                                Filter
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={panelBtnClass}>
                                        Export
                                        <ArrowDown2 size={16} variant="Outline" className="ml-1 lg:ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="cursor-pointer">Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                >
                    <StaffListTable
                        data={staffItems}
                        total={totalStaff}
                        page={page}
                        pageSize={PAGE_SIZE}
                        onPageChange={setPage}
                        sortColumn={sortColumn}
                        onSortChange={handleSortChange}
                    />
                </DashboardPanel>
            </DashboardPageContent>

            {/* Add Staff Modal */}
            <AddStaffModal
                open={isAddStaffModalOpen}
                onClose={() => setIsAddStaffModalOpen(false)}
                onSubmit={handleAddStaff}
                isSubmitting={inviteMutation.isPending}
            />
        </DashboardLayout>
    )
}

export default TeamManagement
