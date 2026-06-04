import {
    Refresh2,
    Sort,
    LogoutCurve,
    SidebarLeft,
    SidebarRight,
    SearchNormal,
    HambergerMenu,
} from "iconsax-react"
import { NotificationMenu } from "./NotificationMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebarContext } from "./SidebarContext"
import { GlobalCheckRunner } from "./GlobalCheckRunner"
import { cn } from "@/lib/utils"
import { DashboardVariant } from "@/config/navigation"

interface DashboardHeaderProps {
    variant?: DashboardVariant
}

const iconTriggerClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"

const headerIdentity: Record<DashboardVariant, { name: string; email: string; avatar: string; initials: string }> = {
    agency: { name: "Admin", email: "amanda@solicthomes.com", avatar: "https://i.pravatar.cc/150?img=1", initials: "AM" },
    "super-admin": { name: "Admin", email: "amanda@solicthomes.com", avatar: "https://i.pravatar.cc/150?img=1", initials: "AM" },
    marketer: { name: "Daniel Okafor", email: "daniel@growthpartners.co", avatar: "https://i.pravatar.cc/150?img=12", initials: "DO" },
}

export const DashboardHeader = ({ variant = "agency" }: DashboardHeaderProps) => {
    const { isCollapsed, toggleSidebar, isDesktop } = useSidebarContext()

    const handleLogout = () => {
        console.log("Logout clicked")
    }

    const isAdmin = variant === "super-admin"
    const isAgency = variant === "agency"
    const isMarketer = variant === "marketer"
    const identity = headerIdentity[variant]

    return (
        <header className="sticky top-0 z-20 border-b border-border bg-background">
            <div
                className={cn(
                    "flex items-center gap-2 px-3 py-2.5 lg:gap-3 lg:px-6 lg:py-4",
                    !isAdmin && "justify-between"
                )}
            >
                <button
                    onClick={toggleSidebar}
                    className={cn(
                        iconTriggerClass,
                        "shrink-0 lg:h-auto lg:w-auto lg:bg-transparent lg:p-2 lg:hover:bg-muted"
                    )}
                    aria-label={
                        isDesktop
                            ? isCollapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                            : "Open navigation menu"
                    }
                >
                    {isDesktop ? (
                        isCollapsed ? (
                            <SidebarRight size={20} variant="Outline" className="text-primary" />
                        ) : (
                            <SidebarLeft size={20} variant="Outline" className="text-primary" />
                        )
                    ) : (
                        <HambergerMenu size={22} variant="Outline" className="text-primary" />
                    )}
                </button>

                {isAdmin && (
                    <div className="relative min-w-0 flex-1 lg:hidden">
                        <SearchNormal
                            size={18}
                            variant="TwoTone"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="h-9 w-full rounded-full border-border bg-background pl-9 text-sm"
                        />
                    </div>
                )}

                {isAdmin && <div className="hidden min-w-0 flex-1 lg:block" aria-hidden />}

                <div
                    className={cn(
                        "flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3",
                        !isAdmin && "min-w-0 flex-1 justify-end"
                    )}
                >
                    {isAdmin && (
                        <div className="relative hidden h-9 w-40 shrink-0 lg:block xl:w-48">
                            <SearchNormal
                                size={18}
                                variant="TwoTone"
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                type="search"
                                placeholder="Search"
                                className="h-9 w-full rounded-full border-border bg-background pl-9 text-sm lg:h-10 lg:pl-10"
                            />
                        </div>
                    )}

                    {isAgency && (
                        <>
                            <div className="hidden items-center gap-2 lg:flex">
                                <button
                                    className="rounded-full p-1.5 transition-colors hover:bg-muted"
                                    aria-label="Refresh data"
                                >
                                    <Refresh2 size={20} variant="Bulk" className="text-primary" />
                                </button>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-foreground">Last data pull:</p>
                                    <p className="text-xs text-muted-foreground">
                                        8 Nov 2025, 14:23 GMT
                                    </p>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className={cn(iconTriggerClass, "lg:hidden")}
                                        aria-label="Last data pull"
                                    >
                                        <Refresh2 size={20} variant="Bulk" className="text-primary" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-xl p-0">
                                    <div className="space-y-3 p-4">
                                        <div>
                                            <p className="text-xs font-medium text-foreground">
                                                Last data pull
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                8 Nov 2025, 14:23 GMT
                                            </p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-9 w-full rounded-full"
                                        >
                                            <Refresh2
                                                size={16}
                                                variant="Bulk"
                                                className="mr-2 text-primary"
                                            />
                                            Refresh now
                                        </Button>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 lg:flex">
                                <div className="rounded-full bg-primary p-1">
                                    <Sort size={16} variant="Outline" className="text-secondary" />
                                </div>
                                <span className="text-sm font-medium">
                                    <span style={{ color: "#4D66EA" }}>450</span>
                                    <span className="text-muted-foreground">/500</span>
                                </span>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        className={cn(iconTriggerClass, "lg:hidden")}
                                        aria-label="Check credits"
                                    >
                                        <div className="rounded-full bg-primary p-1.5">
                                            <Sort size={16} variant="Outline" className="text-secondary" />
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-52 rounded-xl p-4">
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Check credits
                                    </p>
                                    <p className="mt-1 text-2xl font-medium text-foreground">
                                        <span style={{ color: "#4D66EA" }}>450</span>
                                        <span className="text-base text-muted-foreground">/500</span>
                                    </p>
                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{ width: "90%" }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        50 checks remaining this cycle
                                    </p>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}

                    {!isMarketer && (
                        <>
                            <div className="lg:hidden">
                                <GlobalCheckRunner compact />
                            </div>
                            <div className="hidden lg:block">
                                <GlobalCheckRunner />
                            </div>
                        </>
                    )}

                    <NotificationMenu />

                    <div className="hidden h-6 w-px bg-border lg:block" />

                    <div className="flex items-center gap-1 sm:gap-2">
                        <div className="hidden text-left lg:block">
                            <p className="text-sm font-medium text-foreground">{identity.name}</p>
                            <p className="text-xs text-muted-foreground">{identity.email}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label="User menu"
                                >
                                    <Avatar className="h-9 w-9 lg:h-10 lg:w-10">
                                        <AvatarImage src={identity.avatar} alt={identity.name} />
                                        <AvatarFallback>{identity.initials}</AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <div className="border-b border-border px-3 py-2 lg:hidden">
                                    <p className="text-sm font-medium text-foreground">{identity.name}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {identity.email}
                                    </p>
                                </div>
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                                >
                                    <LogoutCurve
                                        size={16}
                                        variant="TwoTone"
                                        className="mr-2 text-destructive"
                                    />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}
