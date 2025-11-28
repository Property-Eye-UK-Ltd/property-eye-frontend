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
import { Filter, ArrowDown2, ArrowLeft2, ArrowRight2, ArrowSwapVertical } from "iconsax-react"
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

export const UserListPanel = () => {
    return (
        <DashboardPanel
            title="User List"
            description="Manage users, roles, and access permissions."
            hasBorder
            actions={
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-foreground">
                        <Filter size={16} />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full border-border text-muted-foreground hover:text-foreground">
                        Export
                        <ArrowDown2 size={16} />
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <div className="rounded-md border border-border">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="font-medium">Name</TableHead>
                                <TableHead className="font-medium">Email</TableHead>
                                <TableHead className="font-medium">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                        Role
                                        <ArrowSwapVertical size={14} />
                                    </div>
                                </TableHead>
                                <TableHead className="font-medium">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                        Last Active Date
                                        <ArrowSwapVertical size={14} />
                                    </div>
                                </TableHead>
                                <TableHead className="font-medium">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                        Status
                                        <ArrowSwapVertical size={14} />
                                    </div>
                                </TableHead>
                                <TableHead className="text-right font-medium">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
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
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell className="text-muted-foreground">{user.role}</TableCell>
                                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "rounded-full px-3 font-normal",
                                                user.status === "Active"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-red-100 text-red-700 hover:bg-red-100"
                                            )}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((page) => (
                            <Button
                                key={page}
                                variant={page === 1 ? "default" : "outline"}
                                size="icon"
                                className={cn(
                                    "h-8 w-8 rounded-full text-xs",
                                    page === 1 ? "bg-[#00072C] hover:bg-[#00072C]/90" : "border-border text-muted-foreground"
                                )}
                            >
                                {page}
                            </Button>
                        ))}
                        <span className="text-muted-foreground text-xs">...</span>
                        {[8, 9, 10].map((page) => (
                            <Button
                                key={page}
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border-border text-muted-foreground text-xs"
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-full border-border text-muted-foreground gap-1">
                            <ArrowLeft2 size={14} />
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 rounded-full border-border text-muted-foreground gap-1">
                            Next
                            <ArrowRight2 size={14} />
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
