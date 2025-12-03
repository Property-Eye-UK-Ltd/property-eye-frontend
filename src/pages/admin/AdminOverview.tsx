import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

const AdminOverview = () => {
    return (
        <DashboardLayout variant="super-admin">
            {/* <PageHeader
                title="Overview"
                description="Monitor and manage all agencies across the platform"
            /> */}
            <div className="p-6">
                <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="text-lg font-medium mb-4">Super Admin Dashboard</h2>
                    <p className="text-muted-foreground">
                        E never ready.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminOverview
