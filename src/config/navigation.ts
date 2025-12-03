import {
    Category,
    Buildings2,
    Folder2,
    People,
    Wallet2,
    DocumentText,
    Setting2,
} from "iconsax-react"

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
            icon: Category,
            path: "/dashboard",
            variant: "Bulk",
        },
        {
            label: "Case Management",
            icon: Folder2,
            path: "/dashboard/cases",
            variant: "Bulk",
        },
        {
            label: "Analytics",
            icon: DocumentText,
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
            icon: Wallet2,
            path: "/dashboard/billing",
            variant: "Bulk",
        },
        {
            label: "Help Center",
            icon: DocumentText,
            path: "/dashboard/help",
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
    ],
    showProCard: true,
}

export const superAdminNavConfig: NavConfig = {
    mainItems: [
        {
            label: "Overview",
            icon: Category,
            path: "/admin/dashboard",
            variant: "Bulk",
        },
        {
            label: "Agencies",
            icon: Buildings2,
            path: "/admin/agencies",
            variant: "Bulk",
        },
        {
            label: "Case Management",
            icon: Folder2,
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
            icon: Wallet2,
            path: "/admin/billing",
            variant: "Bulk",
        },
        {
            label: "Reports & Exports",
            icon: DocumentText,
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

export const getNavConfig = (variant: "agency" | "super-admin"): NavConfig => {
    return variant === "super-admin" ? superAdminNavConfig : agencyNavConfig
}
