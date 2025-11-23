import { Refresh2, Notification, Profile } from "iconsax-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const DashboardHeader = () => {
    return (
        <header className="bg-background border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left: Last Data Pull */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Last data pull: 8 Nov 2025, 14:23 GMT</span>
                    <button
                        className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        aria-label="Refresh data"
                    >
                        <Refresh2 size={16} variant="Linear" />
                    </button>
                </div>

                {/* Middle: Progress Indicator */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">450/500</span>
                        <div className="w-24">
                            <Progress value={90} className="h-2" />
                        </div>
                    </div>
                </div>

                {/* Right: Notifications & User */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button
                        className="relative p-2 hover:bg-muted rounded-md transition-colors"
                        aria-label="Notifications"
                    >
                        <Notification size={20} variant="Linear" />
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            3
                        </Badge>
                    </button>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pl-4 border-l border-border">
                        <div className="text-right">
                            <p className="text-sm font-medium text-foreground">Admin</p>
                            <p className="text-xs text-muted-foreground">
                                amanda@solicthomes.com
                            </p>
                        </div>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Admin" />
                            <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
};

