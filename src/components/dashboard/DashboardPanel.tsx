import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    actions?: ReactNode;
    noPadding?: boolean;
    hasBorder?: boolean;
}

export const DashboardPanel = ({
    title,
    description,
    icon,
    children,
    className,
    actions,
    noPadding = false,
    hasBorder = false,
}: DashboardPanelProps) => {
    const showHeader = Boolean(title || description || icon || actions);

    return (
        <section
            className={cn(
                "rounded-2xl bg-white",
                hasBorder && "border border-border",
                className
            )}
        >
            {showHeader && (
                <div className="flex flex-col gap-2 bg-gray-50 px-4 py-3 rounded-t-2xl border-b border-border md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-2 text-sm text-foreground">
                        {icon}
                        <div className="flex flex-col leading-tight gap-1">
                            {title && <span className="font-medium">{title}</span>}
                            {description && (
                                <p className="text-xs text-muted-foreground">{description}</p>
                            )}
                        </div>
                    </div>
                    {actions && <div className="flex-shrink-0">{actions}</div>}
                </div>
            )}
            <div className={cn(noPadding ? "" : "p-6")}>{children}</div>
        </section>
    );
};

