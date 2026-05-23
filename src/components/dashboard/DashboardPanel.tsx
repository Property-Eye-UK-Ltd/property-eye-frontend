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
    /** Tighter padding for chart-heavy panels */
    compactContent?: boolean;
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
    compactContent = false,
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
                <div className="flex flex-row items-center justify-between gap-2 rounded-t-2xl border-b border-border bg-gray-50 px-3 py-2.5 lg:px-4 lg:py-3">
                    <div className="flex min-w-0 items-start gap-2 text-sm text-foreground">
                        {icon}
                        <div className="flex min-w-0 flex-col gap-0.5 leading-tight">
                            {title && <span className="truncate font-medium">{title}</span>}
                            {description && (
                                <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
                            )}
                        </div>
                    </div>
                    {actions && (
                        <div className="flex max-w-[55%] shrink-0 items-center justify-end lg:max-w-none">
                            {actions}
                        </div>
                    )}
                </div>
            )}
            <div
                className={cn(
                    noPadding
                        ? ""
                        : compactContent
                          ? "px-1 py-2 sm:px-2 sm:py-3 lg:px-3 lg:py-4"
                          : "p-4 lg:p-6"
                )}
            >
                {children}
            </div>
        </section>
    );
};
