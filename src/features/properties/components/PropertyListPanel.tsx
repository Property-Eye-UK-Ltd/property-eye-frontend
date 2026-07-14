import { useEffect, useMemo, useState } from "react"
import { SearchNormal } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PropertyListing } from "@/types/properties.types"
import { propertyStatusLabels, propertyStatusStyles } from "@/data/properties-data"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const formatDate = (value?: string) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return "—"
    return `£${value.toLocaleString("en-GB")}`
}

interface PropertyListPanelProps {
    data: PropertyListing[]
    isLoading: boolean
    onEditClick: (listing: PropertyListing) => void
    onDeleteClick: (listing: PropertyListing) => void
}

export const PropertyListPanel = ({
    data,
    isLoading,
    onEditClick,
    onDeleteClick,
}: PropertyListPanelProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const itemsPerPage = 10

    const filteredListings = useMemo(() => {
        const q = searchQuery.toLowerCase().trim()
        if (!q) return data
        return data.filter(
            (listing) =>
                listing.address.toLowerCase().includes(q) ||
                (listing.client_name ?? "").toLowerCase().includes(q) ||
                (listing.vendor_name ?? "").toLowerCase().includes(q) ||
                (listing.postcode ?? "").toLowerCase().includes(q)
        )
    }, [data, searchQuery])

    const paginatedListings = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredListings.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredListings, currentPage])

    const totalPages = Math.ceil(filteredListings.length / itemsPerPage) || 1

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])

    return (
        <DashboardPanel
            title="Properties"
            description="Track the properties you've submitted for fraud monitoring."
            className="overflow-hidden"
            noPadding
            hasBorder
            actions={
                <div className="relative w-full min-w-[9rem] sm:w-44 lg:w-52">
                    <SearchNormal
                        size={16}
                        variant="Outline"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        placeholder="Address, buyer, postcode"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
                    />
                </div>
            }
        >
            {isLoading ? (
                <div className="space-y-3 p-4">
                    {[1, 2, 3, 4].map((row) => (
                        <div key={row} className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
                        <Table className="min-w-[780px]">
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className={th}>Address</TableHead>
                                    <TableHead className={th}>Postcode</TableHead>
                                    <TableHead className={th}>Buyer</TableHead>
                                    <TableHead className={th}>Vendor</TableHead>
                                    <TableHead className={th}>Withdrawn Date</TableHead>
                                    <TableHead className={th}>Price</TableHead>
                                    <TableHead className={cn(th, "text-center")}>Status</TableHead>
                                    <TableHead className={cn(th, "text-right")}>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedListings.map((listing) => (
                                    <TableRow key={listing.id} className="border-b border-border">
                                        <TableCell
                                            className={cn(
                                                td,
                                                "max-w-[160px] truncate text-foreground sm:max-w-none sm:whitespace-normal"
                                            )}
                                        >
                                            {listing.address}
                                        </TableCell>
                                        <TableCell className={cn(td, "text-muted-foreground")}>
                                            {listing.postcode ?? "—"}
                                        </TableCell>
                                        <TableCell className={cn(td, "font-medium text-foreground")}>
                                            {listing.client_name ?? "—"}
                                        </TableCell>
                                        <TableCell className={cn(td, "text-muted-foreground")}>
                                            {listing.vendor_name ?? "—"}
                                        </TableCell>
                                        <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                            {formatDate(listing.withdrawn_date)}
                                        </TableCell>
                                        <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                                            {formatCurrency(listing.price)}
                                        </TableCell>
                                        <TableCell className={cn(td, "text-center")}>
                                            <Badge
                                                className={cn(
                                                    "rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1",
                                                    propertyStatusStyles[listing.status]
                                                )}
                                            >
                                                {propertyStatusLabels[listing.status]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={cn(td, "text-right")}>
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => onEditClick(listing)}
                                                    className="text-xs font-medium transition-colors hover:underline lg:text-sm"
                                                    style={{ color: "var(--progress)" }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteClick(listing)}
                                                    className="text-xs font-medium text-red-600 transition-colors hover:underline lg:text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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
                </>
            )}
        </DashboardPanel>
    )
}
