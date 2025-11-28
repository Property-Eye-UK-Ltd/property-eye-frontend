import { Button } from "@/components/ui/button"
import { ProfileAdd } from "iconsax-react"
import { TeamMetrics } from "@/features/team/components/TeamMetrics"
import { UserListPanel } from "@/features/team/components/UserListPanel"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

const TeamManagement = () => {
    return (
        <DashboardLayout
            title="Team Management"
            action={
                <Button className="gap-2 rounded-full bg-[#00072C] hover:bg-[#00072C]/90">
                    <ProfileAdd size={18} variant="Outline" />
                    Add a User
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Metrics */}
                <TeamMetrics />

                {/* User List */}
                <UserListPanel />
            </div>
        </DashboardLayout>
    )
}

export default TeamManagement
