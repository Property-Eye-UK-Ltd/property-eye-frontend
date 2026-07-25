import { Element, Home3, People, Wallet1, Headphone, Setting2, Book, Graph, Buildings, Danger, MoneyRecive, Card, Share, Note, SearchNormal, DocumentUpload } from "iconsax-react"
import { AGENCY_TAB_ACCESS } from "@/config/permissions"

export type DashboardVariant = "agency" | "super-admin" | "marketer"

export interface NavItem {
    label: string
    icon: any
    path: string
    variant?: "Bulk" | "TwoTone" | "Outline"
    key?: string
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
            key: "overview",
        },
        {
            label: "Case Management",
            icon: Book,
            path: "/dashboard/cases",
            variant: "Bulk",
            key: "cases",
        },
        {
            label: "Properties",
            icon: Buildings,
            path: "/dashboard/properties",
            variant: "Bulk",
            key: "properties",
        },

        {
            label: "Team Management",
            icon: People,
            path: "/dashboard/team",
            variant: "Bulk",
            key: "team",
        },
        {
            label: "Account & Billing",
            icon: Wallet1,
            path: "/dashboard/billing",
            variant: "Bulk",
            key: "billing",
        },
    ],
    bottomItems: [
        {
            label: "Settings",
            icon: Setting2,
            path: "/dashboard/settings",
            variant: "Bulk",
            key: "settings",
        },
        {
            label: "Help Center",
            icon: Headphone,
            path: "/dashboard/help",
            variant: "Bulk",
            key: "help",
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
            label: "Case Scans",
            icon: SearchNormal,
            path: "/admin/case-scans",
            variant: "Bulk",
        },
        {
            label: "Official Records",
            icon: DocumentUpload,
            path: "/admin/ppd-records",
            variant: "Bulk",
            key: "ppd-records",
        },
        {
            label: "Affiliates",
            icon: Share,
            path: "/admin/affiliates",
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

// Admin-portal roles below superadmin (analyst, viewer) don't get
// superadmin-only nav items — currently just Official Records (PPD uploads).
const SUPER_ADMIN_ONLY_KEYS = ["ppd-records"]

export const getVisibleNavConfig = (variant: DashboardVariant, role?: string): NavConfig => {
    const config = getNavConfig(variant)

    if (variant === "super-admin" && role && role !== "superadmin") {
        return {
            ...config,
            mainItems: config.mainItems.filter((item) => !item.key || !SUPER_ADMIN_ONLY_KEYS.includes(item.key)),
            bottomItems: config.bottomItems.filter((item) => !item.key || !SUPER_ADMIN_ONLY_KEYS.includes(item.key)),
        }
    }

    if (variant !== "agency" || !role) return config

    const allowedKeys = AGENCY_TAB_ACCESS[role]
    if (!allowedKeys) return config

    return {
        ...config,
        mainItems: config.mainItems.filter((item) => !item.key || allowedKeys.includes(item.key)),
        bottomItems: config.bottomItems.filter((item) => !item.key || allowedKeys.includes(item.key)),
    }
}
