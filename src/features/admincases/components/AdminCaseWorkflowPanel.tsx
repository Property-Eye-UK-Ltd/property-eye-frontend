import { Button } from "@/components/ui/button"
import { AgencyCase } from "@/data/agencyCasesData"

interface AdminCaseWorkflowPanelProps {
    caseData: AgencyCase
    onSubmitDetermination: () => void
    onApproveClose: () => void
    onReturnCase: () => void
    onFlagCase: () => void
    onReopen: () => void
    onMoveToLegalReview: () => void
    onResolveDispute: () => void
}

export const AdminCaseWorkflowPanel = ({
    caseData,
    onSubmitDetermination,
    onApproveClose,
    onReturnCase,
    onFlagCase,
    onReopen,
    onMoveToLegalReview,
    onResolveDispute,
}: AdminCaseWorkflowPanelProps) => {
    const { adminStatus, determination, agencyDispute } = caseData
    const canSubmitDetermination =
        adminStatus === "Open" ||
        adminStatus === "Under Legal Review" ||
        adminStatus === "Flagged"
    const canApproveOrReturn = adminStatus === "Pending Approval"
    const canReopen =
        adminStatus === "Closed" && determination === "Not Fraudulent (Cleared)"
    const canFlag =
        adminStatus !== "Closed" && adminStatus !== "Pending Approval"
    const canResolveDispute = adminStatus === "Closed" && agencyDispute === "Open"

    return (
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
            <p className="mb-1 text-xs text-muted-foreground">Case Workflow</p>
            <p className="mb-4 text-sm text-muted-foreground">
                Manage status, determination, and recovery for this case.
            </p>

            <div className="flex flex-col gap-2">
                {canSubmitDetermination && (
                    <>
                        {adminStatus === "Open" && (
                            <Button
                                variant="outline"
                                className="w-full rounded-full"
                                onClick={onMoveToLegalReview}
                            >
                                Move to Legal Review
                            </Button>
                        )}
                        <Button className="w-full rounded-full" onClick={onSubmitDetermination}>
                            Submit Determination
                        </Button>
                    </>
                )}

                {canApproveOrReturn && (
                    <>
                        <Button className="w-full rounded-full" onClick={onApproveClose}>
                            Approve & Close Case
                        </Button>
                        <Button variant="outline" className="w-full rounded-full" onClick={onReturnCase}>
                            Return with Note
                        </Button>
                    </>
                )}

                {canFlag && (
                    <Button variant="outline" className="w-full rounded-full" onClick={onFlagCase}>
                        Flag Case
                    </Button>
                )}

                {canReopen && (
                    <Button variant="outline" className="w-full rounded-full" onClick={onReopen}>
                        Reopen Case
                    </Button>
                )}

                {canResolveDispute && (
                    <Button className="w-full rounded-full" onClick={onResolveDispute}>
                        Resolve Agency Dispute
                    </Button>
                )}

                {adminStatus === "Closed" && !canReopen && !canResolveDispute && (
                    <p className="text-center text-sm text-muted-foreground">
                        This case is closed. No further actions available.
                    </p>
                )}
            </div>
        </div>
    )
}
