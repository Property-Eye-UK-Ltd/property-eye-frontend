import { Refresh2, Notification, Sort, ArrowDown2, LogoutCurve } from "iconsax-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = () => {
    const handleLogout = () => {
        // Handle logout logic here
        console.log("Logout clicked");
    };

    return (
        <header className="bg-background px-6 py-4">
            <div className="flex items-center justify-end gap-4">
                {/* Right to Left Layout */}
                
                {/* Last Data Pull - Leftmost */}
                <div className="flex items-center gap-2">
                    <button
                        className="p-1.5 hover:bg-muted rounded-full transition-colors"
                        aria-label="Refresh data"
                    >
                        <Refresh2 size={20} variant="Bulk" className="text-primary"/>
                    </button>
                    <div className="text-left">
                        <p className="text-xs font-medium text-foreground">Last data pull:</p>
                        <p className="text-xs text-muted-foreground">8 Nov 2025, 14:23 GMT</p>
                    </div>
                </div>

                {/* Progress Badge/Tag */}
                <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1.5">
                    <div className="bg-primary rounded-full p-1">
                        <Sort size={16} variant="Outline" className="text-secondary" />
                    </div>
                    <span className="text-sm font-medium">
                        <span style={{ color: "#4D66EA" }}>450</span>
                        <span className="text-muted-foreground">/500</span>
                    </span>
                </div>


                {/* Notification Icon */}
                <button
                    className="p-2 bg-muted rounded-full transition-colors"
                    aria-label="Notifications"
                >
                    <Notification size={20} variant="Bulk" />
                </button>

                {/* Separator */}
                <div className="h-6 w-px bg-border" />

                {/* User Info - Rightmost */}
                <div className="flex items-center gap-3">
                    <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Admin</p>
                        <p className="text-xs text-muted-foreground">
                            amanda@solicthomes.com
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Admin" />
                                    <AvatarFallback>AM</AvatarFallback>
                                </Avatar>
                                <button
                                    className="p-1 hover:bg-muted rounded-md transition-colors"
                                    aria-label="User menu"
                                >
                                    <ArrowDown2 size={16} variant="Outline" />
                                </button>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                            >
                                <LogoutCurve size={16} variant="TwoTone" className="mr-2 text-destructive" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

