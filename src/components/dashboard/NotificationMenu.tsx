import { useState } from "react"
import { CheckCheck, RefreshCw } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Notification as NotificationIcon } from "iconsax-react"
import { useMarkAllNotificationsRead, useNotifications } from "@/features/notifications/api/useNotifications"
import { cn } from "@/lib/utils"

interface NotificationMenuProps {
    isAgencyPortal?: boolean
}

const formatRelativeTime = (isoTimestamp: string): string => {
    const diffMs = Date.now() - new Date(isoTimestamp).getTime()
    const diffMinutes = Math.floor(diffMs / 60_000)
    if (diffMinutes < 1) return "just now"
    if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hr${diffHours === 1 ? "" : "s"} ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
}

export const NotificationMenu = ({ isAgencyPortal = false }: NotificationMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: notifications = [], isLoading, isFetching, refetch } = useNotifications()
    const markAllAsRead = useMarkAllNotificationsRead()

    const unreadCount = notifications.filter((n) => !n.is_read).length
    const hasNotifications = notifications.length > 0

    const handleMarkAllAsRead = () => {
        markAllAsRead.mutate()
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className="relative p-2 bg-muted rounded-full transition-colors hover:bg-muted/80"
                    aria-label="Notifications"
                >
                    <NotificationIcon size={20} variant="Bulk" className="text-foreground" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-[min(480px,calc(100vw-2rem))] rounded-2xl border-border p-0 shadow-lg"
                sideOffset={8}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">Notification</h4>
                        <button
                            onClick={() => refetch()}
                            className={cn(
                                "p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors",
                                isFetching && "animate-spin"
                            )}
                            title="Refresh notifications"
                            disabled={isLoading}
                        >
                            <RefreshCw size={14} />
                        </button>
                    </div>
                    {hasNotifications && (
                        <button
                            onClick={handleMarkAllAsRead}
                            disabled={markAllAsRead.isPending}
                            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50"
                        >
                            <CheckCheck size={14} />
                            Mark all as read
                        </button>
                    )}
                </div>

                {/* Header Separator - Full Width */}
                <div className="h-px bg-border" />

                {/* Content */}
                <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-track]:bg-transparent">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <p className="text-sm text-muted-foreground">Loading notifications…</p>
                        </div>
                    ) : hasNotifications ? (
                        <div className="py-2">
                            {notifications.map((notification, index) => (
                                <div key={notification.id}>
                                    <div
                                        className={`relative flex gap-3 px-6 py-4 transition-colors hover:bg-muted/50 ${notification.is_read ? "" : "bg-blue-50/30"
                                            }`}
                                    >
                                        {/* Unread Indicator */}
                                        {!notification.is_read && (
                                            <span className="absolute left-3 top-6 h-2 w-2 rounded-full bg-blue-600" />
                                        )}

                                        <div className={`flex-1 space-y-1 ${notification.is_read ? "" : "pl-2"}`}>
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground">
                                                    {notification.title}
                                                </p>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {formatRelativeTime(notification.created_at)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {notification.message}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Separator between items, indented */}
                                    {index < notifications.length - 1 && (
                                        <div className="mx-6 h-px bg-border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <h3 className="text-3xl font-medium text-foreground mb-1">No notifications yet</h3>
                            <p className="text-sm text-muted-foreground">Your notification inbox is empty.</p>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
