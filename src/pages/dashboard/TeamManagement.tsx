import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfileAdd } from "iconsax-react"
import { TeamMetrics } from "@/features/team/components/TeamMetrics"
import { UserListPanel } from "@/features/team/components/UserListPanel"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { AddUserModal, AddUserFormValues } from "@/features/team/components/modals/AddUserModal"
import { EditUserModal, EditUserFormValues } from "@/features/team/components/modals/EditUserModal"
import { DisableUserModal, DisableUserFormValues } from "@/features/team/components/modals/DisableUserModal"
import { User, toRoleValue } from "@/features/team/api/teamService"
import { useInviteTeamUser, useRemoveTeamUser, useUpdateTeamUser } from "@/features/team/api/useTeam"
import { toast } from "sonner"

const TeamManagement = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const inviteMutation = useInviteTeamUser()
    const updateMutation = useUpdateTeamUser()
    const removeMutation = useRemoveTeamUser()

    const handleAddUser = async (values: AddUserFormValues) => {
        try {
            await inviteMutation.mutateAsync({
                name: values.name,
                email: values.email,
                role: toRoleValue(values.role),
            })
            setIsAddUserModalOpen(false)
            toast.success("User invited successfully", {
                description: `An invitation has been sent to ${values.email}`,
            })
        } catch (error) {
            console.error("Failed to invite user:", error)
            toast.error("Failed to invite user. Please try again.")
        }
    }

    const handleEditClick = (user: User) => {
        setSelectedUser(user)
        setIsEditModalOpen(true)
    }

    const handleEditUser = async (values: EditUserFormValues) => {
        if (!selectedUser) return
        try {
            await updateMutation.mutateAsync({
                userId: selectedUser.id,
                req: { name: values.name, role: toRoleValue(values.role) },
            })
            setIsEditModalOpen(false)
            toast.success("User updated successfully", {
                description: `Changes to ${values.name} have been saved`,
            })
        } catch (error) {
            console.error("Failed to update user:", error)
            toast.error("Failed to update user. Please try again.")
        }
    }

    const handleDisableClick = () => {
        setIsEditModalOpen(false)
        setIsDisableModalOpen(true)
    }

    const handleDisableUser = async (_values: DisableUserFormValues) => {
        if (!selectedUser) return
        try {
            await removeMutation.mutateAsync(selectedUser.id)
            setIsDisableModalOpen(false)
            toast.success("User disabled successfully", {
                description: "The user has been disabled",
            })
        } catch (error) {
            console.error("Failed to disable user:", error)
            toast.error("Failed to disable user. Please try again.")
        }
    }

    return (
        <DashboardLayout>
            <DynamicPageHeader
                title="Team Management"
                actions={
                    <Button
                        className="h-9 gap-2 rounded-full bg-[#00072C] px-4 text-sm hover:bg-[#00072C]/90 lg:h-10"
                        onClick={() => setIsAddUserModalOpen(true)}
                    >
                        <ProfileAdd size={18} variant="Outline" />
                        Add a User
                    </Button>
                }
            />
            <DashboardPageContent>
                <TeamMetrics />
                <UserListPanel onEditClick={handleEditClick} />
            </DashboardPageContent>

            <AddUserModal
                open={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSubmit={handleAddUser}
                isSubmitting={inviteMutation.isPending}
            />

            <EditUserModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditUser}
                onDisable={handleDisableClick}
                user={selectedUser}
                isSubmitting={updateMutation.isPending}
            />

            <DisableUserModal
                open={isDisableModalOpen}
                onClose={() => setIsDisableModalOpen(false)}
                onSubmit={handleDisableUser}
                user={selectedUser}
                isSubmitting={removeMutation.isPending}
            />
        </DashboardLayout>
    )
}

export default TeamManagement
