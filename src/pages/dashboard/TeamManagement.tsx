import { Button } from "@/components/ui/button"
import { ProfileAdd } from "iconsax-react"
import { TeamMetrics } from "@/features/team/components/TeamMetrics"
import { UserListPanel } from "@/features/team/components/UserListPanel"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { PageHeader } from "@/components/dashboard/PageHeader"

const TeamManagement = () => {
    return (
        <DashboardLayout>
            <PageHeader
                title="Team Management"
                actions={
                    <Button className="gap-2 rounded-full bg-[#00072C] hover:bg-[#00072C]/90">
                        <ProfileAdd size={18} variant="Outline" />
                        Add a User
                    </Button>
                }
            />
            <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-6">
                {/* Metrics */}
                <TeamMetrics />

                {/* User List */}
                <UserListPanel />
            </div>
        </DashboardLayout>
    )
}

export default TeamManagement
