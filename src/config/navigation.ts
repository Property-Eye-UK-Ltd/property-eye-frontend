import { Element, Home3, People, Wallet1, Headphone, Setting2, Book, Graph, Buildings, Danger, MoneyRecive, Card, Share, Note } from "iconsax-react"

export type DashboardVariant = "agency" | "super-admin" | "marketer"

export interface NavItem {
    label: string
    icon: any
    path: string
    variant?: "Bulk" | "TwoTone" | "Outline"
}

export interface NavConfig {
    mainItems: NavItem[]
    bottomItems: NavItem[]
    showProCard: boolean
}

export const agencyNavConfig: NavConfig = {
    mainItems: [
        {
            label: "Overview",
            icon: Element,
            path: "/dashboard",
            variant: "Bulk",
        },
        {
            label: "Case Management",
            icon: Book,
            path: "/dashboard/cases",
            variant: "Bulk",
        },
        {
            label: "Analytics",
            icon: Graph,
            path: "/dashboard/analytics",
            variant: "Bulk",
        },
        {
            label: "Team Management",
            icon: People,
            path: "/dashboard/team",
            variant: "Bulk",
        },
        {
            label: "Account & Billing",
            icon: Wallet1,
            path: "/dashboard/billing",
            variant: "Bulk",
        },
    ],
    bottomItems: [
        {
            label: "Settings",
            icon: Setting2,
            path: "/dashboard/settings",
            variant: "Bulk",
        },
        {
            label: "Help Center",
            icon: Headphone,
            path: "/dashboard/help",
            variant: "Bulk",
        },
    ],
    showProCard: true,
}

export const superAdminNavConfig: NavConfig = {
    mainItems: [
        {
            label: "Overview",
            icon: Element,
            path: "/admin/dashboard",
            variant: "Bulk",
        },
        {
            label: "Agencies",
            icon: Home3,
            path: "/admin/agencies",
            variant: "Bulk",
        },
        {
            label: "Case Management",
            icon: Book,
            path: "/admin/cases",
            variant: "Bulk",
        },
        {
            label: "Team Management",
            icon: People,
            path: "/admin/team",
            variant: "Bulk",
        },
        {
            label: "Billing & Finance",
            icon: Wallet1,
            path: "/admin/billing",
            variant: "Bulk",
        },
        {
            label: "Reports & Exports",
            icon: Graph,
            path: "/admin/reports",
            variant: "Bulk",
        },
    ],
    bottomItems: [
        {
            label: "Settings",
            icon: Setting2,
            path: "/admin/settings",
            variant: "Bulk",
        },
    ],
    showProCard: false,
}

export const marketerNavConfig: NavConfig = {
    mainItems: [
        {
            label: "Overview",
            icon: Element,
            path: "/marketing/dashboard",
            variant: "Bulk",
        },
        {
            label: "My Agencies",
            icon: Buildings,
            path: "/marketing/agencies",
            variant: "Bulk",
        },
        {
            label: "Fraud Cases",
            icon: Danger,
            path: "/marketing/fraud-cases",
            variant: "Bulk",
        },
        {
            label: "Commissions",
            icon: MoneyRecive,
            path: "/marketing/commissions",
            variant: "Bulk",
        },
        {
            label: "Payments",
            icon: Card,
            path: "/marketing/payments",
            variant: "Bulk",
        },
        {
            label: "Referrals",
            icon: Share,
            path: "/marketing/referrals",
            variant: "Bulk",
        },
    ],
    bottomItems: [
        {
            label: "Disputes",
            icon: Note,
            path: "/marketing/disputes",
            variant: "Bulk",
        },
    ],
    showProCard: false,
}

export const getNavConfig = (variant: DashboardVariant): NavConfig => {
    if (variant === "super-admin") return superAdminNavConfig
    if (variant === "marketer") return marketerNavConfig
    return agencyNavConfig
}
