export interface HelpCenterCard {
    id: string
    icon: string
    title: string
    description: string
    link: string
}

export const helpCenterCards: HelpCenterCard[] = [
    {
        id: "1",
        icon: "LampCharge",
        title: "Getting Started",
        description: "Learn how to login, setup your account, and navigate the main features.",
        link: "/dashboard/help/getting-started",
    },
    {
        id: "2",
        icon: "People",
        title: "Team Management",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/team-management",
    },
    {
        id: "3",
        icon: "Setting2",
        title: "Settings",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/settings",
    },
    {
        id: "4",
        icon: "Wallet1",
        title: "Billing",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/billing",
    },
    {
        id: "5",
        icon: "Graph",
        title: "Reports & Exports",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/reports-exports",
    },
    {
        id: "6",
        icon: "Profile",
        title: "Profile",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/profile",
    },
    {
        id: "7",
        icon: "ShieldSecurity",
        title: "Security",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/security",
    },
    {
        id: "8",
        icon: "Book1",
        title: "Case Management",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/case-management",
    },
    {
        id: "9",
        icon: "Data",
        title: "Integration",
        description: "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc",
        link: "/dashboard/help/integration",
    },
]
