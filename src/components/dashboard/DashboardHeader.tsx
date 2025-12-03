import { Refresh2, Sort, ArrowDown2, LogoutCurve, SidebarLeft, SidebarRight, SearchNormal } from "iconsax-react"
import { NotificationMenu } from "./NotificationMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebarContext } from "./SidebarContext"

interface DashboardHeaderProps {
    variant?: "agency" | "super-admin"
}

export const DashboardHeader = ({ variant = "agency" }: DashboardHeaderProps) => {
    const { isCollapsed, setIsCollapsed } = useSidebarContext()

    const handleLogout = () => {
        // Handle logout logic here
        console.log("Logout clicked")
    }

    return (
        <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-20">
            <div className="flex items-center justify-between gap-4">
                {/* Sidebar Toggle - Left Side */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-muted rounded-full transition-colors flex-shrink-0"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? (
                        <SidebarRight size={20} variant="Outline" className="text-primary" />
                    ) : (
                        <SidebarLeft size={20} variant="Outline" className="text-primary" />
                    )}
                </button>

                {/* Right Side Content */}
                <div className="flex items-center justify-end gap-4 flex-1">
                    {variant === "super-admin" ? (
                        /* Search Bar for Super Admin */
                        <div className="relative flex-1 max-w-md">
                            <SearchNormal
                                size={20}
                                variant="TwoTone"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                type="search"
                                placeholder="Search"
                                className="pl-10 bg-background border-border rounded-full"
                            />
                        </div>
                    ) : (
                        /* Last Data Pull & Points for Agency Admin */
                        <>
                            {/* Last Data Pull - Leftmost */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-1.5 hover:bg-muted rounded-full transition-colors"
                                    aria-label="Refresh data"
                                >
                                    <Refresh2 size={20} variant="Bulk" className="text-primary" />
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
                        </>
                    )}

                    {/* Notification Icon */}
                    <NotificationMenu />

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
            </div>
        </header>
    )
}
