import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader"
import { PropertyPartiesPanel, PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineAuditTrailPanel, TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"
import { CaseOverviewCard } from "@/features/cases/components/CaseOverviewCard"

// Updated mock data structure for Agency dashboard
const mockCases: any[] = [
    {
      caseId: "367280",
      propertyAddress: "22 Ashfield Road, Leicester",
      status: "CHECKED",
      caseType: "managed",
    },
    {
      caseId: "367281",
      propertyAddress: "45 Piccadilly, Manchester",
      status: "PENDING",
      caseType: "managed",
    },
]

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
  {
    timestamp: "2025-11-03 09:15",
    event: "Case opened",
    actor: "System",
  },
  {
    timestamp: "2025-11-03 10:30",
    event: "Land Registry check opened",
    actor: "System",
  },
  {
    timestamp: "2025-11-03 10:35",
    event: "Land Registry check completed",
    actor: "System",
  },
  {
    timestamp: "2025-11-03 10:40",
    event: "Classification: Fraud Detected",
    actor: "System",
  },
]

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const location = useLocation()

  // Decode caseId from URL (handles # character)
  const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""

  // Find the case data
  const caseData = mockCases.find((c) => c.caseId === decodedCaseId.replace("#", "")) || mockCases[0]

  return (
    <DashboardLayout>
      <DynamicPageHeader
        title="Case Details"
        breadcrumbs={[
          { label: (location.state as any)?.returnLabel || "Case Management", href: (location.state as any)?.returnPath || "/dashboard/cases" },
          { label: `#${decodedCaseId.replace("#", "")}` },
        ]}
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
          {/* Left Column - Scrollable Cards */}
          <div className="lg:col-span-2 space-y-4">
            <PropertyPartiesPanel data={mockPropertyParties} />
            <TimelineAuditTrailPanel data={mockTimeline} />
          </div>

          {/* Right Column - Fixed Case Overview */}
          <div className="lg:col-span-1 lg:sticky lg:top-28 lg:self-start">
            <CaseOverviewCard
              caseData={caseData}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CaseDetails