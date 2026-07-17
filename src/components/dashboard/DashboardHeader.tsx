import {
    LogoutCurve,
    SidebarLeft,
    SidebarRight,
    SearchNormal,
    HambergerMenu,
} from "iconsax-react"
import { useNavigate } from "react-router-dom"
import { NotificationMenu } from "./NotificationMenu"
import { useAuth } from "@/features/auth/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
        } finally {
            navigate("/login", { replace: true })
        }
    }

    const isSuperAdmin = variant === "super-admin"
    const isAdmin = isSuperAdmin
    const showCheckRunner = isSuperAdmin
    
    // Dynamic user identity from auth context metadata
    const fallbackIdentity = headerIdentity[variant]
    const identityName = user?.full_name || (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.first_name || user?.last_name || fallbackIdentity.name)
    const identityEmail = user?.email || fallbackIdentity.email
    const identityAvatar = user?.profile_image_url || user?.avatar_url || user?.agency?.logo_url || undefined

    const identityInitials = identityName
        ? identityName
              .split(" ")
              .filter(Boolean)
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "?"

    const identity = {
        name: identityName,
        email: identityEmail,
        avatar: identityAvatar,
        initials: identityInitials,
    }

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


                {isAdmin && <div className="hidden min-w-0 flex-1 lg:block" aria-hidden />}


                <div
                    className={cn(
                        "flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3",
                        !isAdmin && "min-w-0 flex-1 justify-end"
                    )}
                >

                    {showCheckRunner && (
                        <>
                            <div className="lg:hidden">
                                <GlobalCheckRunner compact />
                            </div>
                            <div className="hidden lg:block">
                                <GlobalCheckRunner />
                            </div>
                        </>
                    )}

                    <NotificationMenu isAgencyPortal={variant === "agency"} />

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
