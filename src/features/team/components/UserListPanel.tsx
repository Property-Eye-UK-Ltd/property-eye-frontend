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
import { Filter, ArrowDown2, Profile } from "iconsax-react"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { users, User } from "@/data/team-data"

const ITEMS_PER_PAGE = 5

interface UserListPanelProps {
    onEditClick: (user: User) => void
}

export const UserListPanel = ({ onEditClick }: UserListPanelProps) => {
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
                return (new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()) * direction
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

    // Pagination logic
    const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex)

    return (
        <DashboardPanel
            title="User List"
            description="Manage users, roles, and access permissions."
            className="overflow-hidden"
            noPadding
            hasBorder
            actions={
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-muted-foreground hover:bg-transparent hover:border-[var(--progress)]">
                        <Filter size={16} />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-muted-foreground hover:bg-transparent hover:border-[var(--progress)]">
                        Export
                        <ArrowDown2 size={16} />
                    </Button>
                </div>
            }
        >
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Name</TableHead>
                            <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3 lg:text-sm">Email</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("role")}
                                >
                                    Role
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("lastActive")}
                                >
                                    Last Active Date
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("status")}
                                >
                                    Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow 
                                key={user.id} 
                                onClick={() => onEditClick(user)}
                                className="border-b border-border cursor-pointer hover:bg-slate-50/60"
                            >
                                <TableCell className="px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm">
                                    <div className="flex items-center gap-2 lg:gap-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-progress/30 lg:h-9 lg:w-9">
                                            <Profile size={16} variant="Bulk" className="text-primary lg:h-[18px] lg:w-[18px]" />
                                        </div>
                                        <span className="max-w-[80px] truncate font-normal text-foreground sm:max-w-none">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{user.email}</TableCell>
                                <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{user.role}</TableCell>
                                <TableCell className="whitespace-nowrap px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{user.lastActive}</TableCell>
                                <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                    <Badge
                                        className={cn(
                                            "rounded-full px-3 py-1 text-xs font-normal",
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : "bg-red-100 text-red-700 hover:bg-red-100"
                                        )}
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {totalPages > 1 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </DashboardPanel>
    )
}
