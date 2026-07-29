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
    total: number
    page: number
    pageSize: number
    onPageChange: (page: number) => void
    sortColumn: "role" | "lastActiveDate" | "status" | null
    onSortChange: (column: "role" | "lastActiveDate" | "status") => void
}

export const StaffListTable = ({
    data,
    total,
    page,
    pageSize,
    onPageChange,
    sortColumn,
    onSortChange,
}: StaffListTableProps) => {
    const navigate = useNavigate()
    const totalPages = Math.ceil(total / pageSize) || 1

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
                                <button className={sortBtnClass} onClick={() => onSortChange("role")}>
                                    Role
                                    <ChevronsUpDown
                                        className={cn(
                                            "h-3 w-3 lg:h-4 lg:w-4",
                                            sortColumn === "role" && "text-foreground"
                                        )}
                                    />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => onSortChange("lastActiveDate")}>
                                    Last Active
                                    <ChevronsUpDown
                                        className={cn(
                                            "h-3 w-3 lg:h-4 lg:w-4",
                                            sortColumn === "lastActiveDate" && "text-foreground"
                                        )}
                                    />
                                </button>
                            </TableHead>
                            <TableHead className={th}>
                                <button className={sortBtnClass} onClick={() => onSortChange("status")}>
                                    Status
                                    <ChevronsUpDown
                                        className={cn(
                                            "h-3 w-3 lg:h-4 lg:w-4",
                                            sortColumn === "status" && "text-foreground"
                                        )}
                                    />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((staff) => (
                            <TableRow 
                                key={staff.id} 
                                onClick={() => navigate(`/admin/team/staff/${staff.id}`)}
                                className="border-b border-border cursor-pointer hover:bg-slate-50 transition-colors"
                            >
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <TablePagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </>
    )
}
