import { useParams, useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { CaseDetailsPageHeader } from "@/components/dashboard/CaseDetailsPageHeader"
import { PropertyPartiesPanel, PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"
import { EvidenceOverviewPanel, EvidenceRecord } from "@/features/cases/components/EvidenceOverviewPanel"
import { TimelineAuditTrailPanel, TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"
import { CaseOverviewCard } from "@/features/cases/components/CaseOverviewCard"
import { CaseRecord } from "@/features/cases/components/CaseListPanel"

// Mock data - in real app, this would come from API
// This should match the data structure from CaseManagement
const mockCases: (CaseRecord & {
  caseType: "managed" | "self-handled"
  recoveryMode?: string
  status?: string
  commissionAtRisk?: string
  evidenceStatus?: string
})[] = [
  {
    caseId: "#256545",
    propertyAddress: "22 Ashfield Road, Leicester",
    fraudType: "Buyer Intro",
    score: 92,
    severity: "Critical",
    dateDetected: "3 Nov, 2025",
    caseType: "managed",
    recoveryMode: "Managed",
    status: "Flagged",
    commissionAtRisk: "£12,790",
    evidenceStatus: "Completed",
  },
  {
    caseId: "#367281",
    propertyAddress: "45 Piccadilly, Manchester",
    fraudType: "Private Sale",
    score: 88,
    severity: "Low",
    dateDetected: "21 Oct, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367282",
    propertyAddress: "12 High Street, London",
    fraudType: "Dual Agency",
    score: 100,
    severity: "Low",
    dateDetected: "30 Sep, 2025",
    caseType: "managed",
  },
  {
    caseId: "#367290",
    propertyAddress: "42 Elm Grove, Glasgow",
    fraudType: "Buyer Intro",
    score: 87,
    severity: "High",
    dateDetected: "25 Aug, 2025",
    caseType: "self-handled",
  },
  {
    caseId: "#367291",
    propertyAddress: "19 Queen Street, Cardiff",
    fraudType: "Private Sale",
    score: 73,
    severity: "Medium",
    dateDetected: "20 Aug, 2025",
    caseType: "self-handled",
  },
  // Add more cases as needed
]

const mockEvidence: EvidenceRecord[] = [
  {
    evidenceType: "Email",
    description: "Negotiation correspondence",
    uploadedBy: "CRM Log",
    date: "31 Oct, 2025",
  },
  {
    evidenceType: "Call Record",
    description: "Buyer follow-up",
    uploadedBy: "Agent",
    date: "19 Sep, 2025",
  },
  {
    evidenceType: "Photo",
    description: "Property front view",
    uploadedBy: "Agent",
    date: "3 Sep, 2025",
  },
]

const mockPropertyParties: PropertyPartiesData = {
  owner: "Daniel Lawson",
  agent: "Amanda Stenberg",
  agency: "Solict Homes",
  introducedBuyers: ["Iverson James", "Kris Luther"],
  landRegistry: {
    completionDate: "2 Nov, 2025",
    buyerName: "Kris Luther",
  },
  transactionMetadata: {
    paymentDate: "2 Nov, 2025",
    recipient: "Ryan Pelz",
    payer: "Kris Luther",
    amount: "£135,325",
  },
}

const mockTimeline: TimelineRecord[] = [
  {
    timestamp: "2025-11-08 14:29",
    event: "Buyer introduced",
    actor: "Agent",
  },
  {
    timestamp: "2025-11-08 14:29",
    event: "Email sent to buyer",
    actor: "CRM System",
  },
  {
    timestamp: "2025-11-08 14:29",
    event: "Call logged",
    actor: "Agent",
  },
]

const severityStyles: Record<CaseRecord["severity"], string> = {
  Critical: "bg-red-50 text-red-600 border border-red-100",
  High: "bg-orange-50 text-orange-600 border border-orange-100",
  Medium: "bg-amber-50 text-amber-600 border border-amber-100",
  Low: "bg-gray-100 text-gray-600 border border-gray-200",
}

const fraudTypeStyles: Record<CaseRecord["fraudType"], string> = {
  "Buyer Intro": "bg-purple-50 text-purple-600 border border-purple-100",
  "Private Sale": "bg-orange-50 text-orange-600 border border-orange-100",
  "Dual Agency": "bg-blue-50 text-blue-600 border border-blue-100",
}

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>()
  const navigate = useNavigate()

  // Decode caseId from URL (handles # character)
  const decodedCaseId = caseId ? decodeURIComponent(caseId) : ""
  
  // Find the case data
  const caseData = mockCases.find((c) => c.caseId === decodedCaseId)

  if (!caseData) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-7xl px-6 py-6">
          <p>Case not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const isSelfHandled = caseData.caseType === "self-handled"

  const handleCloseCase = () => {
    // TODO: Implement close case logic
    console.log("Close case:", caseId)
  }

  const handleUploadEvidence = () => {
    // TODO: Implement upload evidence logic
    console.log("Upload evidence")
  }

  return (
    <DashboardLayout>
      <CaseDetailsPageHeader
        caseId={decodedCaseId}
        showCloseCase={isSelfHandled}
        onCloseCase={handleCloseCase}
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left Column - Scrollable Cards */}
          <div className="lg:col-span-2 space-y-4">
            <PropertyPartiesPanel data={mockPropertyParties} />
            <EvidenceOverviewPanel data={mockEvidence} onUploadEvidence={handleUploadEvidence} />
            <TimelineAuditTrailPanel data={mockTimeline} />
            {/* Add more cards here as needed */}
          </div>

          {/* Right Column - Fixed Case Overview */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <CaseOverviewCard
                caseData={caseData}
                severityStyles={severityStyles}
                fraudTypeStyles={fraudTypeStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CaseDetails

