import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"
import { AgencyUser, userAccountStatusStyles, twoFactorStatusStyles } from "@/data/agencyUsersData"

interface AgencyUsersTablePanelProps {
    data: AgencyUser[]
    selectedUsers?: string[]
    onSelectionChange?: (selectedIds: string[]) => void
}

export const AgencyUsersTablePanel = ({ data, selectedUsers = [], onSelectionChange }: AgencyUsersTablePanelProps) => {
    const [sortColumn, setSortColumn] = useState<keyof AgencyUser | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)

    const handleSort = (column: keyof AgencyUser) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedUsers = useMemo(() => {
        if (!sortColumn) return data

        return [...data].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]
            const direction = sortDirection === "asc" ? 1 : -1

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * direction
            }
            if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                return (aValue === bValue ? 0 : aValue ? 1 : -1) * direction
            }
            return 0
        })
    }, [data, sortColumn, sortDirection])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            onSelectionChange?.(data.map((u) => u.id))
        } else {
            onSelectionChange?.([])
        }
    }

    const handleSelectUser = (userId: string, checked: boolean) => {
        if (!onSelectionChange) return
        if (checked) {
            onSelectionChange([...selectedUsers, userId])
        } else {
            onSelectionChange(selectedUsers.filter((id) => id !== userId))
        }
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-[50px] px-4"></TableHead>
                            <TableHead className="px-4 font-medium">Name</TableHead>
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
                                    onClick={() => handleSort("accountStatus")}
                                >
                                    Account Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium">Last Active</TableHead>
                            <TableHead className="px-4 font-medium">Last Login</TableHead>
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("twoFactorEnabled")}
                                >
                                    2FA Enabled
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.id} className="border-b border-border">
                                <TableCell className="px-4 py-3">
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                                        className="data-[state=checked]:bg-progress data-[state=checked]:border-progress"
                                    />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <span className="font-normal">{user.name}</span>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.role}</TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge className={cn("rounded-full px-3 py-1 text-xs font-normal", userAccountStatusStyles[user.accountStatus])}>
                                        {user.accountStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.lastActive}</TableCell>
                                <TableCell className="px-4 py-3 text-muted-foreground">{user.lastLogin}</TableCell>
                                <TableCell className="px-4 py-4">
                                    <Badge
                                        className={cn(
                                            "rounded-full px-3 py-1 text-xs font-normal",
                                            user.twoFactorEnabled ? twoFactorStatusStyles.enabled : twoFactorStatusStyles.disabled
                                        )}
                                    >
                                        {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        className={cn(
                            "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                            currentPage === 1 ? "bg-primary text-secondary" : "text-primary"
                        )}
                    >
                        1
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={16} variant="Outline" className="text-primary" />
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ArrowRight size={16} variant="Outline" className="text-primary" />
                    </button>
                </div>
            </div>
        </>
    )
}
