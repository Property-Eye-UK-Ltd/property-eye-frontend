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
import { users, User } from "@/data/team-data"
import { EditUserModal, EditUserFormValues } from "./modals/EditUserModal"
import { DisableUserModal, DisableUserFormValues } from "./modals/DisableUserModal"

const ITEMS_PER_PAGE = 5

interface UserListPanelProps {
    onEditUser?: (userId: string, values: EditUserFormValues) => Promise<void> | void
    onDisableUser?: (userId: string, values: DisableUserFormValues) => Promise<void> | void
}

export const UserListPanel = ({ onEditUser, onDisableUser }: UserListPanelProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<"role" | "lastActive" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const handleEditClick = (user: User) => {
        setSelectedUser(user)
        setIsEditModalOpen(true)
    }

    const handleEditSubmit = async (values: EditUserFormValues) => {
        if (!selectedUser) return
        setIsSubmitting(true)
        if (onEditUser) {
            await onEditUser(selectedUser.id, values)
        }
        setIsSubmitting(false)
        setIsEditModalOpen(false)
    }

    const handleDisableClick = () => {
        setIsEditModalOpen(false)
        setIsDisableModalOpen(true)
    }

    const handleDisableSubmit = async (values: DisableUserFormValues) => {
        if (!selectedUser) return
        setIsSubmitting(true)
        if (onDisableUser) {
            await onDisableUser(selectedUser.id, values)
        }
        setIsSubmitting(false)
        setIsDisableModalOpen(false)
    }

    // Pagination logic
    const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex)

    // Generate pagination array
    const getPaginationArray = () => {
        const pages: (number | "ellipsis")[] = []

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1, 2, 3)
            pages.push("ellipsis")
            pages.push(totalPages - 2, totalPages - 1, totalPages)
        }

        return pages
    }

    const pagination = getPaginationArray()

    return (
        <>
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
                            {paginatedUsers.map((user) => (
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
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="text-sm font-medium transition-colors hover:underline"
                                            style={{ color: "var(--progress)" }}
                                        >
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
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50"
                            >
                                <ArrowLeft size={16} variant="Outline" className="text-primary" />
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50"
                            >
                                Next
                                <ArrowRight size={16} variant="Outline" className="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>
            </DashboardPanel>

            <EditUserModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditSubmit}
                onDisable={handleDisableClick}
                user={selectedUser}
                isSubmitting={isSubmitting}
            />

            <DisableUserModal
                open={isDisableModalOpen}
                onClose={() => setIsDisableModalOpen(false)}
                onSubmit={handleDisableSubmit}
                user={selectedUser}
                isSubmitting={isSubmitting}
            />
        </>
    )
}
