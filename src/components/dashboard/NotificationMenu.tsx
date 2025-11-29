import { useState } from "react"
import { CheckCheck } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Notification, initialNotifications } from "@/data/notifications-data"
import { Notification as NotificationIcon } from "iconsax-react"

export const NotificationMenu = () => {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
    // const [notifications, setNotifications] = useState<Notification[]>([]) // Empty state for testing
    const [isOpen, setIsOpen] = useState(false)

    const unreadCount = notifications.filter((n) => n.isUnread).length

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isUnread: false })))
    }

    const hasNotifications = notifications.length > 0

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
            <PopoverContent align="end" className="w-[480px] rounded-2xl p-0 shadow-lg border-border" sideOffset={8}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <h4 className="font-medium text-foreground">Notification</h4>
                    {hasNotifications && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
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
                    {hasNotifications ? (
                        <div className="py-2">
                            {notifications.map((notification, index) => (
                                <div key={notification.id}>
                                    <div
                                        className={`relative flex gap-3 px-6 py-4 transition-colors hover:bg-muted/50 ${notification.isUnread ? "bg-blue-50/30" : ""
                                            }`}
                                    >
                                        {/* Unread Indicator */}
                                        {notification.isUnread && (
                                            <span className="absolute left-3 top-6 h-2 w-2 rounded-full bg-blue-600" />
                                        )}

                                        <div className={`flex-1 space-y-1 ${notification.isUnread ? "pl-2" : ""}`}>
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-foreground">
                                                    {notification.title}
                                                </p>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    {notification.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {notification.description.split(notification.linkText || "").map((part, i, arr) => (
                                                    <span key={i}>
                                                        {part}
                                                        {i < arr.length - 1 && notification.linkText && (
                                                            <a href={notification.linkUrl} className="font-normal text-blue-600 hover:underline">
                                                                {notification.linkText}
                                                            </a>
                                                        )}
                                                    </span>
                                                ))}
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
