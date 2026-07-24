import { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { Button } from "@/components/ui/button"
import { PropertyPartiesPanel } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineAuditTrailPanel, TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"
import { RegisterInformationPanel } from "@/components/case-detail/RegisterInformationPanel"
import { AdminCaseOverviewCard } from "@/features/admincases/components/AdminCaseOverviewCard"
import { AdminCaseWorkflowPanel } from "@/features/admincases/components/AdminCaseWorkflowPanel"
import { SubmitDeterminationModal, SubmitDeterminationValues } from "@/features/admincases/components/modals/SubmitDeterminationModal"
import { ReturnCaseModal } from "@/features/admincases/components/modals/ReturnCaseModal"
import { FlagCaseModal } from "@/features/admincases/components/modals/FlagCaseModal"
import { ResolveDisputeModal } from "@/features/admincases/components/modals/ResolveDisputeModal"
import {
    useAdminCaseDetail,
    useAdminCaseDisputes,
    useAdminCasePropertyParties,
    useAdminCaseTimeline,
    useApproveAndCloseCase,
    useFlagCase,
    useReopenCase,
    useResolveAgencyDispute,
    useReturnCase,
    useStartCaseReview,
    useSubmitCaseDetermination,
} from "@/features/admincases/api/useAdminCases"
import { toast } from "sonner"

const AdminCaseDetails = () => {
    const { caseId } = useParams<{ caseId: string }>()
    const location = useLocation()
    const navigate = useNavigate()

    const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""

    const { data: caseData, isLoading } = useAdminCaseDetail(decodedCaseId)
    const { data: propertyParties } = useAdminCasePropertyParties(decodedCaseId)
    const { data: timeline } = useAdminCaseTimeline(decodedCaseId)
    const { data: disputes } = useAdminCaseDisputes({ fraud_match_id: decodedCaseId })
    const openDispute = disputes?.find((d) => d.status === "open")

    const startReview = useStartCaseReview(decodedCaseId)
    const submitDetermination = useSubmitCaseDetermination(decodedCaseId)
    const approveClose = useApproveAndCloseCase(decodedCaseId)
    const returnMutation = useReturnCase(decodedCaseId)
    const flagMutation = useFlagCase(decodedCaseId)
    const reopenMutation = useReopenCase(decodedCaseId)
    const resolveDisputeMutation = useResolveAgencyDispute(decodedCaseId)

    const [isDeterminationOpen, setIsDeterminationOpen] = useState(false)
    const [isReturnOpen, setIsReturnOpen] = useState(false)
    const [isFlagOpen, setIsFlagOpen] = useState(false)
    const [isResolveDisputeOpen, setIsResolveDisputeOpen] = useState(false)

    if (isLoading) {
        return (
            <DashboardLayout variant="super-admin">
                <DashboardPageContent>
                    <p className="text-sm text-muted-foreground">Loading case…</p>
                </DashboardPageContent>
            </DashboardLayout>
        )
    }

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

    const timelineRecords: TimelineRecord[] = (timeline ?? []).map((t) => ({
        timestamp: new Date(t.timestamp).toLocaleString("en-GB"),
        event: t.event_description,
        actor: t.actor_name,
    }))

    const handleSubmitDetermination = (values: SubmitDeterminationValues) => {
        submitDetermination.mutate(values, {
            onSuccess: () => {
                setIsDeterminationOpen(false)
                toast.success("Determination submitted for admin approval")
            },
            onError: () => toast.error("Failed to submit determination"),
        })
    }

    const handleApproveClose = () => {
        approveClose.mutate(undefined, {
            onSuccess: () => toast.success("Case approved and closed"),
            onError: () => toast.error("Failed to approve case"),
        })
    }

    const handleReturn = (note: string) => {
        returnMutation.mutate(note, {
            onSuccess: () => {
                setIsReturnOpen(false)
                toast.success("Case returned to legal review")
            },
            onError: () => toast.error("Failed to return case"),
        })
    }

    const handleFlag = (note: string) => {
        flagMutation.mutate(note, {
            onSuccess: () => {
                setIsFlagOpen(false)
                toast.success("Case flagged")
            },
            onError: () => toast.error("Failed to flag case"),
        })
    }

    const handleReopen = () => {
        reopenMutation.mutate(undefined, {
            onSuccess: () => toast.success("Case reopened"),
            onError: () => toast.error("Failed to reopen case"),
        })
    }

    const handleMoveToLegalReview = () => {
        startReview.mutate(undefined, {
            onSuccess: () => toast.success("Case moved to legal review"),
            onError: () => toast.error("Failed to move case to legal review"),
        })
    }

    const handleResolveDispute = (note?: string) => {
        if (!openDispute) return
        resolveDisputeMutation.mutate(
            { disputeId: openDispute.id, resolutionNotes: note || "Resolved by admin" },
            {
                onSuccess: () => {
                    setIsResolveDisputeOpen(false)
                    toast.success("Agency dispute resolved")
                },
                onError: () => toast.error("Failed to resolve dispute"),
            }
        )
    }

    return (
        <DashboardLayout variant="super-admin">
            <DynamicPageHeader
                title="Case Details"
                breadcrumbs={[{ label: returnLabel, href: returnPath }, { label: decodedCaseId }]}
                actions={
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/admin/case-scans")}
                        className="text-xs"
                    >
                        View Previous Scans
                    </Button>
                }
            />

            <DashboardPageContent>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
                    <div className="space-y-3 lg:col-span-2 lg:space-y-4">
                        {propertyParties && <PropertyPartiesPanel data={propertyParties} />}
                        <TimelineAuditTrailPanel data={timelineRecords} />
                        {caseData && (
                            <RegisterInformationPanel
                                verificationStatus={caseData.verification_status as "confirmed_fraud" | "not_fraud" | "error" | null}
                                registerExtractFetchedAt={caseData.register_extract_fetched_at}
                                titleNumber={caseData.title_number}
                                propertyAddress={caseData.property_address}
                                caseId={decodedCaseId}
                            />
                        )}
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
                            onResolveDispute={() => setIsResolveDisputeOpen(true)}
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
            <ResolveDisputeModal
                open={isResolveDisputeOpen}
                onClose={() => setIsResolveDisputeOpen(false)}
                onSubmit={handleResolveDispute}
            />
        </DashboardLayout>
    )
}

export default AdminCaseDetails
