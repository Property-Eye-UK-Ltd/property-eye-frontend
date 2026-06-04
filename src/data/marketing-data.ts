import { MetricCard } from "@/features/overview/components/MetricCards"
import { DonutBreakdownDatum } from "@/features/marketing/components/DonutBreakdownPanel"
import { BarChartDatum } from "@/features/marketing/components/MarketingBarChartPanel"

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

// Donut breakdown of commission lifecycle (slices sum to total earned)
export const commissionTracker: DonutBreakdownDatum[] = [
    { name: "Pending Approval", value: 3250, valueLabel: "£3,250", color: "#F59E0B" },
    { name: "Approved (Awaiting Payment)", value: 5390, valueLabel: "£5,390", color: "#4D66EA" },
    { name: "Paid", value: 33540, valueLabel: "£33,540", color: "#22C55E" },
]

export const commissionTrackerTotalLabel = "Total earned: £42,180"

// Commission earned per month (bar chart, £)
export const commissionEarningsTrend: BarChartDatum[] = [
    { label: "Jan", value: 3200 },
    { label: "Feb", value: 4100 },
    { label: "Mar", value: 3800 },
    { label: "Apr", value: 5200 },
    { label: "May", value: 6400 },
    { label: "Jun", value: 5800 },
]

export type CommissionLineStatus = "Pending" | "Approved" | "Paid"

export interface CommissionLine {
    id: string
    agency: string
    fraudCase: string
    commissionPct: string
    amount: string
    status: CommissionLineStatus
}

export const commissionLineStatusStyles: Record<CommissionLineStatus, string> = {
    Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    Approved: "bg-blue-50 text-blue-600 border border-blue-100",
    Paid: "bg-green-50 text-green-600 border border-green-100",
}

export const commissionLines: CommissionLine[] = [
    { id: "cl-1", agency: "Harborview Estates", fraudCase: "#PE-256545", commissionPct: "7.5%", amount: "£3,172", status: "Paid" },
    { id: "cl-2", agency: "Northgate Homes", fraudCase: "#PE-256802", commissionPct: "7.5%", amount: "£1,631", status: "Paid" },
    { id: "cl-3", agency: "Sterling Property Group", fraudCase: "#PE-256633", commissionPct: "7.5%", amount: "£1,440", status: "Paid" },
    { id: "cl-4", agency: "Harborview Estates", fraudCase: "#PE-256701", commissionPct: "7.5%", amount: "£1,867", status: "Approved" },
    { id: "cl-5", agency: "Northgate Homes", fraudCase: "#PE-256590", commissionPct: "7.5%", amount: "£2,385", status: "Approved" },
    { id: "cl-6", agency: "Crestline Properties", fraudCase: "#PE-256888", commissionPct: "7.5%", amount: "£1,980", status: "Approved" },
    { id: "cl-7", agency: "Crestline Properties", fraudCase: "#PE-256612", commissionPct: "7.5%", amount: "£2,130", status: "Pending" },
    { id: "cl-8", agency: "Pinnacle Homes", fraudCase: "#PE-256945", commissionPct: "7.5%", amount: "£2,212", status: "Pending" },
    { id: "cl-9", agency: "Pinnacle Homes", fraudCase: "#PE-256780", commissionPct: "7.5%", amount: "£2,482", status: "Pending" },
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

// Referral KPIs shown on the Referrals page
export const marketerReferralMetrics: MetricCard[] = [
    { title: "Invites Sent", value: "24", period: "All time", change: "+5", topBarClass: "bg-progress" },
    { title: "Agencies Signed Up", value: "11", period: "All time", change: "+2", topBarClass: "bg-green-500" },
    { title: "Conversion Rate", value: "46%", period: "Signups / invites", change: "+4%", topBarClass: "bg-secondary" },
]

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

// Agency KPIs shown on the My Agencies page
export const marketerAgencyMetrics: MetricCard[] = [
    { title: "Total Agencies Referred", value: "18", period: "All time", change: "+3", topBarClass: "bg-progress" },
    { title: "Active Agencies", value: "12", period: "Currently active", change: "+2", topBarClass: "bg-green-500" },
    { title: "Pending Attribution", value: "4", period: "Awaiting review", change: "", topBarClass: "bg-amber-500" },
]

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

// Fraud KPIs shown on the Fraud Cases page
export const marketerFraudMetrics: MetricCard[] = [
    { title: "Total Fraud Value", value: "£402,900", period: "All time", change: "+£32,400", topBarClass: "bg-red-500" },
    { title: "Cases Recovered", value: "24", period: "All time", change: "+6", topBarClass: "bg-green-500" },
    { title: "Commission Eligible", value: "£36,400", period: "Eligible earnings", change: "+£4,200", topBarClass: "bg-secondary" },
]

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

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

// Payment KPIs shown on the Payments page
export const marketerPaymentMetrics: MetricCard[] = [
    { title: "Total Paid Out", value: "£33,540", period: "All time", change: "+£4,100", topBarClass: "bg-green-500" },
    { title: "Paid This Year", value: "£21,300", period: "2025", change: "+£3,200", topBarClass: "bg-progress" },
    { title: "Pending Payout", value: "£8,640", period: "Approved & pending", change: "", topBarClass: "bg-amber-500" },
]

// Payouts per month (bar chart, £)
export const paymentsTrend: BarChartDatum[] = [
    { label: "Jan", value: 2800 },
    { label: "Feb", value: 3500 },
    { label: "Mar", value: 3100 },
    { label: "Apr", value: 4200 },
    { label: "May", value: 3900 },
    { label: "Jun", value: 3800 },
]

// Donut breakdown of payout status (£)
export const paymentStatusBreakdown: DonutBreakdownDatum[] = [
    { name: "Paid", value: 33540, valueLabel: "£33,540", color: "#22C55E" },
    { name: "Scheduled", value: 5390, valueLabel: "£5,390", color: "#4D66EA" },
    { name: "Pending", value: 3250, valueLabel: "£3,250", color: "#F59E0B" },
]

export type PaymentStatus = "Paid" | "Scheduled" | "Rejected"

export interface PaymentRecord {
    id: string
    date: string
    amount: string
    period: string
    status: PaymentStatus
    statementId: string
}

export const paymentStatusStyles: Record<PaymentStatus, string> = {
    Paid: "bg-green-50 text-green-600 border border-green-100",
    Scheduled: "bg-blue-50 text-blue-600 border border-blue-100",
    Rejected: "bg-red-50 text-red-600 border border-red-100",
}

export const payments: PaymentRecord[] = [
    { id: "pay-1", date: "1 Nov, 2025", amount: "£4,100", period: "Oct 2025", status: "Paid", statementId: "STM-2025-10" },
    { id: "pay-2", date: "1 Oct, 2025", amount: "£3,920", period: "Sep 2025", status: "Paid", statementId: "STM-2025-09" },
    { id: "pay-3", date: "1 Sep, 2025", amount: "£3,140", period: "Aug 2025", status: "Paid", statementId: "STM-2025-08" },
    { id: "pay-4", date: "1 Aug, 2025", amount: "£4,780", period: "Jul 2025", status: "Paid", statementId: "STM-2025-07" },
    { id: "pay-5", date: "1 Jul, 2025", amount: "£2,865", period: "Jun 2025", status: "Paid", statementId: "STM-2025-06" },
    { id: "pay-6", date: "1 Jun, 2025", amount: "£5,390", period: "May 2025", status: "Scheduled", statementId: "STM-2025-05" },
    { id: "pay-7", date: "1 May, 2025", amount: "£3,250", period: "Apr 2025", status: "Scheduled", statementId: "STM-2025-04" },
    { id: "pay-8", date: "1 Apr, 2025", amount: "£1,980", period: "Mar 2025", status: "Rejected", statementId: "STM-2025-03" },
    { id: "pay-9", date: "1 Mar, 2025", amount: "£2,540", period: "Feb 2025", status: "Paid", statementId: "STM-2025-02" },
]

// ---------------------------------------------------------------------------
// Marketing Admin (Control Tower)
// ---------------------------------------------------------------------------

// Executive KPIs shown on the admin Control Tower overview
export const marketingAdminMetrics: MetricCard[] = [
    { title: "Active Marketers", value: "32", period: "All time", change: "+4", topBarClass: "bg-progress" },
    { title: "Attributed Agencies", value: "146", period: "All time", change: "+12", topBarClass: "bg-secondary" },
    { title: "Fraud Value Detected", value: "£2.4M", period: "All time", change: "+£180K", topBarClass: "bg-red-500" },
    { title: "Commission Liability", value: "£318,200", period: "Earned to date", change: "+£24,500", topBarClass: "bg-amber-500" },
    { title: "Outstanding Commission", value: "£74,600", period: "Awaiting payout", change: "", topBarClass: "bg-purple-500" },
    { title: "Active Disputes", value: "5", period: "Needs review", change: "-2", topBarClass: "bg-green-500" },
]

// Commission liability split (donut, £)
export const commissionLiabilityBreakdown: DonutBreakdownDatum[] = [
    { name: "Paid", value: 243600, valueLabel: "£243,600", color: "#22C55E" },
    { name: "Approved (Awaiting Payout)", value: 51400, valueLabel: "£51,400", color: "#4D66EA" },
    { name: "Pending Approval", value: 23200, valueLabel: "£23,200", color: "#F59E0B" },
]

// Commission liability accrued per month (bar chart, £)
export const commissionLiabilityTrend: BarChartDatum[] = [
    { label: "Jan", value: 38200 },
    { label: "Feb", value: 41800 },
    { label: "Mar", value: 46500 },
    { label: "Apr", value: 52100 },
    { label: "May", value: 58900 },
    { label: "Jun", value: 61400 },
]

export interface MarketerLeaderboardRow {
    id: string
    name: string
    agencies: number
    fraudValue: string
    commission: string
    status: "Active" | "Suspended"
}

export const marketerLeaderboard: MarketerLeaderboardRow[] = [
    { id: "mk-1", name: "Daniel Okafor", agencies: 18, fraudValue: "£402,900", commission: "£42,180", status: "Active" },
    { id: "mk-2", name: "Priya Sharma", agencies: 15, fraudValue: "£356,400", commission: "£38,900", status: "Active" },
    { id: "mk-3", name: "Marcus Bennett", agencies: 12, fraudValue: "£298,100", commission: "£31,250", status: "Active" },
    { id: "mk-4", name: "Aisha Bello", agencies: 11, fraudValue: "£241,700", commission: "£26,400", status: "Active" },
    { id: "mk-5", name: "Tom Whitfield", agencies: 9, fraudValue: "£198,300", commission: "£21,150", status: "Suspended" },
    { id: "mk-6", name: "Lena Novak", agencies: 8, fraudValue: "£164,800", commission: "£17,600", status: "Active" },
]

export const marketerLeaderboardStatusStyles: Record<MarketerLeaderboardRow["status"], string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Suspended: "bg-red-50 text-red-600 border border-red-100",
}

// ---------------------------------------------------------------------------
// Disputes / Support
// ---------------------------------------------------------------------------

export type DisputeStatus = "Open" | "Under Review" | "Resolved"
export type DisputeType = "Agency Ownership" | "Commission"

export interface MarketerDispute {
    id: string
    reference: string
    type: DisputeType
    linkedRecord: string
    description: string
    status: DisputeStatus
    dateRaised: string
}

export const disputeStatusStyles: Record<DisputeStatus, string> = {
    Open: "bg-amber-50 text-amber-600 border border-amber-100",
    "Under Review": "bg-blue-50 text-blue-600 border border-blue-100",
    Resolved: "bg-green-50 text-green-600 border border-green-100",
}

export const disputeTypeStyles: Record<DisputeType, string> = {
    "Agency Ownership": "bg-purple-50 text-purple-600 border border-purple-100",
    Commission: "bg-indigo-50 text-indigo-600 border border-indigo-100",
}

// Dispute KPIs shown on the Disputes page
export const marketerDisputeMetrics: MetricCard[] = [
    { title: "Open Disputes", value: "2", period: "Awaiting response", change: "", topBarClass: "bg-amber-500" },
    { title: "Under Review", value: "1", period: "Being assessed by admin", change: "", topBarClass: "bg-progress" },
    { title: "Resolved", value: "6", period: "All time", change: "+2", topBarClass: "bg-green-500" },
]

export const marketerDisputes: MarketerDispute[] = [
    { id: "dsp-1", reference: "#DSP-1042", type: "Agency Ownership", linkedRecord: "Maple & Co Lettings", description: "Agency was introduced by me via an offline meeting before the link signup.", status: "Under Review", dateRaised: "3 Nov, 2025" },
    { id: "dsp-2", reference: "#DSP-1038", type: "Commission", linkedRecord: "#PE-256612", description: "Commission rate applied looks lower than the agreed 7.5%.", status: "Open", dateRaised: "28 Oct, 2025" },
    { id: "dsp-3", reference: "#DSP-1031", type: "Commission", linkedRecord: "#PE-256590", description: "Recovered case not reflected in my eligible commission.", status: "Open", dateRaised: "21 Oct, 2025" },
    { id: "dsp-4", reference: "#DSP-1024", type: "Agency Ownership", linkedRecord: "Bridgewater Realty", description: "Duplicate attribution claim raised by another marketer.", status: "Resolved", dateRaised: "9 Oct, 2025" },
    { id: "dsp-5", reference: "#DSP-1019", type: "Commission", linkedRecord: "#PE-256545", description: "Payout period mismatch on Harborview Estates commission.", status: "Resolved", dateRaised: "2 Oct, 2025" },
    { id: "dsp-6", reference: "#DSP-1011", type: "Agency Ownership", linkedRecord: "Sterling Property Group", description: "Manual attribution confirmation requested.", status: "Resolved", dateRaised: "24 Sep, 2025" },
]
