import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardDetailsSkeleton } from "@/components/dashboard"
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
import { useAdminAgencyDetail, useAdminAgencyUsers } from "@/features/agencies/api/useAgencies"
import { useAdminCases } from "@/features/admincases/api/useAdminCases"
import { ArrowDown2, DocumentUpload } from "iconsax-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { getAdminAgencyListings, adminIngestManualRecord, adminUploadDocument } from "@/features/properties/api/propertiesService"
import { PropertyListing, PropertyListingInput } from "@/types/properties.types"
import { AddPropertyModal } from "@/features/properties/components/modals/AddPropertyModal"
import { BulkUploadModal } from "@/features/properties/components/modals/BulkUploadModal"


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
    const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)
    const [isAddingProperty, setIsAddingProperty] = useState(false)
    const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)

    const { data: agencyDetail, isLoading: isAgencyLoading } = useAdminAgencyDetail(agencyId)
    const { data: agencyUsers } = useAdminAgencyUsers(agencyId)
    const { data: agencyCasesResponse, isLoading: isAgencyCasesLoading } = useAdminCases(
        agencyId ? { agency_id: agencyId, page_size: 100 } : undefined
    )

    const refreshListings = () => {
        if (!agencyId) return
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

    useEffect(() => {
        if (activeTab === "listings" && agencyId) {
            refreshListings()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, agencyId, listingsPage])

    const handleAddProperty = async (values: PropertyListingInput) => {
        if (!agencyId) return
        setIsAddingProperty(true)
        try {
            await adminIngestManualRecord(agencyId, values)
            refreshListings()
            setIsAddingProperty(false)
            setIsAddPropertyModalOpen(false)
            toast.success("Property added", { description: values.address })
        } catch (error) {
            setIsAddingProperty(false)
            const detail = (error as { detail?: string })?.detail ?? "Failed to add property"
            toast.error("Couldn't add property", { description: detail })
        }
    }

    if (isAgencyLoading) {
        return (
            <DashboardLayout variant="super-admin">
                <DynamicPageHeader
                    title="Agency Profile"
                    breadcrumbs={[
                        { label: "Agencies", href: "/admin/agencies" },
                        { label: "Loading..." },
                    ]}
                />
                <DashboardPageContent>
                    <DashboardDetailsSkeleton layoutType="profile" />
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (!agencyDetail) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Agency not found</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    // Map agency detail to profile format
    const agencyProfile: AgencyProfileData = {
        id: agencyDetail.id,
        name: agencyDetail.name ?? "—",
        address: agencyDetail.address,
        email: agencyDetail.email,
        phone: agencyDetail.phone_number,
        subscriptionPlan: agencyDetail.plan_name,
        integrationType: agencyDetail.integration_type,
        openCases: agencyDetail.open_cases,
        recoveredCommission: "£45,317",
        nextBillingDate: agencyDetail.next_billing_date,
    }

    const tabs = [
        { label: "Summary", value: "summary" },
        { label: "Users", value: "users" },
        { label: "Cases", value: "cases" },
        { label: "Listings", value: "listings" },
    ]

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
                    { label: agencyProfile.name },
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
                            data={agencyUsers ?? []}
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
                        {isAgencyCasesLoading ? (
                            <p className="p-6 text-sm text-muted-foreground">Loading cases…</p>
                        ) : (
                            <AgencyCasesTablePanel data={agencyCasesResponse?.items ?? []} />
                        )}
                    </DashboardPanel>
                )}

                {activeTab === "listings" && (
                    <DashboardPanel
                        title="Property Listings"
                        description="Track properties registered under this agency."
                        noPadding
                        hasBorder
                        actions={
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsBulkUploadModalOpen(true)}
                                    className="rounded-full h-10 px-4 gap-2"
                                >
                                    <DocumentUpload size={18} variant="Outline" />
                                    Bulk Upload
                                </Button>
                                <Button
                                    onClick={() => setIsAddPropertyModalOpen(true)}
                                    className="rounded-full h-10 px-4"
                                >
                                    Add Property
                                </Button>
                            </div>
                        }
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

            <AddPropertyModal
                open={isAddPropertyModalOpen}
                onClose={() => setIsAddPropertyModalOpen(false)}
                onSubmit={handleAddProperty}
                isSubmitting={isAddingProperty}
            />

            <BulkUploadModal
                open={isBulkUploadModalOpen}
                onClose={() => setIsBulkUploadModalOpen(false)}
                onUpload={(file) => adminUploadDocument(agencyId as string, file)}
                onUploaded={refreshListings}
            />
        </DashboardLayout>
    )
}

export default AgencyProfile
