import { useMemo, useState } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, ArrowDown2, ArrowLeft, ArrowRight } from "iconsax-react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
    id: string
    name: string
    email: string
    role: string
    lastActive: string
    status: "Active" | "Disabled"
    avatar?: string
}

const users: User[] = [
    {
        id: "1",
        name: "John Smith",
        email: "johnsmithsmith@gmail.com",
        role: "Analyst",
        lastActive: "3 November, 2025",
        status: "Active",
        avatar: "/avatars/john.png"
    },
    {
        id: "2",
        name: "Khalid Jaffar",
        email: "K.jaffar@gmail.com",
        role: "Admin",
        lastActive: "21 October, 2025",
        status: "Disabled",
    },
    {
        id: "3",
        name: "Maria Sheldon",
        email: "Mariashel3245@gmail.com",
        role: "Viewer",
        lastActive: "21 October, 2025",
        status: "Disabled",
        avatar: "/avatars/maria.png"
    },
    {
        id: "4",
        name: "Kurt Daniel",
        email: "Dankurt@gmail.com",
        role: "Analyst",
        lastActive: "21 October, 2025",
        status: "Active",
        avatar: "/avatars/kurt.png"
    },
    {
        id: "5",
        name: "Angela Davies",
        email: "Angeladavies@gmail.com",
        role: "Analyst",
        lastActive: "30 September, 2025",
        status: "Active",
        avatar: "/avatars/angela.png"
    },
]

const pagination = [1, 2, 3, "ellipsis", 8, 9, 10] as const

export const UserListPanel = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<"role" | "lastActive" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const sortedUsers = useMemo(() => {
        if (!sortColumn) return users
        const direction = sortDirection === "asc" ? 1 : -1

        return [...users].sort((a, b) => {
            if (sortColumn === "role") {
                return a.role.localeCompare(b.role) * direction
            }
            if (sortColumn === "lastActive") {
                return new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime() * direction
            }
            if (sortColumn === "status") {
                return a.status.localeCompare(b.status) * direction
            }
            return 0
        })
    }, [sortColumn, sortDirection])

    const handleSort = (column: "role" | "lastActive" | "status") => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    return (
        <DashboardPanel
            title="User List"
            description="Manage users, roles, and access permissions."
            className="overflow-hidden"
            noPadding
            hasBorder
            actions={
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-foreground hover:border-[var(--progress)]">
                        <Filter size={16} />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-foreground hover:border-[var(--progress)]">
                        Export
                        <ArrowDown2 size={16} />
                    </Button>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">Name</TableHead>
                            <TableHead className="px-4 font-medium">Email</TableHead>
                            <TableHead className="px-4 font-semibold">
                                <button
                                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("role")}
                                >
                                    Role
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-semibold">
                                <button
                                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("lastActive")}
                                >
                                    Last Active Date
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-semibold">
                                <button
                                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("status")}
                                >
                                    Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.id} className="border-b border-border">
                                <TableCell className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className={cn(
                                                "text-xs font-medium",
                                                user.id === "2" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                            )}>
                                                {user.name.split(" ").map(n => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-foreground">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.email}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.role}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.lastActive}</TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge
                                        className={cn(
                                            "rounded-full px-3 py-1 text-xs font-medium",
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"
                                        )}
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                    <button className="text-sm font-medium transition-colors hover:underline" style={{ color: "var(--progress)" }}>
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex flex-col gap-4 border-t border-border px-4 py-4 text-white md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {pagination.map((item, idx) =>
                            item === "ellipsis" ? (
                                <div key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary text-primary">
                                    ...
                                </div>
                            ) : (
                                <button
                                    key={item}
                                    onClick={() => setCurrentPage(item)}
                                    className={cn(
                                        "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                                        currentPage === item ? "bg-primary text-secondary" : "text-primary"
                                    )}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary"
                        >
                            <ArrowLeft size={16} variant="Outline" className="text-primary" />
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(10, prev + 1))}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary"
                        >
                            Next
                            <ArrowRight size={16} variant="Outline" className="text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
