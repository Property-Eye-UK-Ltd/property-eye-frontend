import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Calendar } from "iconsax-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface ActionButton {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "destructive"
    className?: string
}

interface DynamicPageHeaderProps {
    title: string
    breadcrumbs?: BreadcrumbItem[]
    actions?: ReactNode | ActionButton[]
    tabs?: ReactNode
    showSweepCountdown?: boolean
}

export const DynamicPageHeader = ({
    title,
    breadcrumbs,
    actions,
    tabs,
    showSweepCountdown,
}: DynamicPageHeaderProps) => {
    const isMultiAction = Array.isArray(actions) && actions.length > 1
    const singleCtaLayout = !!actions && !isMultiAction

    const renderActions = () => {
        if (!actions) return null

        if (!Array.isArray(actions)) {
            return (
                <div
                    className={
                        singleCtaLayout
                            ? "shrink-0"
                            : "flex min-w-0 items-center justify-end gap-2 overflow-x-auto [-webkit-overflow-scrolling:touch]"
                    }
                >
                    {actions}
                </div>
            )
        }

        return (
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        onClick={action.onClick}
                        variant={action.variant}
                        size="sm"
                        className={
                            action.className ||
                            "h-9 rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/70 hover:text-white lg:h-10"
                        }
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div className="sticky top-0 z-10 w-full border-b border-border bg-white">
            <div className="mx-auto w-full max-w-7xl px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                <div
                    className={
                        singleCtaLayout && actions
                            ? "flex items-start justify-between gap-3"
                            : "flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between lg:gap-4"
                    }
                >
                    <div className="min-w-0 flex-1 flex flex-col gap-1 lg:gap-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:gap-3">
                            <h1 className="text-xl font-medium leading-tight text-foreground lg:text-3xl">
                                {title}
                            </h1>
                            {showSweepCountdown && (
                                <div className="flex w-fit max-w-full flex-wrap items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 lg:gap-2 lg:px-3 lg:py-1.5">
                                    <Calendar
                                        size={14}
                                        variant="Bulk"
                                        className="shrink-0 text-amber-600 lg:h-4 lg:w-4"
                                    />
                                    <span className="text-[11px] font-medium text-amber-700 lg:text-xs">
                                        Next Sweep:{" "}
                                        <span className="font-medium">July 1st, 2025</span>
                                    </span>
                                    <div className="mx-0.5 hidden h-3 w-px bg-amber-200 sm:block" />
                                    <span className="text-[11px] font-medium text-amber-600 lg:text-xs">
                                        68 Days Left
                                    </span>
                                </div>
                            )}
                        </div>
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((crumb, index) => (
                                        <div key={index} className="contents">
                                            <BreadcrumbItem>
                                                {crumb.href ? (
                                                    <BreadcrumbLink asChild>
                                                        <Link
                                                            to={crumb.href}
                                                            className="cursor-pointer text-xs lg:text-sm"
                                                        >
                                                            {crumb.label}
                                                        </Link>
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage className="text-xs lg:text-sm">
                                                        {crumb.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {index < breadcrumbs.length - 1 && (
                                                <BreadcrumbSeparator className="text-secondary" />
                                            )}
                                        </div>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                    {renderActions()}
                </div>
                {tabs && (
                    <div className="mt-2.5 min-w-0 overflow-x-auto lg:mt-4 [-webkit-overflow-scrolling:touch]">
                        {tabs}
                    </div>
                )}
            </div>
        </div>
    )
}
