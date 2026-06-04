import { MetricCard } from "@/features/overview/components/MetricCards"
import { CommissionTrackerDatum } from "@/features/marketing/overview/components/CommissionTrackerPanel"

export interface MarketerProfile {
    name: string
    email: string
    referralCode: string
    referralUrl: string
    avatar?: string
}

export const marketerProfile: MarketerProfile = {
    name: "Daniel Okafor",
    email: "daniel@growthpartners.co",
    referralCode: "MARKETER123",
    referralUrl: "https://app.propertyeye.com/signup?ref=MARKETER123",
    avatar: "https://i.pravatar.cc/150?img=12",
}

// Agency / fraud KPIs shown on the marketer Overview page
export const marketerOverviewMetrics: MetricCard[] = [
    { title: "Total Agencies Referred", value: "18", period: "All time", change: "+3", topBarClass: "bg-progress" },
    { title: "Active Agencies", value: "12", period: "All time", change: "+2", topBarClass: "bg-green-500" },
    { title: "Fraud Cases Identified", value: "57", period: "All time", change: "+9", topBarClass: "bg-red-500" },
]

// Commission KPIs shown on the marketer Commissions page
export const marketerCommissionMetrics: MetricCard[] = [
    { title: "Total Commission Earned", value: "£42,180", period: "All time", change: "+£5,400", topBarClass: "bg-secondary" },
    { title: "Pending Commission", value: "£8,640", period: "Awaiting approval & payment", change: "", topBarClass: "bg-amber-500" },
    { title: "Paid Commission", value: "£33,540", period: "All time", change: "+£4,100", topBarClass: "bg-purple-500" },
]

// Pie breakdown of commission lifecycle (slices sum to total earned)
export const commissionTracker: CommissionTrackerDatum[] = [
    { name: "Pending Approval", value: 3250, valueLabel: "£3,250", color: "#F59E0B" },
    { name: "Approved (Awaiting Payment)", value: 5390, valueLabel: "£5,390", color: "#4D66EA" },
    { name: "Paid", value: 33540, valueLabel: "£33,540", color: "#22C55E" },
]

export const commissionTrackerTotalLabel = "Total earned: £42,180"

export interface CommissionSummaryItem {
    label: string
    value: string
    accentClass: string
}

export const commissionSummary: CommissionSummaryItem[] = [
    { label: "Total Earned", value: "£42,180", accentClass: "bg-progress" },
    { label: "Pending Approval", value: "£3,250", accentClass: "bg-amber-500" },
    { label: "Approved (Awaiting Payment)", value: "£5,390", accentClass: "bg-blue-500" },
    { label: "Paid", value: "£33,540", accentClass: "bg-green-500" },
]

export type InviteStatus = "Sent" | "Opened" | "Signed up"

export interface AgencyInvite {
    id: string
    agencyName: string
    agencyEmail: string
    status: InviteStatus
    dateSent: string
}

export const inviteStatusStyles: Record<InviteStatus, string> = {
    Sent: "bg-gray-100 text-gray-600 border border-gray-200",
    Opened: "bg-blue-50 text-blue-600 border border-blue-100",
    "Signed up": "bg-green-50 text-green-600 border border-green-100",
}

export const agencyInvites: AgencyInvite[] = [
    { id: "inv-1", agencyName: "Harborview Estates", agencyEmail: "ops@harborview.co.uk", status: "Signed up", dateSent: "2 Nov, 2025" },
    { id: "inv-2", agencyName: "Crestline Properties", agencyEmail: "hello@crestline.co.uk", status: "Opened", dateSent: "28 Oct, 2025" },
    { id: "inv-3", agencyName: "Maple & Co Lettings", agencyEmail: "info@mapleco.co.uk", status: "Sent", dateSent: "24 Oct, 2025" },
    { id: "inv-4", agencyName: "Northgate Homes", agencyEmail: "team@northgatehomes.co.uk", status: "Signed up", dateSent: "15 Oct, 2025" },
    { id: "inv-5", agencyName: "Bridgewater Realty", agencyEmail: "contact@bridgewater.co.uk", status: "Opened", dateSent: "9 Oct, 2025" },
    { id: "inv-6", agencyName: "Sterling Property Group", agencyEmail: "admin@sterlingpg.co.uk", status: "Sent", dateSent: "3 Oct, 2025" },
]

// ---------------------------------------------------------------------------
// My Agencies (portfolio)
// ---------------------------------------------------------------------------

export type MarketerAgencyStatus = "Active" | "Pending" | "Rejected"
export type AttributionMethod = "Link" | "Invite" | "Manual"

export interface MarketerAgency {
    id: string
    name: string
    status: MarketerAgencyStatus
    dateAdded: string
    attributionMethod: AttributionMethod
    totalFraudValue: string
    totalCommission: string
    /** Whether attribution is locked to this marketer. If false, a claim can be submitted. */
    attributed: boolean
}

export const marketerAgencyStatusStyles: Record<MarketerAgencyStatus, string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    Rejected: "bg-red-50 text-red-600 border border-red-100",
}

export const attributionMethodStyles: Record<AttributionMethod, string> = {
    Link: "bg-blue-50 text-blue-600 border border-blue-100",
    Invite: "bg-purple-50 text-purple-600 border border-purple-100",
    Manual: "bg-gray-100 text-gray-600 border border-gray-200",
}

export const marketerAgencies: MarketerAgency[] = [
    { id: "ag-1", name: "Harborview Estates", status: "Active", dateAdded: "2 Nov, 2025", attributionMethod: "Invite", totalFraudValue: "£128,400", totalCommission: "£9,630", attributed: true },
    { id: "ag-2", name: "Northgate Homes", status: "Active", dateAdded: "15 Oct, 2025", attributionMethod: "Link", totalFraudValue: "£96,200", totalCommission: "£7,215", attributed: true },
    { id: "ag-3", name: "Crestline Properties", status: "Active", dateAdded: "28 Oct, 2025", attributionMethod: "Link", totalFraudValue: "£74,800", totalCommission: "£5,610", attributed: true },
    { id: "ag-4", name: "Bridgewater Realty", status: "Pending", dateAdded: "9 Oct, 2025", attributionMethod: "Invite", totalFraudValue: "£0", totalCommission: "£0", attributed: false },
    { id: "ag-5", name: "Maple & Co Lettings", status: "Pending", dateAdded: "24 Oct, 2025", attributionMethod: "Manual", totalFraudValue: "£18,500", totalCommission: "£0", attributed: false },
    { id: "ag-6", name: "Sterling Property Group", status: "Active", dateAdded: "3 Oct, 2025", attributionMethod: "Manual", totalFraudValue: "£52,300", totalCommission: "£3,920", attributed: true },
    { id: "ag-7", name: "Oakfield Residential", status: "Active", dateAdded: "18 Sep, 2025", attributionMethod: "Link", totalFraudValue: "£41,900", totalCommission: "£3,140", attributed: true },
    { id: "ag-8", name: "Kingsway Lettings", status: "Rejected", dateAdded: "11 Sep, 2025", attributionMethod: "Manual", totalFraudValue: "£0", totalCommission: "£0", attributed: false },
    { id: "ag-9", name: "Pinnacle Homes", status: "Active", dateAdded: "2 Sep, 2025", attributionMethod: "Invite", totalFraudValue: "£63,700", totalCommission: "£4,780", attributed: true },
    { id: "ag-10", name: "Riverside Estates", status: "Pending", dateAdded: "25 Aug, 2025", attributionMethod: "Link", totalFraudValue: "£0", totalCommission: "£0", attributed: false },
    { id: "ag-11", name: "Beacon Property Co", status: "Active", dateAdded: "14 Aug, 2025", attributionMethod: "Invite", totalFraudValue: "£38,200", totalCommission: "£2,865", attributed: true },
]

// ---------------------------------------------------------------------------
// Fraud cases / transactions
// ---------------------------------------------------------------------------

export type MarketerFraudStatus = "Detected" | "Under Review" | "Confirmed" | "Recovered"
export type CommissionEligibility = "Eligible" | "Not Eligible"

export interface MarketerFraudCase {
    id: string
    agency: string
    caseRef: string
    fraudValue: string
    status: MarketerFraudStatus
    commissionStatus: CommissionEligibility
}

export const marketerFraudStatusStyles: Record<MarketerFraudStatus, string> = {
    Detected: "bg-gray-100 text-gray-600 border border-gray-200",
    "Under Review": "bg-amber-50 text-amber-600 border border-amber-100",
    Confirmed: "bg-blue-50 text-blue-600 border border-blue-100",
    Recovered: "bg-green-50 text-green-600 border border-green-100",
}

export const commissionEligibilityStyles: Record<CommissionEligibility, string> = {
    Eligible: "bg-green-50 text-green-600 border border-green-100",
    "Not Eligible": "bg-gray-100 text-gray-500 border border-gray-200",
}

export const marketerFraudCases: MarketerFraudCase[] = [
    { id: "fc-1", agency: "Harborview Estates", caseRef: "#PE-256545", fraudValue: "£42,300", status: "Recovered", commissionStatus: "Eligible" },
    { id: "fc-2", agency: "Northgate Homes", caseRef: "#PE-256590", fraudValue: "£31,800", status: "Confirmed", commissionStatus: "Eligible" },
    { id: "fc-3", agency: "Crestline Properties", caseRef: "#PE-256612", fraudValue: "£28,400", status: "Under Review", commissionStatus: "Not Eligible" },
    { id: "fc-4", agency: "Sterling Property Group", caseRef: "#PE-256633", fraudValue: "£19,200", status: "Recovered", commissionStatus: "Eligible" },
    { id: "fc-5", agency: "Harborview Estates", caseRef: "#PE-256701", fraudValue: "£24,900", status: "Confirmed", commissionStatus: "Eligible" },
    { id: "fc-6", agency: "Oakfield Residential", caseRef: "#PE-256744", fraudValue: "£15,600", status: "Detected", commissionStatus: "Not Eligible" },
    { id: "fc-7", agency: "Pinnacle Homes", caseRef: "#PE-256780", fraudValue: "£33,100", status: "Under Review", commissionStatus: "Not Eligible" },
    { id: "fc-8", agency: "Northgate Homes", caseRef: "#PE-256802", fraudValue: "£21,750", status: "Recovered", commissionStatus: "Eligible" },
    { id: "fc-9", agency: "Beacon Property Co", caseRef: "#PE-256845", fraudValue: "£17,300", status: "Detected", commissionStatus: "Not Eligible" },
    { id: "fc-10", agency: "Crestline Properties", caseRef: "#PE-256888", fraudValue: "£26,400", status: "Confirmed", commissionStatus: "Eligible" },
    { id: "fc-11", agency: "Sterling Property Group", caseRef: "#PE-256901", fraudValue: "£12,800", status: "Detected", commissionStatus: "Not Eligible" },
    { id: "fc-12", agency: "Pinnacle Homes", caseRef: "#PE-256945", fraudValue: "£29,500", status: "Recovered", commissionStatus: "Eligible" },
]
