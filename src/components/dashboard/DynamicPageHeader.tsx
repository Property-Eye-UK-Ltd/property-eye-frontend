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
    const renderActions = () => {
        if (!actions) return null

        if (!Array.isArray(actions)) {
            return <div className="flex items-center gap-2">{actions}</div>
        }

        return (
            <div className="flex items-center gap-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        onClick={action.onClick}
                        variant={action.variant}
                        className={
                            action.className ||
                            "rounded-full bg-primary text-white hover:text-white hover:bg-primary/70"
                        }
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-white w-full border-b border-border sticky top-0 z-10">
            <div className="max-w-7xl mx-auto w-full px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-medium text-foreground">{title}</h1>
                            {showSweepCountdown && (
                                <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-100">
                                    <Calendar size={16} variant="Bulk" className="text-amber-600" />
                                    <span className="text-xs font-medium text-amber-700">
                                        Next Sweep: <span className="font-medium">July 1st, 2025</span>
                                    </span>
                                    <div className="h-3 w-px bg-amber-200 mx-1" />
                                    <span className="text-xs font-medium text-amber-600">
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
                                                        <Link to={crumb.href} className="cursor-pointer">
                                                            {crumb.label}
                                                        </Link>
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
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
                {tabs && <div className="mt-4">{tabs}</div>}
            </div>
        </div>
    )
}
