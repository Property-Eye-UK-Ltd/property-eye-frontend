export interface Notification {
    id: string
    title: string
    description: string
    time: string
    isUnread: boolean
    linkText?: string
    linkUrl?: string
}

export const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Determination Pending Approval",
        description: "Case #367289 determination is pending your approval before close.",
        time: "2 hrs ago",
        isUnread: true,
        linkText: "#367289",
        linkUrl: "/admin/cases/%23367289",
    },
    {
        id: "2",
        title: "Determination Returned",
        description: "Case #367284 was returned for revision — additional evidence required.",
        time: "3 hrs ago",
        isUnread: true,
        linkText: "#367284",
        linkUrl: "/admin/cases/%23367284",
    },
    {
        id: "3",
        title: "Agency Dispute Raised",
        description: "Solict Homes raised a dispute on closed case #367294.",
        time: "4 hrs ago",
        isUnread: true,
        linkText: "#367294",
        linkUrl: "/admin/cases/%23367294",
    },
    {
        id: "4",
        title: "Attribution Claim Submitted",
        description: "Daniel Okafor submitted an attribution claim for Crestline Properties.",
        time: "5 hrs ago",
        isUnread: false,
        linkText: "Review",
        linkUrl: "/admin/affiliates",
    },
    {
        id: "5",
        title: "Attribution Conflict Detected",
        description: "Conflicting attribution claims detected for Northgate Homes.",
        time: "6 hrs ago",
        isUnread: false,
        linkText: "Resolve",
        linkUrl: "/admin/affiliates",
    },
    {
        id: "6",
        title: "Commission Approval Pending",
        description: "Commission line for case #367280 is awaiting approval in Marketer Commissions.",
        time: "1 day ago",
        isUnread: false,
        linkText: "Review",
        linkUrl: "/admin/billing",
    },
    {
        id: "7",
        title: "Account Review Reminder",
        description: "Next account review is scheduled from Admin Settings → Scheduling.",
        time: "1 day ago",
        isUnread: false,
        linkText: "Settings",
        linkUrl: "/admin/settings",
    },
    {
        id: "8",
        title: "New Activity On Your Agency",
        description: "Harborview Estates has updated aggregate case counts available in My Agencies.",
        time: "2 days ago",
        isUnread: false,
        linkText: "My Agencies",
        linkUrl: "/marketing/agencies",
    },
]
