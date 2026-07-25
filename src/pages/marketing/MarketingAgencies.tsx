import { Link } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { MarketerAgenciesTable } from "@/features/marketing/agencies/components/MarketerAgenciesTable"
import { useMarketerAgencies } from "@/features/marketing/api/useMarketer"

const MarketingAgencies = () => {
    const { data: agencies = [], isLoading } = useMarketerAgencies()

    return (
        <DashboardLayout variant="marketer">
            <DynamicPageHeader title="My Agencies" />

            <DashboardPageContent>
                <p className="text-sm text-muted-foreground">
                    Referred an agency you don't see below?{" "}
                    <Link to="/marketing/agencies/claim" className="font-medium text-primary hover:underline">
                        Claim it
                    </Link>
                </p>

                <MarketerAgenciesTable data={agencies} isLoading={isLoading} />
            </DashboardPageContent>
        </DashboardLayout>
    )
}

export default MarketingAgencies
