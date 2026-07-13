import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown } from "lucide-react"
import { Profile } from "iconsax-react"
import { cn } from "@/lib/utils"
import { StaffMember, staffStatusStyles, roleStyles } from "@/data/teamManagementData"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface StaffListTableProps {
    data: StaffMember[]
}

export const StaffListTable = ({ data }: StaffListTableProps) => {
    const navigate = useNavigate()
    const [sortColumn, setSortColumn] = useState<keyof StaffMember | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSort = (column: keyof StaffMember) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedData = useMemo(() => {
        if (!sortColumn) return data

        return [...data].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]
            const direction = sortDirection === "asc" ? 1 : -1

            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue) * direction
            }
            return 0
        })
    }, [data, sortColumn, sortDirection])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return sortedData.slice(start, start + itemsPerPage)
    }, [sortedData, currentPage, itemsPerPage])

    const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(1)
    }, [totalPages, currentPage])

    const sortBtnClass =
        "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

    return (
        <>
            <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                <Table className="min-w-[720px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={th}>Name</TableHead>
                            <TableHead className={th}>Email</TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("role")}>
                                    Role
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("lastActiveDate")}>
                                    Last Active
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => handleSort("status")}>
                                    Status
                                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </TableHead>
                            <TableHead className={th}>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((staff) => (
                            <TableRow key={staff.id} className="border-b border-border">
                                <TableCell className={td}>
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-progress/30 lg:h-9 lg:w-9">
                                            <Profile size={16} variant="Bulk" className="text-primary lg:h-[18px] lg:w-[18px]" />
                                        </div>
                                        <span className="whitespace-nowrap font-normal text-foreground">
                                            {staff.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className={cn(td, "max-w-[140px] truncate text-muted-foreground lg:max-w-none")}>
                                    {staff.email}
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:text-xs",
                                            roleStyles[staff.role]
                                        )}
                                    >
                                        {staff.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                    {staff.lastActiveDate}
                                </TableCell>
                                <TableCell className={td}>
                                    <Badge
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-normal lg:px-3 lg:py-1 lg:text-xs",
                                            staffStatusStyles[staff.status]
                                        )}
                                    >
                                        {staff.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className={td}>
                                    <button
                                        onClick={() => navigate(`/admin/team/staff/${staff.id}`)}
                                        className="text-xs font-medium text-progress hover:underline lg:text-sm"
                                    >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    )
}
