import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TableRowCardProps {
    children: ReactNode
    className?: string
    onClick?: () => void
}

export const TableRowCard = ({ children, className, onClick }: TableRowCardProps) => {
    const Component = onClick ? "button" : "div"
    return (
        <Component
            type={onClick ? "button" : undefined}
            onClick={onClick}
            className={cn(
                "w-full rounded-xl border border-border bg-white p-3 text-left transition-colors",
                onClick && "hover:bg-muted/30 active:bg-muted/50",
                className
            )}
        >
            {children}
        </Component>
    )
}

interface TableRowCardFieldProps {
    label: string
    value: ReactNode
    className?: string
    valueClassName?: string
}

export const TableRowCardField = ({
    label,
    value,
    className,
    valueClassName,
}: TableRowCardFieldProps) => (
    <div className={cn("flex items-start justify-between gap-3 text-sm", className)}>
        <span className="shrink-0 text-muted-foreground">{label}</span>
        <span className={cn("text-right font-medium text-foreground", valueClassName)}>{value}</span>
    </div>
)
