import { useParams, useNavigate, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PropertyPartiesPanel } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineAuditTrailPanel } from "@/features/cases/components/TimelineAuditTrailPanel"
import { CaseOverviewCard, ExtendedCaseData } from "@/features/cases/components/CaseOverviewCard"
import { mockAgencyCases, caseSeverityStyles } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { mockAdminCasePropertyParties, mockAdminCaseTimeline } from "@/data/adminCaseDetailsData"

const AdminCaseDetails = () => {
    const { caseId } = useParams<{ caseId: string }>()
    const navigate = useNavigate()

    // Decode caseId from URL (handles # character)
    const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""

    // Find the case data
    const caseData = mockAgencyCases.find((c) => c.caseId === decodedCaseId)
    const randomAgency = agenciesData[0] // In real app, would match agency to case

    if (!caseData) {
        return (
            <DashboardLayout variant="super-admin">
                <div className="mx-auto w-full max-w-7xl px-6 py-6">
                    <p>Case not found</p>
                </div>
            </DashboardLayout>
        )
    }

    // Map case data to extended format
    const extendedCaseData: ExtendedCaseData = {
        caseId: caseData.caseId,
        propertyAddress: caseData.propertyAddress,
        score: 92, // Placeholder
        severity: "Critical", // Placeholder
        dateDetected: "3 Nov, 2025", // Placeholder
        status: caseData.status,
    }

    const location = useLocation()
    const returnPath = location.state?.returnPath || "/admin/cases"
    const returnLabel = location.state?.returnLabel || "Case Management"

    return (
        <DashboardLayout variant="super-admin">
            {/* Page Header */}
            <DynamicPageHeader
                title="Case Details"
                breadcrumbs={[{ label: returnLabel, href: returnPath }, { label: decodedCaseId }]}
                actions={null} // Removed CLOSE CASE and TRIGGER CASE buttons
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Property & Parties, Timeline */}
                    <div className="space-y-6 lg:col-span-2">
                        <PropertyPartiesPanel data={{ ...mockAdminCasePropertyParties, agency: randomAgency.name }} />
                        {/* Evidence Overview Table Deleted as requested */}
                        <TimelineAuditTrailPanel data={mockAdminCaseTimeline} />
                    </div>

                    {/* Right Column - Case Overview (Sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
                        <CaseOverviewCard
                            caseData={extendedCaseData}
                            severityStyles={caseSeverityStyles}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminCaseDetails
