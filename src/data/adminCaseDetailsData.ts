import { PropertyPartiesData } from "@/features/cases/components/PropertyPartiesPanel"
import { TimelineRecord } from "@/features/cases/components/TimelineAuditTrailPanel"

export const mockAdminCasePropertyParties: PropertyPartiesData = {
    owner: "Daniel Lawson",
    agency: "Solict Homes",
    dateWithdrawn: "12 Jul, 2025",
    dateSold: "15 Aug, 2025",
    soldAmount: "£425,000",
    soldTo: "Kris Luther",
    landRegistry: {
        completionDate: "2 Nov, 2025",
        buyerName: "Kris Luther",
    },
    transactionMetadata: {
        paymentDate: "2 Nov, 2025",
        amount: "£135,325",
    },
}

export const mockAdminCaseTimeline: TimelineRecord[] = [
    { timestamp: "2025-11-08 14:29", event: "Case opened", actor: "System" },
    { timestamp: "2025-11-09 10:15", event: "Check opened", actor: "Admin" },
    { timestamp: "2025-11-09 11:30", event: "Check completed", actor: "System" },
    { timestamp: "2025-11-09 11:35", event: "Classification (Fraud)", actor: "System" },
]
