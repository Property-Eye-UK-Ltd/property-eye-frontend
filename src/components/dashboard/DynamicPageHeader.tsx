import { ReactNode } from "react"
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

interface DynamicPageHeaderProps {
    title: string
    breadcrumbs?: BreadcrumbItem[]
    action?: {
        label: string
        onClick: () => void
    }
}

export const DynamicPageHeader = ({
    title,
    breadcrumbs,
    action,
}: DynamicPageHeaderProps) => {
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
                                        <>
                                            <BreadcrumbItem key={index}>
                                                {crumb.href ? (
                                                    <BreadcrumbLink asChild>
                                                        <a href={crumb.href} className="cursor-pointer">
                                                            {crumb.label}
                                                        </a>
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                        </>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                    {action && (
                        <Button
                            onClick={action.onClick}
                            className="rounded-full bg-primary text-white hover:text-white hover:bg-primary/70"
                        >
                            {action.label}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
