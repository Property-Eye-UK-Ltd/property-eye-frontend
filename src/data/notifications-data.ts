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
        title: "Billing Payment Successful",
        description: "A payment of £1,232 made by Solict Homes for Pro Plan subscription was successful",
        time: "2 hrs ago",
        isUnread: true,
        linkText: "Solict Homes",
        linkUrl: "#",
    },
    {
        id: "2",
        title: "Case Closed",
        description: "Case #362894 has been successfully marked as closed.",
        time: "2 hrs ago",
        isUnread: false,
        linkText: "#362894",
        linkUrl: "#",
    },
    {
        id: "3",
        title: "Recovery Method",
        description: "Solict Homes set their recovery method to self handled",
        time: "2 hrs ago",
        isUnread: false,
        linkText: "Solict Homes",
        linkUrl: "#",
    },
    {
        id: "4",
        title: "Billing Payment Failed",
        description: "A payment of £1,232 made by Solict Homes for Pro Plan subscription failed",
        time: "2 hrs ago",
        isUnread: true,
        linkText: "Solict Homes",
        linkUrl: "#",
    },
    {
        id: "5",
        title: "New User Added",
        description: "Sarah Jenkins was added to the team by Admin",
        time: "3 hrs ago",
        isUnread: false,
        linkText: "Sarah Jenkins",
        linkUrl: "#",
    },
    {
        id: "6",
        title: "Report Generated",
        description: "Monthly performance report for October is ready for download",
        time: "5 hrs ago",
        isUnread: true,
        linkText: "Download",
        linkUrl: "#",
    },
    {
        id: "7",
        title: "Subscription Updated",
        description: "Pro Plan subscription was updated by Solict Homes",
        time: "1 day ago",
        isUnread: false,
        linkText: "Solict Homes",
        linkUrl: "#",
    },
    {
        id: "8",
        title: "Security Alert",
        description: "New login detected from a new device in London, UK",
        time: "1 day ago",
        isUnread: false,
        linkText: "Review",
        linkUrl: "#",
    },
]
