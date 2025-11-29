import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfileAdd } from "iconsax-react"
import { TeamMetrics } from "@/features/team/components/TeamMetrics"
import { UserListPanel } from "@/features/team/components/UserListPanel"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { AddUserModal, AddUserFormValues } from "@/features/team/components/modals/AddUserModal"
import { EditUserModal, EditUserFormValues } from "@/features/team/components/modals/EditUserModal"
import { DisableUserModal, DisableUserFormValues } from "@/features/team/components/modals/DisableUserModal"
import { User } from "@/data/team-data"
import { toast } from "sonner"

const TeamManagement = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddUser = async (values: AddUserFormValues) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Adding user:", values)
        setIsSubmitting(false)
        setIsAddUserModalOpen(false)

        // Show success toast
        toast.success("User invited successfully", {
            description: `An invitation has been sent to ${values.email}`,
        })
    }

    const handleEditClick = (user: User) => {
        setSelectedUser(user)
        setIsEditModalOpen(true)
    }

    const handleEditUser = async (values: EditUserFormValues) => {
        if (!selectedUser) return
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Editing user:", selectedUser.id, values)
        setIsSubmitting(false)
        setIsEditModalOpen(false)

        // Show success toast
        toast.success("User updated successfully", {
            description: `Changes to ${values.name} have been saved`,
        })
    }

    const handleDisableClick = () => {
        setIsEditModalOpen(false)
        setIsDisableModalOpen(true)
    }

    const handleDisableUser = async (values: DisableUserFormValues) => {
        if (!selectedUser) return
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Disabling user:", selectedUser.id, values)
        setIsSubmitting(false)
        setIsDisableModalOpen(false)

        // Show success toast
        toast.success("User disabled successfully", {
            description: "The user has been disabled",
        })
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Team Management"
                actions={
                    <Button
                        className="gap-2 rounded-full bg-[#00072C] hover:bg-[#00072C]/90"
                        onClick={() => setIsAddUserModalOpen(true)}
                    >
                        <ProfileAdd size={18} variant="Outline" />
                        Add a User
                    </Button>
                }
            />
            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                {/* Metrics */}
                <TeamMetrics />

                {/* User List */}
                <UserListPanel onEditClick={handleEditClick} />
            </div>

            {/* Add User Modal */}
            <AddUserModal
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSubmit={handleAddUser}
                isSubmitting={isSubmitting}
            />

            {/* Edit User Modal */}
            <EditUserModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditUser}
                onDisable={handleDisableClick}
                user={selectedUser}
                isSubmitting={isSubmitting}
            />

            {/* Disable User Modal */}
            <DisableUserModal
                open={isDisableModalOpen}
                onClose={() => setIsDisableModalOpen(false)}
                onSubmit={handleDisableUser}
                user={selectedUser}
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default TeamManagement
