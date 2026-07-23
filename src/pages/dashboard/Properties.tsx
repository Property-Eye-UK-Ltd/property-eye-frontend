import { useEffect, useState } from "react"
import { DocumentUpload, ProfileAdd } from "iconsax-react"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { Button } from "@/components/ui/button"
import { PropertyListPanel } from "@/features/properties/components/PropertyListPanel"
import { EmptyPropertiesState } from "@/features/properties/components/EmptyPropertiesState"
import { AddPropertyModal } from "@/features/properties/components/modals/AddPropertyModal"
import { EditPropertyModal } from "@/features/properties/components/modals/EditPropertyModal"
import { DeletePropertyConfirmModal } from "@/features/properties/components/modals/DeletePropertyConfirmModal"
import { BulkUploadModal } from "@/features/properties/components/modals/BulkUploadModal"
import { PropertyListing, PropertyListingInput } from "@/types/properties.types"
import * as propertiesService from "@/features/properties/api/propertiesService"

const PAGE_SIZE = 10

const Properties = () => {
    const [listings, setListings] = useState<PropertyListing[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const refreshListings = async () => {
        setIsLoading(true)
        try {
            const data = await propertiesService.listListings(page, PAGE_SIZE, searchQuery)
            setListings(data.items)
            setTotal(data.total)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refreshListings()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchQuery])

    useEffect(() => {
        setPage(1)
    }, [searchQuery])

    const handleAddProperty = async (values: PropertyListingInput) => {
        setIsSubmitting(true)
        try {
            await propertiesService.ingestManualRecord(values)
            await refreshListings()
            setIsSubmitting(false)
            setIsAddModalOpen(false)
            toast.success("Property added", { description: values.address })
        } catch (error) {
            setIsSubmitting(false)
            const detail = (error as { detail?: string })?.detail ?? "Failed to add property"
            toast.error("Couldn't add property", { description: detail })
        }
    }

    const handleEditClick = (listing: PropertyListing) => {
        setSelectedListing(listing)
        setIsEditModalOpen(true)
    }

    const handleEditProperty = async (values: PropertyListingInput) => {
        if (!selectedListing) return
        setIsSubmitting(true)
        try {
            await propertiesService.updateListing(selectedListing.id, values)
            await refreshListings()
            setIsSubmitting(false)
            setIsEditModalOpen(false)
            toast.success("Property updated", { description: values.address })
        } catch (error) {
            setIsSubmitting(false)
            const detail = (error as { detail?: string })?.detail ?? "Failed to update property"
            toast.error("Couldn't update property", { description: detail })
        }
    }

    const handleDeleteClick = (listing: PropertyListing) => {
        setSelectedListing(listing)
        setIsDeleteConfirmOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedListing) return
        setIsSubmitting(true)
        try {
            await propertiesService.deleteListing(selectedListing.id)
            await refreshListings()
            setIsSubmitting(false)
            setIsDeleteConfirmOpen(false)
            toast.success("Property deleted", { description: selectedListing.address })
        } catch (error) {
            setIsSubmitting(false)
            const detail = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
            toast.error("Couldn't delete property", { description: detail ?? "Please try again." })
        }
    }

    const hasListings = total > 0 || searchQuery.trim().length > 0

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Properties"
                actions={[
                    <Button
                        key="upload"
                        variant="outline"
                        className="h-9 gap-2 rounded-full px-4 text-sm lg:h-10"
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        <DocumentUpload size={18} variant="Outline" />
                        Bulk Upload
                    </Button>,
                    <Button
                        key="add"
                        className="h-9 gap-2 rounded-full bg-[#00072C] px-4 text-sm hover:bg-[#00072C]/90 lg:h-10"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <ProfileAdd size={18} variant="Outline" />
                        Add Property
                    </Button>,
                ]}
            />
            <DashboardPageContent>
                {!isLoading && !hasListings ? (
                    <EmptyPropertiesState onAddProperty={() => setIsAddModalOpen(true)} />
                ) : (
                    <PropertyListPanel
                        data={listings}
                        total={total}
                        page={page}
                        pageSize={PAGE_SIZE}
                        onPageChange={setPage}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        isLoading={isLoading}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )}
            </DashboardPageContent>

            <AddPropertyModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddProperty}
                isSubmitting={isSubmitting}
            />

            <EditPropertyModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditProperty}
                listing={selectedListing}
                isSubmitting={isSubmitting}
            />

            <DeletePropertyConfirmModal
                open={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                listing={selectedListing}
                isSubmitting={isSubmitting}
            />

            <BulkUploadModal
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={propertiesService.uploadDocument}
                onUploaded={refreshListings}
            />
        </DashboardLayout>
    )
}

export default Properties
