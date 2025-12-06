import { PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"
import { EvidenceRecord } from "@/features/cases/components/EvidenceOverviewPanel"
import { TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"

export const mockAdminCasePropertyParties: PropertyPartiesData = {
    owner: "Daniel Lawson",
    agency: "Solict Homes",
    agent: "Amanda Stenberg",
    introducedBuyers: ["Iverson James", "Kris Luther"],
    landRegistry: {
        completionDate: "2 Nov, 2025",
        buyerName: "Kris Luther",
    },
    transactionMetadata: {
        paymentDate: "2 Nov, 2025",
        payer: "Kris Luther",
        recipient: "Ryan Pelz",
        amount: "£135,325",
    },
}

export const mockAdminCaseEvidence: EvidenceRecord[] = [
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

export const mockAdminCaseTimeline: TimelineRecord[] = [
    { timestamp: "2025-11-08 14:29", event: "Buyer introduced", actor: "Agent" },
    { timestamp: "2025-11-08 14:29", event: "Email sent to buyer", actor: "CRM System" },
    { timestamp: "2025-11-08 14:29", event: "Call logged", actor: "Agent" },
]
