import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { useParams, useNavigate } from "react-router-dom"
import { ActivityLogPanel } from "@/features/adminteam/components/ActivityLogPanel"
import { StaffInformationCard } from "@/features/adminteam/components/StaffInformationCard"
import { SuspendStaffModal } from "@/features/adminteam/components/modals/SuspendStaffModal"
import { EditRoleModal } from "@/features/adminteam/components/modals/EditRoleModal"
import { mockActivityLog } from "@/data/staffDetailsData"
import { toAdminRoleLabel, toAdminRoleValue } from "@/features/adminteam/api/adminTeamService"
import { useAdminTeamUsers, useUpdateAdminTeamUser } from "@/features/adminteam/api/useAdminTeam"
import { toast } from "sonner"

const StaffDetails = () => {
    const { staffId } = useParams<{ staffId: string }>()
    const navigate = useNavigate()
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)

    const { data: staffList = [], isLoading } = useAdminTeamUsers()
    const updateMutation = useUpdateAdminTeamUser()

    const staffUser = staffList.find((s) => s.id === staffId)
    const staff = staffUser
        ? {
              id: staffUser.id,
              name: staffUser.name,
              email: staffUser.email,
              role: toAdminRoleLabel(staffUser.role),
              lastActiveDate: staffUser.lastActive ?? "Never",
              status: staffUser.status,
          }
        : undefined

    if (isLoading) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Loading...</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    if (!staff) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Staff not found</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const handleSuspendStaff = async (_reason: string, _description: string) => {
        if (!staffId) return
        try {
            await updateMutation.mutateAsync({ userId: staffId, req: { status: "disabled" } })
            toast.success("Staff suspended successfully")
            setIsSuspendModalOpen(false)
        } catch (error) {
            console.error("Failed to suspend staff:", error)
            toast.error("Failed to suspend staff. Please try again.")
        }
    }

    const handleEditRole = async (name: string, _email: string, role: string) => {
        if (!staffId) return
        try {
            await updateMutation.mutateAsync({
                userId: staffId,
                req: { name, role: toAdminRoleValue(role) },
            })
            toast.success("Staff updated successfully")
            setIsEditRoleModalOpen(false)
        } catch (error) {
            console.error("Failed to update staff:", error)
            toast.error("Failed to update staff. Please try again.")
        }
    }

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Staff Details"
                breadcrumbs={[{ label: "Team Management", href: "/admin/team" }, { label: staff.name || "Staff Details" }]}
                actions={
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={() => setIsSuspendModalOpen(true)}
                            className="h-9 flex-1 rounded-full border-0 bg-red-50 px-3 text-xs text-red-600 hover:bg-red-100 sm:flex-none sm:px-4 sm:text-sm"
                        >
                            Suspend Staff
                        </Button>
                        <Button
                            onClick={() => setIsEditRoleModalOpen(true)}
                            className="h-9 flex-1 rounded-full bg-primary px-3 text-xs font-normal text-white sm:flex-none sm:px-4 sm:text-sm"
                        >
                            Edit Role
                        </Button>
                    </div>
                }
            />

            {/* Page Content */}
            <DashboardPageContent>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
                    {/* Left Column - Activity Log */}
                    <div className="lg:col-span-2">
                        <ActivityLogPanel data={mockActivityLog} />
                    </div>

                    {/* Right Column - Staff Information (Sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
                        <StaffInformationCard staff={staff} />
                    </div>
                </div>
            </DashboardPageContent>

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
