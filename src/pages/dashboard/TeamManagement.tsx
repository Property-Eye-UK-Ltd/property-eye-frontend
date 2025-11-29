import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfileAdd } from "iconsax-react"
import { TeamMetrics } from "@/features/team/components/TeamMetrics"
import { UserListPanel } from "@/features/team/components/UserListPanel"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { AddUserModal, AddUserFormValues } from "@/features/team/components/modals/AddUserModal"
import { EditUserFormValues } from "@/features/team/components/modals/EditUserModal"
import { DisableUserFormValues } from "@/features/team/components/modals/DisableUserModal"
import { toast } from "@/hooks/use-toast"

const TeamManagement = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddUser = async (values: AddUserFormValues) => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Adding user:", values)
        setIsSubmitting(false)
        setIsAddUserModalOpen(false)

        // Show success toast
        toast({
            title: "User invited successfully",
            description: `An invitation has been sent to ${values.email}`,
        })
    }

    const handleEditUser = async (userId: string, values: EditUserFormValues) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Editing user:", userId, values)

        // Show success toast
        toast({
            title: "User updated successfully",
            description: `Changes to ${values.name} have been saved`,
        })
    }

    const handleDisableUser = async (userId: string, values: DisableUserFormValues) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Disabling user:", userId, values)

        // Show success toast
        toast({
            title: "User disabled successfully",
            description: `The user has been disabled`,
        })
    }

    return (
        <DashboardLayout>
            <PageHeader
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
                <UserListPanel
                    onEditUser={handleEditUser}
                    onDisableUser={handleDisableUser}
                />
            </div>

            {/* Add User Modal */}
            <AddUserModal
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSubmit={handleAddUser}
                isSubmitting={isSubmitting}
            />
        </DashboardLayout>
    )
}

export default TeamManagement
