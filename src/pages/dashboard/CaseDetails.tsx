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
import { useCaseDetail, useCaseTimeline, useRaiseDispute } from "@/features/cases/api/useCases"
import type { AgencyCaseStatus, CaseDetail } from "@/features/cases/api/casesService"
import { RaiseDisputeModal } from "@/features/cases/components/modals/RaiseDisputeModal"
import { toast } from "sonner"

const caseStatusLabels: Record<AgencyCaseStatus, string> = {
  open: "Open",
  closed_confirmed_fraud: "Closed (Confirmed Fraud)",
  closed_not_fraudulent: "Closed (Not Fraud)",
}

const caseStatusStyles: Record<AgencyCaseStatus, string> = {
  open: "bg-blue-50 text-blue-600 border border-blue-100",
  closed_confirmed_fraud: "bg-red-50 text-red-600 border border-red-100",
  closed_not_fraudulent: "bg-green-50 text-green-600 border border-green-100",
}

const AgencyCaseOverviewCard = ({ caseDetail }: { caseDetail: CaseDetail }) => (
  <div className="rounded-2xl border border-border bg-white p-3 sm:p-4 lg:sticky lg:top-4 lg:p-6">
    <p className="mb-3 text-xs text-muted-foreground sm:mb-4">Case Overview</p>
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Case ID</p>
        <p className="text-sm text-primary">{caseDetail.case_id}</p>
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Property Address</p>
        <p className="text-sm leading-relaxed text-primary break-words whitespace-normal">{caseDetail.property_address}</p>
      </div>
      <div>
        <p className="mb-1 text-xs text-muted-foreground">Status</p>
        <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", caseStatusStyles[caseDetail.status])}>
          {caseStatusLabels[caseDetail.status]}
        </Badge>
      </div>
    </div>
  </div>
)

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const location = useLocation()
  const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""

  const { data: caseDetail, isLoading: isCaseLoading } = useCaseDetail(decodedCaseId)
  const { data: timeline = [] } = useCaseTimeline(decodedCaseId)
  const raiseDisputeMutation = useRaiseDispute(decodedCaseId)

  const [isDisputeOpen, setIsDisputeOpen] = useState(false)

  const isClosed = caseDetail?.status === "closed_confirmed_fraud" || caseDetail?.status === "closed_not_fraudulent"
  const disputeStatus = caseDetail?.agency_dispute_status ?? "none"
  const canRaiseDispute = isClosed && disputeStatus === "none"

  const handleRaiseDispute = async (note: string) => {
    try {
      await raiseDisputeMutation.mutateAsync(note)
      setIsDisputeOpen(false)
      toast.success("Dispute raised — admin will review")
    } catch (error) {
      console.error("Failed to raise dispute:", error)
      toast.error("Failed to raise dispute. Please try again.")
    }
  }

  if (isCaseLoading || !caseDetail) {
    return (
      <DashboardLayout>
        <DynamicPageHeader title="Case Details" />
        <DashboardPageContent>
          <div className="py-12 text-center text-sm text-muted-foreground">Loading case details...</div>
        </DashboardPageContent>
      </DashboardLayout>
    )
  }

  const propertyParties: PropertyPartiesData = {
    owner: caseDetail.owner_name ?? "Unknown",
    agency: caseDetail.agency_name ?? "Unknown",
    dateWithdrawn: caseDetail.date_withdrawn ? new Date(caseDetail.date_withdrawn).toLocaleDateString("en-GB") : "-",
    dateSold: caseDetail.date_sold ? new Date(caseDetail.date_sold).toLocaleDateString("en-GB") : "-",
    soldAmount: "",
    soldTo: caseDetail.buyer_name ?? "-",
    landRegistry: {
      completionDate: caseDetail.lr_completion_date ? new Date(caseDetail.lr_completion_date).toLocaleDateString("en-GB") : "-",
      buyerName: caseDetail.lr_buyer_name ?? "-",
    },
  }

  const timelineRecords: TimelineRecord[] = timeline.map((entry) => ({
    timestamp: new Date(entry.timestamp).toLocaleString("en-GB"),
    event: entry.event_description,
    actor: entry.actor_name,
  }))

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Details"
        breadcrumbs={[
          { label: (location.state as { returnLabel?: string })?.returnLabel || "Case Management", href: (location.state as { returnPath?: string })?.returnPath || "/dashboard/cases" },
          { label: caseDetail.case_id },
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
            <PropertyPartiesPanel data={propertyParties} variant="agency" />
            <TimelineAuditTrailPanel data={timelineRecords} />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
            <AgencyCaseOverviewCard caseDetail={caseDetail} />
            {(disputeStatus === "open" || disputeStatus === "resolved") && (
              <p className="mt-3 text-sm text-muted-foreground">
                {disputeStatus === "resolved"
                  ? "A dispute on this case has been resolved by admin."
                  : "A dispute has been raised on this closed case and is pending admin review."}
              </p>
            )}
          </div>
        </div>
      </DashboardPageContent>

      <RaiseDisputeModal
        open={isDisputeOpen}
        onClose={() => setIsDisputeOpen(false)}
        onSubmit={handleRaiseDispute}
      />
    </DashboardLayout>
  )
}

export default CaseDetails
