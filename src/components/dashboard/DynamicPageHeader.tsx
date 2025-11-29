import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
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
}

export const DynamicPageHeader = ({
    title,
    breadcrumbs,
    actions,
    tabs,
}: DynamicPageHeaderProps) => {
    const renderActions = () => {
        if (!actions) return null

        // If actions is a ReactNode (custom component), render it directly
        if (!Array.isArray(actions)) {
            return <div className="flex items-center gap-2">{actions}</div>
        }

        // If actions is an array of ActionButton objects, render buttons
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
                        <h1 className="text-3xl font-medium text-foreground">{title}</h1>
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
