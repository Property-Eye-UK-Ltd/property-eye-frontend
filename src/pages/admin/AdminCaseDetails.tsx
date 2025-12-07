import { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { PropertyPartiesPanel } from "@/features/cases/components/PropertyPartiesPanel"
import { EvidenceOverviewPanel, EvidenceRecord } from "@/features/cases/components/EvidenceOverviewPanel"
import { TimelineAuditTrailPanel } from "@/features/cases/components/TimelineAuditTrailPanel"
import { CaseOverviewCard, ExtendedCaseData } from "@/features/cases/components/CaseOverviewCard"
import { CloseCaseModal } from "@/features/cases/components/modals/CloseCaseModal"
import { ViewEvidenceModal } from "@/features/cases/components/modals/ViewEvidenceModal"
import { UploadEvidenceModal, UploadEvidenceFormValues } from "@/features/cases/components/modals/UploadEvidenceModal"
import { EvidenceUploadSuccessModal } from "@/features/cases/components/modals/EvidenceUploadSuccessModal"
import { EvidenceUploadFailureModal } from "@/features/cases/components/modals/EvidenceUploadFailureModal"
import { mockAgencyCases, caseSeverityStyles, caseFraudTypeStyles } from "@/data/agencyCasesData"
import { agenciesData } from "@/data/agenciesData"
import { mockAdminCasePropertyParties, mockAdminCaseEvidence, mockAdminCaseTimeline } from "@/data/adminCaseDetailsData"

const AdminCaseDetails = () => {
    const { caseId } = useParams<{ caseId: string }>()
    const navigate = useNavigate()
    const [isCloseCaseModalOpen, setIsCloseCaseModalOpen] = useState(false)
    const [isViewEvidenceModalOpen, setIsViewEvidenceModalOpen] = useState(false)
    const [isUploadEvidenceModalOpen, setIsUploadEvidenceModalOpen] = useState(false)
    const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] = useState(false)
    const [isUploadFailureModalOpen, setIsUploadFailureModalOpen] = useState(false)
    const [selectedEvidence, setSelectedEvidence] = useState<EvidenceRecord | null>(null)

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

    const handleCloseCase = () => {
        console.log("Closing case:", caseId)
        setIsCloseCaseModalOpen(false)
        // In real app, would call API to close case
    }

    const handleViewEvidence = (evidence: EvidenceRecord) => {
        setSelectedEvidence(evidence)
        setIsViewEvidenceModalOpen(true)
    }

    const handleUploadEvidence = (values: UploadEvidenceFormValues) => {
        console.log("Uploading evidence:", values)
        setIsUploadEvidenceModalOpen(false)
        // Simulate upload - in real app would call API
        const success = Math.random() > 0.3
        if (success) {
            setIsUploadSuccessModalOpen(true)
        } else {
            setIsUploadFailureModalOpen(true)
        }
    }

    const handleTriggerCase = () => {
        console.log("Triggering case:", caseId)
        // In real app, would call API to trigger case
    }

    // Map case data to extended format
    const extendedCaseData: ExtendedCaseData = {
        ...caseData,
        recoveryMode: "Managed",
        status: "--",
        commissionAtRisk: "£12,790",
        evidenceStatus: "Completed",
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
                actions={
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsCloseCaseModalOpen(true)}
                            className="rounded-full border-border text-foreground hover:bg-muted"
                        >
                            Close Case
                        </Button>
                        <Button onClick={handleTriggerCase} className="rounded-full bg-primary text-white">
                            Trigger Case
                        </Button>
                    </div>
                }
            />

            {/* Page Content */}
            <div className="mx-auto w-full max-w-7xl px-6 py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Property & Parties, Evidence, Timeline */}
                    <div className="space-y-6 lg:col-span-2">
                        <PropertyPartiesPanel data={{ ...mockAdminCasePropertyParties, agency: randomAgency.name }} />
                        <EvidenceOverviewPanel
                            data={mockAdminCaseEvidence}
                            onViewEvidence={handleViewEvidence}
                            onUploadEvidence={() => setIsUploadEvidenceModalOpen(true)}
                        />
                        <TimelineAuditTrailPanel data={mockAdminCaseTimeline} />
                    </div>

                    {/* Right Column - Case Overview (Sticky) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
                        <CaseOverviewCard
                            caseData={extendedCaseData}
                            severityStyles={caseSeverityStyles}
                            fraudTypeStyles={caseFraudTypeStyles}
                        />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CloseCaseModal
                open={isCloseCaseModalOpen}
                onCancel={() => setIsCloseCaseModalOpen(false)}
                onConfirm={handleCloseCase}
            />

            <ViewEvidenceModal
                open={isViewEvidenceModalOpen}
                onClose={() => setIsViewEvidenceModalOpen(false)}
                evidence={selectedEvidence}
            />

            <UploadEvidenceModal
                open={isUploadEvidenceModalOpen}
                onClose={() => setIsUploadEvidenceModalOpen(false)}
                onSubmit={handleUploadEvidence}
            />

            <EvidenceUploadSuccessModal open={isUploadSuccessModalOpen} onDone={() => setIsUploadSuccessModalOpen(false)} />

            <EvidenceUploadFailureModal
                open={isUploadFailureModalOpen}
                onCancel={() => setIsUploadFailureModalOpen(false)}
                onRetry={() => {
                    setIsUploadFailureModalOpen(false)
                    setIsUploadEvidenceModalOpen(true)
                }}
            />
        </DashboardLayout>
    )
}

export default AdminCaseDetails
