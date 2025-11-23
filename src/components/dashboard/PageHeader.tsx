import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    actions?: ReactNode;
}

export const PageHeader = ({ title, actions }: PageHeaderProps) => {
    return (
        <div className="bg-white border-b border-0.5">
            <div className="max-w-7xl mx-auto w-full px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            </div>
        </div>
    );
};

