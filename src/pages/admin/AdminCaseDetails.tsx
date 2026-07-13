import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PropertyPartiesPanel } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineAuditTrailPanel } from "@/features/cases/components/TimelineAuditTrailPanel"
import { AdminCaseOverviewCard } from "@/features/admincases/components/AdminCaseOverviewCard"
import { AdminCaseWorkflowPanel } from "@/features/admincases/components/AdminCaseWorkflowPanel"
import { SubmitDeterminationModal, SubmitDeterminationValues } from "@/features/admincases/components/modals/SubmitDeterminationModal"
import { ReturnCaseModal } from "@/features/admincases/components/modals/ReturnCaseModal"
import { FlagCaseModal } from "@/features/admincases/components/modals/FlagCaseModal"
import { AgencyCase, mockAgencyCases } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { mockAdminCasePropertyParties, mockAdminCaseTimeline } from "@/data/adminCaseDetailsData"
import { toast } from "sonner"

const AdminCaseDetails = () => {
    const { caseId } = useParams<{ caseId: string }>()
    const location = useLocation()

    const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""
    const initialCase = mockAgencyCases.find((c) => c.caseId === decodedCaseId)
    const [caseData, setCaseData] = useState<AgencyCase | undefined>(initialCase)
    const [isDeterminationOpen, setIsDeterminationOpen] = useState(false)
    const [isReturnOpen, setIsReturnOpen] = useState(false)
    const [isFlagOpen, setIsFlagOpen] = useState(false)

    const randomAgency = agenciesData[0]

    if (!caseData) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p>Case not found</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

    const returnPath = location.state?.returnPath || "/admin/cases"
    const returnLabel = location.state?.returnLabel || "Case Management"

    const handleSubmitDetermination = (values: SubmitDeterminationValues) => {
        setCaseData({
            ...caseData,
            adminStatus: "Pending Approval",
            determination: values.determination,
            recoveryOutcome: values.recoveryOutcome,
            recoveredAmount: values.recoveredAmount,
            clearingReason: values.clearingReason,
            returnNote: undefined,
        })
        setIsDeterminationOpen(false)
        toast.success("Determination submitted for admin approval")
    }

    const handleApproveClose = () => {
        setCaseData({ ...caseData, adminStatus: "Closed" })
        toast.success("Case approved and closed")
    }

    const handleReturn = (note: string) => {
        setCaseData({
            ...caseData,
            adminStatus: "Under Legal Review",
            returnNote: note,
        })
        setIsReturnOpen(false)
        toast.success("Case returned to legal review")
    }

    const handleFlag = (note: string) => {
        setCaseData({
            ...caseData,
            adminStatus: "Flagged",
            flagNote: note,
        })
        setIsFlagOpen(false)
        toast.success("Case flagged")
    }

    const handleReopen = () => {
        setCaseData({
            ...caseData,
            adminStatus: "Open",
            determination: undefined,
            recoveryOutcome: undefined,
            recoveredAmount: undefined,
            clearingReason: undefined,
            flagNote: undefined,
            returnNote: undefined,
        })
        toast.success("Case reopened")
    }

    const handleMoveToLegalReview = () => {
        setCaseData({ ...caseData, adminStatus: "Under Legal Review" })
        toast.success("Case moved to legal review")
    }

    const handleResolveDispute = () => {
        setCaseData({ ...caseData, agencyDispute: "Resolved" })
        toast.success("Agency dispute resolved")
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Case Details"
                breadcrumbs={[{ label: returnLabel, href: returnPath }, { label: decodedCaseId }]}
                actions={null}
            />

            <DashboardPageContent>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
                    <div className="space-y-3 lg:col-span-2 lg:space-y-4">
                        <PropertyPartiesPanel data={{ ...mockAdminCasePropertyParties, agency: randomAgency.name }} />
                        <TimelineAuditTrailPanel data={mockAdminCaseTimeline} />
                    </div>

                    <div className="space-y-3 lg:col-span-1 lg:sticky lg:top-28 lg:self-start lg:space-y-4">
                        <AdminCaseOverviewCard caseData={caseData} />
                        <AdminCaseWorkflowPanel
                            caseData={caseData}
                            onSubmitDetermination={() => setIsDeterminationOpen(true)}
                            onApproveClose={handleApproveClose}
                            onReturnCase={() => setIsReturnOpen(true)}
                            onFlagCase={() => setIsFlagOpen(true)}
                            onReopen={handleReopen}
                            onMoveToLegalReview={handleMoveToLegalReview}
                            onResolveDispute={handleResolveDispute}
                        />
                    </div>
                </div>
            </DashboardPageContent>

            <SubmitDeterminationModal
                open={isDeterminationOpen}
                onClose={() => setIsDeterminationOpen(false)}
                onSubmit={handleSubmitDetermination}
            />
            <ReturnCaseModal
                open={isReturnOpen}
                onClose={() => setIsReturnOpen(false)}
                onSubmit={handleReturn}
            />
            <FlagCaseModal
                open={isFlagOpen}
                onClose={() => setIsFlagOpen(false)}
                onSubmit={handleFlag}
            />
        </DashboardLayout>
    )
}

export default AdminCaseDetails
