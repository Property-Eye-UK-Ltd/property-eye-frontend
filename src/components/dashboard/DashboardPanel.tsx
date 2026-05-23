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
                <div
                    className={cn(
                        "rounded-t-2xl border-b border-border bg-gray-50 px-3 py-2.5 lg:px-4 lg:py-3",
                        actions
                            ? "flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3"
                            : "flex flex-row items-center justify-between gap-2"
                    )}
                >
                    <div className="flex min-w-0 items-start gap-2 text-sm text-foreground">
                        {icon}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
                            {title && <span className="font-medium leading-snug">{title}</span>}
                            {description && (
                                <p className="text-xs leading-snug text-muted-foreground lg:line-clamp-2">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {actions && (
                        <div className="flex w-full min-w-0 items-center gap-1.5 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] lg:w-auto lg:max-w-none lg:justify-end lg:overflow-visible lg:pb-0">
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
