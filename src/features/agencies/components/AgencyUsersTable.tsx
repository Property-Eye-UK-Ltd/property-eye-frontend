import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AgencyUser, userAccountStatusStyles, twoFactorStatusStyles } from "@/data/agencyUsersData"

interface AgencyUsersTableProps {
    data: AgencyUser[]
    onSort?: (column: keyof AgencyUser) => void
}

export const AgencyUsersTable = ({ data, onSort }: AgencyUsersTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="px-4 font-medium">Name</TableHead>
                        <TableHead className="px-4 font-medium">
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("role")}
                                >
                                    Role
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "Role"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("accountStatus")}
                                >
                                    Account Status
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "Account Status"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">Last Active</TableHead>
                        <TableHead className="px-4 font-medium">Last Login</TableHead>
                        <TableHead className="px-4 font-medium">
                            {onSort ? (
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => onSort("twoFactorEnabled")}
                                >
                                    2FA Enabled
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            ) : (
                                "2FA Enabled"
                            )}
                        </TableHead>
                        <TableHead className="px-4 font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.id} className="border-b border-border">
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Checkbox className="data-[state=checked]:bg-progress data-[state=checked]:border-progress" />
                                    <span className="font-normal">{user.name}</span>
                                </div>
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
                            <TableCell className="px-4 py-3">
                                <button
                                    className="text-sm font-medium transition-colors hover:underline"
                                    style={{ color: "var(--progress)" }}
                                >
                                    View
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
