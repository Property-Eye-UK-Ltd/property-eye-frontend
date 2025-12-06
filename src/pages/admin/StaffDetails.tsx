import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom"
import { ActivityLogPanel } from "@/features/adminteam/components/ActivityLogPanel"
import { StaffInformationCard } from "@/features/adminteam/components/StaffInformationCard"
import { SuspendStaffModal } from "@/features/adminteam/components/modals/SuspendStaffModal"
import { EditRoleModal } from "@/features/adminteam/components/modals/EditRoleModal"
import { mockActivityLog, mockStaffDetails } from "@/data/staffDetailsData"
import { mockStaffMembers } from "@/data/teamManagementData"

const StaffDetails = () => {
    const { staffId } = useParams<{ staffId: string }>()
    const navigate = useNavigate()
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)

    // Find the staff data
    const staff = mockStaffMembers.find((s) => s.id === staffId) || mockStaffDetails[staffId || ""]

    if (!staff) {
        return (
            <DashboardLayout variant="super-admin">
                <div className="mx-auto w-full max-w-7xl px-6 py-6">
                    <p>Staff not found</p>
                </div>
            </DashboardLayout>
        )
    }

    const handleSuspendStaff = (reason: string, description: string) => {
        console.log("Suspending staff:", staffId, { reason, description })
        // In real app, would call API to suspend staff
        setIsSuspendModalOpen(false)
    }

    const handleEditRole = (name: string, email: string, role: string) => {
        console.log("Editing staff:", staffId, { name, email, role })
        // In real app, would call API to update staff
        setIsEditRoleModalOpen(false)
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Staff Details"
                breadcrumbs={[{ label: "Team Management", href: "/admin/team" }, { label: staff.name || "Staff Details" }]}
                actions={
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsSuspendModalOpen(true)}
                            className="rounded-full bg-red-50 text-red-600 hover:bg-red-100 border-0"
                        >
                            Suspend Staff
                        </Button>
                        <Button onClick={() => setIsEditRoleModalOpen(true)} className="rounded-full bg-primary font-normal text-white">
                            Edit Role
                        </Button>
                    </div>
                }
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Activity Log */}
                    <div className="lg:col-span-2">
                        <ActivityLogPanel data={mockActivityLog} />
                    </div>

                    {/* Right Column - Staff Information (Sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
                        <StaffInformationCard staff={staff} />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <SuspendStaffModal
                open={isSuspendModalOpen}
                onClose={() => setIsSuspendModalOpen(false)}
                onConfirm={handleSuspendStaff}
                staffName={staff.name}
            />
            <EditRoleModal
                open={isEditRoleModalOpen}
                onClose={() => setIsEditRoleModalOpen(false)}
                onConfirm={handleEditRole}
                staffData={{
                    name: staff.name || "",
                    email: staff.email || "",
                    role: staff.role || "",
                }}
            />
        </DashboardLayout>
    )
}

export default StaffDetails
