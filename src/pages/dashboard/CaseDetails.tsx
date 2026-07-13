import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PropertyPartiesPanel, PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineAuditTrailPanel, TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CaseRecord } from "@/data/caseManagementData"
import { allCasesData } from "@/data/caseManagementData"
import { AgencyFacingCaseStatus } from "@/data/agencyCasesData"
import { ModalShell } from "@/components/modals/ModalShell"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const mockPropertyParties: PropertyPartiesData = {
  owner: "Daniel Lawson",
  agency: "Solict Homes",
  dateWithdrawn: "15 Oct, 2025",
  dateSold: "2 Nov, 2025",
  soldAmount: "£135,325",
  soldTo: "Kris Luther",
  landRegistry: {
    completionDate: "2 Nov, 2025",
    buyerName: "Kris Luther",
  },
}

const mockTimeline: TimelineRecord[] = [
  { timestamp: "2025-11-03 09:15", event: "Case opened", actor: "System" },
  { timestamp: "2025-11-03 10:30", event: "Land Registry check opened", actor: "System" },
  { timestamp: "2025-11-03 10:35", event: "Land Registry check completed", actor: "System" },
  { timestamp: "2025-11-03 10:40", event: "Classification: Under review", actor: "System" },
]

const caseStatusStyles: Record<AgencyFacingCaseStatus, string> = {
  Open: "bg-blue-50 text-blue-600 border border-blue-100",
  "Closed (Confirmed Fraud)": "bg-red-50 text-red-600 border border-red-100",
  "Closed (Not Fraud)": "bg-green-50 text-green-600 border border-green-100",
}

const isClosedCaseStatus = (status: AgencyFacingCaseStatus) =>
  status === "Closed (Confirmed Fraud)" || status === "Closed (Not Fraud)"

const AgencyCaseOverviewCard = ({ caseRecord }: { caseRecord: CaseRecord }) => (
  <div className="rounded-2xl border border-border bg-white p-3 sm:p-4 lg:sticky lg:top-4 lg:p-6">
    <p className="mb-3 text-xs text-muted-foreground sm:mb-4">Case Overview</p>
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Case ID</p>
        <p className="text-sm text-primary">{caseRecord.caseId}</p>
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Property Address</p>
        <p className="text-sm leading-relaxed text-primary break-words whitespace-normal">{caseRecord.propertyAddress}</p>
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Status</p>
        <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", caseStatusStyles[caseRecord.caseStatus])}>
          {caseRecord.caseStatus}
        </Badge>
      </div>
    </div>
  </div>
)

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const location = useLocation()
  const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""
  const normalizedId = decodedCaseId.startsWith("#") ? decodedCaseId : `#${decodedCaseId}`

  const caseRecord: CaseRecord =
    (location.state as { caseRecord?: CaseRecord })?.caseRecord ??
    allCasesData.find((c) => c.caseId === normalizedId || c.caseId.replace("#", "") === decodedCaseId.replace("#", "")) ??
    allCasesData[0]

  const [isDisputeOpen, setIsDisputeOpen] = useState(false)
  const [disputeNote, setDisputeNote] = useState("")
  const [hasRaisedDispute, setHasRaisedDispute] = useState(
    caseRecord.agencyDispute === "Open" || caseRecord.agencyDispute === "Resolved"
  )

  const isClosed = isClosedCaseStatus(caseRecord.caseStatus)
  const canRaiseDispute = isClosed && !hasRaisedDispute && caseRecord.agencyDispute !== "Open" && caseRecord.agencyDispute !== "Resolved"

  const handleRaiseDispute = () => {
    if (!disputeNote.trim()) return
    setHasRaisedDispute(true)
    setIsDisputeOpen(false)
    setDisputeNote("")
    toast.success("Dispute raised — admin will review")
  }

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Details"
        breadcrumbs={[
          { label: (location.state as { returnLabel?: string })?.returnLabel || "Case Management", href: (location.state as { returnPath?: string })?.returnPath || "/dashboard/cases" },
          { label: caseRecord.caseId },
        ]}
        actions={
          canRaiseDispute ? (
            <Button className="rounded-full" onClick={() => setIsDisputeOpen(true)}>
              Raise Dispute
            </Button>
          ) : null
        }
      />

      <DashboardPageContent>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:items-start lg:gap-4">
          <div className="space-y-3 lg:col-span-2 lg:space-y-4">
            <PropertyPartiesPanel data={mockPropertyParties} variant="agency" />
            <TimelineAuditTrailPanel data={mockTimeline} />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
            <AgencyCaseOverviewCard caseRecord={caseRecord} />
            {(hasRaisedDispute || caseRecord.agencyDispute === "Open" || caseRecord.agencyDispute === "Resolved") && (
              <p className="mt-3 text-sm text-muted-foreground">
                {caseRecord.agencyDispute === "Resolved"
                  ? "A dispute on this case has been resolved by admin."
                  : "A dispute has been raised on this closed case and is pending admin review."}
              </p>
            )}
          </div>
        </div>
      </DashboardPageContent>

      <ModalShell
        open={isDisputeOpen}
        onClose={() => setIsDisputeOpen(false)}
        contentClassName="max-w-lg rounded-2xl bg-white p-0 sm:rounded-3xl"
      >
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <h2 className="text-xl font-semibold text-foreground">Raise Dispute</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Disputes can only be raised on closed cases. Describe why you disagree with the outcome.
          </p>
          <div className="mt-4 space-y-2">
            <Label>Description</Label>
            <Textarea
              value={disputeNote}
              onChange={(e) => setDisputeNote(e.target.value)}
              placeholder="Explain your dispute..."
              className="min-h-[120px] rounded-2xl border-border"
            />
          </div>
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setIsDisputeOpen(false)}
              className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!disputeNote.trim()}
              onClick={handleRaiseDispute}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              Submit Dispute
            </button>
          </div>
        </div>
      </ModalShell>
    </DashboardLayout>
  )
}

export default CaseDetails
