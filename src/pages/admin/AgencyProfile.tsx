import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { Button } from "@/components/ui/button"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { AgencyStatsCard } from "@/features/agencies/components/summary/AgencyStatsCard"
import { AgencyTimelinePanel } from "@/features/agencies/components/summary/AgencyTimelinePanel"
import { AgencyInformationCard } from "@/features/agencies/components/summary/AgencyInformationCard"
import { AgencyUsersTablePanel } from "@/features/agencies/components/users/AgencyUsersTablePanel"
import { AgencyCasesTablePanel } from "@/features/agencies/components/cases/AgencyCasesTablePanel"
import { SuspendAccountModal } from "@/features/agencies/components/modals/SuspendAccountModal"
import { RoleOverrideModal } from "@/features/agencies/components/modals/RoleOverrideModal"
import { AgencyProfileData, mockTimeline } from "@/data/agencyProfileData"
import { mockAgencyUsers } from "@/data/agencyUsersData"
import { mockAgencyCases } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const AgencyProfile = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<"summary" | "users" | "cases">("summary")
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

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
        address: "22 Ashfield Road, Leicester",
        email: `${agencyData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        phone: "+44 207132 4567",
        subscriptionPlan: agencyData.planTier,
        checksUsed: 318,
        checksTotal: 500,
        checksPercentage: 60,
        lastDataPull: agencyData.lastDataSync,
        dataPullStatus: agencyData.syncStatus,
        openCases: agencyData.openCases,
        recoveredCommission: "£45,317",
        overdueInvoices: 7,
        nextBillingDate: "2 Nov, 2025",
        landRegistry: "Land Registry",
        completionDate: "2 Nov, 2025",
        buyerName: "Kris Luther",
    }

    const tabs = [
        { label: "Summary", value: "summary" },
        { label: "Users", value: "users" },
        { label: "Cases", value: "cases" },
    ]

    const handleSuspend = (reason: string, description: string) => {
        console.log("Suspending agency:", { reason, description })
        toast.success("Agency account suspended successfully")
        setIsSuspendModalOpen(false)
    }

    const handleRoleUpdate = (role: string, reason: string, description: string) => {
        console.log("Updating role:", { role, reason, description, selectedUsers })
        toast.success(`Role updated for ${selectedUsers.length} user(s)`)
        setIsRoleModalOpen(false)
        setSelectedUsers([]) // Clear selection after action
    }

    const handleActionClick = (action: "edit" | "reactivate" | "suspend") => {
        if (selectedUsers.length === 0) {
            toast.error(`Please select users before you can ${action === "edit" ? "edit user" : action === "reactivate" ? "reactivate account" : "suspend account"}`)
            return
        }

        if (action === "edit") {
            setIsRoleModalOpen(true)
        } else if (action === "suspend") {
            setIsSuspendModalOpen(true)
        } else {
             toast.success("Accounts reactivated successfully")
        }
    }

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
                        onClick={() => setIsSuspendModalOpen(true)}
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
                        <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
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
                                    <DropdownMenuItem className="cursor-pointer" onSelect={() => handleActionClick("edit")}>
                                        Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer" onSelect={() => handleActionClick("reactivate")}>
                                        Reactivate Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer text-destructive"
                                        onSelect={() => handleActionClick("suspend")}
                                    >
                                        Suspend Account
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    >
                        <AgencyUsersTablePanel
                            data={mockAgencyUsers}
                            selectedUsers={selectedUsers}
                            onSelectionChange={setSelectedUsers}
                        />
                    </DashboardPanel>
                )}

                {activeTab === "cases" && (
                    <DashboardPanel
                        title="Case List"
                        description="Monitor property-related fraud cases and recovery outcomes."
                        noPadding
                        hasBorder
                    >
                        <AgencyCasesTablePanel data={mockAgencyCases} />
                    </DashboardPanel>
                )}
            </div>

            <SuspendAccountModal
                open={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onConfirm={handleSuspend}
            />
            
            <RoleOverrideModal
                open={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onConfirm={handleRoleUpdate}
            />
        </DashboardLayout>
    )
}

export default AgencyProfile
