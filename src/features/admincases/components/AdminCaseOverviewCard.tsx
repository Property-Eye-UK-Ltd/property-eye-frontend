import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
    AgencyCase,
    adminCaseStatusStyles,
    caseSeverityStyles,
    formatShareSplit,
} from "@/data/agencyCasesData"

interface AdminCaseOverviewCardProps {
    caseData: AgencyCase
}

export const AdminCaseOverviewCard = ({ caseData }: AdminCaseOverviewCardProps) => {
    const shares = formatShareSplit(caseData.recoveredAmount)

    return (
        <div className="rounded-2xl border border-border bg-white p-3 sm:p-4 lg:p-6">
            <p className="mb-3 text-xs text-muted-foreground sm:mb-4">Case Overview</p>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">Case ID</p>
                    <p className="text-sm text-primary">{caseData.caseId}</p>
                </div>
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">Property Address</p>
                    <p className="text-sm leading-relaxed text-primary break-words whitespace-normal">
                        {caseData.propertyAddress}
                    </p>
                </div>
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">Agency</p>
                    <p className="text-sm text-primary">{caseData.agencyName ?? "—"}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Withdrawal Date</p>
                        <p className="text-sm text-primary">{caseData.withdrawalDate}</p>
                    </div>
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Sale Date</p>
                        <p className="text-sm text-primary">{caseData.saleDate}</p>
                    </div>
                </div>
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">Severity</p>
                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", caseSeverityStyles[caseData.severity])}>
                        {caseData.severity}
                    </Badge>
                </div>
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">Status</p>
                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", adminCaseStatusStyles[caseData.adminStatus])}>
                        {caseData.adminStatus}
                    </Badge>
                </div>
                {caseData.determination && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Determination</p>
                        <p className="text-sm text-primary">{caseData.determination}</p>
                    </div>
                )}
                {caseData.reasonForClearing && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Reason for Clearing</p>
                        <p className="text-sm text-primary">{caseData.reasonForClearing}</p>
                        {caseData.clearingReason && (
                            <p className="mt-1 text-xs text-muted-foreground">{caseData.clearingReason}</p>
                        )}
                    </div>
                )}
                {caseData.recoveryOutcome && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Recovery Outcome</p>
                        <p className="text-sm text-primary">{caseData.recoveryOutcome}</p>
                    </div>
                )}
                {caseData.recoveredAmount && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Recovered Amount</p>
                        <p className="text-sm text-primary">{caseData.recoveredAmount}</p>
                    </div>
                )}
                {shares && (
                    <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Agency Share (50%)</p>
                            <p className="text-sm font-medium text-primary">{shares.agency}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs text-muted-foreground">Property Eye Share (50%)</p>
                            <p className="text-sm font-medium text-primary">{shares.propertyEye}</p>
                        </div>
                    </div>
                )}
                {caseData.agencyDispute && caseData.agencyDispute !== "None" && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Agency Dispute</p>
                        <Badge className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                            {caseData.agencyDispute}
                        </Badge>
                        {caseData.disputeNote && (
                            <p className="mt-2 text-sm text-primary">{caseData.disputeNote}</p>
                        )}
                        {caseData.agencyDispute === "Resolved" && caseData.disputeResolutionNote && (
                            <p className="mt-1 text-xs text-muted-foreground">
                                Resolution note: {caseData.disputeResolutionNote}
                            </p>
                        )}
                    </div>
                )}
                {caseData.flagNote && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Flag Note</p>
                        <p className="text-sm text-primary">{caseData.flagNote}</p>
                    </div>
                )}
                {caseData.returnNote && (
                    <div>
                        <p className="mb-1 text-xs text-muted-foreground">Return Note</p>
                        <p className="text-sm text-primary">{caseData.returnNote}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
