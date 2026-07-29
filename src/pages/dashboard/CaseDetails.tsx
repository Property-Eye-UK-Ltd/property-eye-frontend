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
import { Skeleton } from "@/components/ui/skeleton"

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

interface AgencyCaseOverviewCardProps {
  caseDetail: CaseDetail
}

// Deliberately does not show Match Confidence / Fraud Type / Timing Risk:
// per FR-005.11 and the backend get_case_detail docstring
// (backend/src/api/v1/endpoints/dashboard.py), agencies must never see this
// internal scoring data — only Status. See findings report for the pre-existing
// dead-code bug this replaced.
const AgencyCaseOverviewCard = ({ caseDetail }: AgencyCaseOverviewCardProps) => {
  const status = caseDetail.status

  return (
    <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-6">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <div>
          <p className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Status</p>
          <Badge className={cn("mt-1 rounded-full px-3 py-0.5 text-xs font-medium", caseStatusStyles[status])}>
            {caseStatusLabels[status]}
          </Badge>
        </div>
      </div>
    </div>
  )
}

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
        <DynamicPageHeader
          title="Case Details"
          breadcrumbs={[
            { label: (location.state as { returnLabel?: string })?.returnLabel || "Case Management", href: (location.state as { returnPath?: string })?.returnPath || "/dashboard/cases" },
            { label: "Loading..." },
          ]}
        />
        <DashboardPageContent>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:items-start lg:gap-4 animate-pulse">
            {/* Left Column */}
            <div className="space-y-3 lg:col-span-2 lg:space-y-4">
              {/* Property Parties Skeleton Card */}
              <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-border/30">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Audit Trail Skeleton Card */}
              <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-6">
                <div className="pb-4 border-b border-border">
                  <Skeleton className="h-5 w-44" />
                </div>
                <div className="space-y-6 relative pl-6 border-l border-muted">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="relative space-y-2">
                      <div className="absolute -left-[30px] top-1 h-3 w-3 rounded-full bg-muted border-2 border-background" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3.5 w-24" />
                      </div>
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-4">
              {/* Case Overview Card Skeleton */}
              <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex flex-col items-center py-4 space-y-3 border-y border-border/50">
                  <Skeleton className="h-28 w-28 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
