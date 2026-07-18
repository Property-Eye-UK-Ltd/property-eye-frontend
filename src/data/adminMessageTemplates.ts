export interface MessageTemplate {
    id: string
    title: string
    type: "Email" | "SMS" | "In-app"
    trigger: string
    content: string
}

export const adminMessageTemplates: MessageTemplate[] = [
    { id: "t1", title: "Fraud Detected (Agency)", type: "Email", trigger: "Case opened — fraud signal", content: "Dear [Agency Name], our system has detected a potential commission fraud for property [Property Address]. Please review the case details in your dashboard." },
    { id: "t2", title: "Case Cleared (Agency)", type: "Email", trigger: "A1 — closed Not Fraudulent", content: "Case [Case ID] for [Property Address] has been closed as Not Fraudulent (Cleared). No further action is required." },
    { id: "t3", title: "Account Review Reminder", type: "SMS", trigger: "Sweep scheduled", content: "Property Eye Alert: An account review is scheduled. Please ensure your data integration is healthy." },
    { id: "t4", title: "Account Review Update", type: "Email", trigger: "Check completed", content: "The account review for [Period] has been completed. Sign in to Property Eye for your latest case status updates." },
    { id: "t5", title: "Billing Reminder", type: "SMS", trigger: "Subscription due", content: "Your Property Eye subscription for [Month] is due. Please review your billing tab to avoid service interruption." },
    { id: "t6", title: "Dispute Received (Agency)", type: "Email", trigger: "A2 — admin received dispute", content: "We have received your dispute on case [Case ID]. Our team will review and update you shortly." },
    { id: "t7", title: "Dispute Resolved (Agency)", type: "Email", trigger: "A2 — dispute resolved", content: "Your dispute on case [Case ID] has been resolved. Sign in to view the updated case status." },
    { id: "t8", title: "Determination Pending Approval", type: "In-app", trigger: "A1 — case submitted for close", content: "A case determination for [Case ID] is pending your approval. Review the determination and recovery details in Case Management." },
    { id: "t9", title: "Determination Returned", type: "In-app", trigger: "A1 — admin returned case", content: "Case [Case ID] was returned for revision. Note from admin: [Return Note]." },
    { id: "t10", title: "Case Closed (Agency)", type: "Email", trigger: "A1 — case approved closed", content: "Case [Case ID] for [Property Address] has been closed with outcome: [Determination]." },
    { id: "t11", title: "Agency Dispute Raised", type: "In-app", trigger: "A2 — agency disputes closed case", content: "[Agency Name] raised a dispute on closed case [Case ID]. Review in Case Management." },
    { id: "t12", title: "Attribution Claim Submitted", type: "In-app", trigger: "A3 — marketer claim", content: "Marketer [Marketer Name] submitted an attribution claim for [Agency Name]. Review in Affiliates → Attribution." },
    { id: "t13", title: "Attribution Conflict Detected", type: "In-app", trigger: "A3 — conflicting claim", content: "An attribution conflict was detected for [Agency Name]. Resolve overlapping claims in Affiliates." },
    { id: "t14", title: "Attribution Claim Approved (Marketer)", type: "Email", trigger: "A3 — claim approved", content: "Your attribution claim for [Agency Name] has been approved. The agency is now linked to your network." },
    { id: "t15", title: "Attribution Claim Rejected (Marketer)", type: "Email", trigger: "A3 — claim rejected", content: "Your attribution claim for [Agency Name] was not approved. Contact support if you need more detail." },
    { id: "t16", title: "New Activity On Your Agency (Marketer)", type: "Email", trigger: "Agency case activity rollup", content: "[Agency Name] has new case activity. Open My Agencies for aggregate counts only." },
    { id: "t17", title: "Commission Approval Pending", type: "In-app", trigger: "A5 — case close triggers commission", content: "Commission line for [Case ID] / [Agency Name] is pending approval in Billing → Marketer Commissions." },
    { id: "t18", title: "Commission Approved (Marketer)", type: "Email", trigger: "A5 — commission approved", content: "Your commission of [Amount] for [Agency Name] has been approved and will be included in the next payout." },
    { id: "t19", title: "Commission Paid (Marketer)", type: "Email", trigger: "A5 — payout processed", content: "Payment of [Amount] has been processed for your referral commissions. View details in Payments." },
    { id: "t20", title: "Integration Health Alert", type: "SMS", trigger: "Sync unhealthy", content: "Property Eye: Your [Integration Type] sync for [Agency Name] is unhealthy. Please reconnect to avoid missed checks." },
]
