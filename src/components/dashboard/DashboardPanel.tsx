import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    actions?: ReactNode;
    noPadding?: boolean;
    hasBorder?: boolean;
}

export const DashboardPanel = ({
    title,
    icon,
    children,
    className,
    actions,
    noPadding = false,
    hasBorder = false,
}: DashboardPanelProps) => {
    return (
        <section
            className={cn(
                "rounded-2xl bg-white",
                hasBorder && "border border-border",
                className
            )}
        >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-t-2xl border-b border-border">
                <div className="flex items-center gap-2 text-sm font-normal text-foreground">
                    {icon}
                    <span>{title}</span>
                </div>
                {actions}
            </div>
            <div className={cn(noPadding ? "" : "p-6")}>{children}</div>
        </section>
    );
};

