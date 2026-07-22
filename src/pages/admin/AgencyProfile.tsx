import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs"
import { Button } from "@/components/ui/button"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { AgencyStatsCard } from "@/features/agencies/components/summary/AgencyStatsCard"
import { AgencyInformationCard } from "@/features/agencies/components/summary/AgencyInformationCard"
import { AgencyUsersTablePanel } from "@/features/agencies/components/users/AgencyUsersTablePanel"
import { AgencyCasesTablePanel } from "@/features/agencies/components/cases/AgencyCasesTablePanel"
import { AgencyListingsTablePanel } from "@/features/agencies/components/listings/AgencyListingsTablePanel"
import { RoleOverrideModal } from "@/features/agencies/components/modals/RoleOverrideModal"
import { AgencyProfileData } from "@/data/agencyProfileData"
import { mockAgencyUsers } from "@/data/agencyUsersData"
import { mockAgencyCases } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { ArrowDown2 } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { getAdminAgencyListings } from "@/features/properties/api/propertiesService"
import { PropertyListing } from "@/types/properties.types"


const AgencyProfile = () => {
    const { agencyId } = useParams<{ agencyId: string }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<"summary" | "users" | "cases" | "listings">("summary")
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    // Property listings state
    const [listings, setListings] = useState<PropertyListing[]>([])
    const [listingsLoading, setListingsLoading] = useState(false)
    const [listingsPage, setListingsPage] = useState(1)
    const [listingsTotalPages, setListingsTotalPages] = useState(1)


    // Find the agency data
    const agencyData = agenciesData.find((a) => a.id === agencyId)

    if (!agencyData) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Agency not found</p>
                </DashboardPageContent>
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
        integrationType: agencyData.integrationType,
        integrationStatus: agencyData.syncHealth === "Healthy" ? "Active" : "Inactive",
        openCases: agencyData.fraudDetected,
        recoveredCommission: "£45,317",
        nextBillingDate: "2 Nov, 2025",
    }

    const tabs = [
        { label: "Summary", value: "summary" },
        { label: "Users", value: "users" },
        { label: "Cases", value: "cases" },
        { label: "Listings", value: "listings" },
    ]

    useEffect(() => {
        if (activeTab === "listings" && agencyId) {
            setListingsLoading(true)
            getAdminAgencyListings(agencyId, listingsPage, 10)
                .then((res) => {
                    setListings(res.items)
                    setListingsTotalPages(Math.ceil(res.total / 10) || 1)
                })
                .catch((err) => {
                    console.error("Error loading agency listings:", err)
                    toast.error("Failed to load property listings")
                })
                .finally(() => {
                    setListingsLoading(false)
                })
        }
    }, [activeTab, agencyId, listingsPage])



    const handleRoleUpdate = (role: string, reason: string, description: string) => {
        console.log("Updating role:", { role, reason, description, selectedUsers })
        toast.success(`Role updated for ${selectedUsers.length} user(s)`)
        setIsRoleModalOpen(false)
        setSelectedUsers([]) // Clear selection after action
    }

    const handleActionClick = (action: "edit" | "reactivate") => {
        if (selectedUsers.length === 0) {
            toast.error(`Please select users before you can ${action === "edit" ? "edit user" : "reactivate account"}`)
            return
        }

        if (action === "edit") {
            setIsRoleModalOpen(true)
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
            />

            <DashboardPageContent className="space-y-3 lg:space-y-4">
                <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                    <CaseTypeTabs
                        tabs={tabs}
                        selected={activeTab}
                        onSelect={(value) => setActiveTab(value as "summary" | "users" | "cases" | "listings")}
                    />
                </div>

                <div>
                {activeTab === "summary" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Stats */}
                        <div className="space-y-6 lg:col-span-2">
                            <AgencyStatsCard data={agencyProfile} />
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

                {activeTab === "listings" && (
                    <DashboardPanel
                        title="Property Listings"
                        description="Track properties registered under this agency."
                        noPadding
                        hasBorder
                    >
                        <AgencyListingsTablePanel
                            data={listings}
                            currentPage={listingsPage}
                            totalPages={listingsTotalPages}
                            onPageChange={setListingsPage}
                            isLoading={listingsLoading}
                        />
                    </DashboardPanel>
                )}
                </div>
            </DashboardPageContent>

            
            <RoleOverrideModal
                open={isRoleModalOpen}
                onClose={() => setIsRoleModalOpen(false)}
                onConfirm={handleRoleUpdate}
            />
        </DashboardLayout>
    )
}

export default AgencyProfile
