import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { MetricCards } from "@/features/overview/components/MetricCards"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal, Filter, ArrowDown2, ProfileAdd } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StaffListTable } from "@/features/adminteam/components/StaffListTable"
import { mockStaffMembers, teamMetrics } from "@/data/teamManagementData"
import { AddStaffModal, AddStaffFormValues } from "@/features/adminteam/components/modals/AddStaffModal"

const TeamManagement = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false)

    const filteredStaff = mockStaffMembers.filter(
        (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddStaff = async (values: AddStaffFormValues) => {
        console.log("Adding staff:", values)
        // In real app, would call API to add staff
        setIsAddStaffModalOpen(false)
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Team Management"
                actions={
                    <Button onClick={() => setIsAddStaffModalOpen(true)} className="rounded-full bg-primary font-normal text-white">
                        <ProfileAdd size={18} variant="Outline" />
                        Add a Staff
                    </Button>
                }
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl space-y-4 px-6 py-6">
                {/* Metric Cards */}
                <MetricCards metrics={teamMetrics} columns={3} />

                {/* Staff List Panel */}
                <DashboardPanel
                    title="Staff List"
                    description="Manage staffs, roles, and access permissions"
                    noPadding
                    hasBorder
                    actions={
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative">
                                <SearchNormal
                                    size={18}
                                    variant="Outline"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64 rounded-full border-border bg-background pl-10 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>

                            {/* Filter Button */}
                            <Button
                                variant="outline"
                                className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Filter size={18} variant="Outline" className="mr-2" />
                                Filter
                            </Button>

                            {/* Export Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                                    >
                                        Export
                                        <ArrowDown2 size={18} variant="Outline" className="ml-2" />
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
                    <StaffListTable data={filteredStaff} />
                </DashboardPanel>
            </div>

            {/* Add Staff Modal */}
            <AddStaffModal open={isAddStaffModalOpen} onClose={() => setIsAddStaffModalOpen(false)} onSubmit={handleAddStaff} />
        </DashboardLayout>
    )
}

export default TeamManagement
