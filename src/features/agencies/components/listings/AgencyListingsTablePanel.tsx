import { useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown } from "lucide-react"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { cn } from "@/lib/utils"
import { PropertyListing } from "@/types/properties.types"
import { propertyStatusLabels, propertyStatusStyles } from "@/data/properties-data"

interface AgencyListingsTablePanelProps {
    data: PropertyListing[]
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    isLoading: boolean
}

const th = "px-4 py-3 text-xs font-medium whitespace-nowrap lg:text-sm text-muted-foreground"
const td = "px-4 py-3 text-xs lg:text-sm text-muted-foreground"

const formatDate = (value?: string | null) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

const formatCurrency = (value?: string | number | null) => {
    if (value === undefined || value === null || value === "") return "—"
    if (typeof value === "number") {
        return `£${value.toLocaleString("en-GB")}`
    }
    const num = parseFloat(value.replace(/[^0-9.]/g, ""))
    if (Number.isNaN(num)) return value
    return `£${num.toLocaleString("en-GB")}`
}

export const AgencyListingsTablePanel = ({
    data,
    currentPage,
    totalPages,
    onPageChange,
    isLoading,
}: AgencyListingsTablePanelProps) => {
    const [sortColumn, setSortColumn] = useState<"address" | "status" | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleSort = (column: "address" | "status") => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedListings = useMemo(() => {
        if (!sortColumn) return data

        return [...data].sort((a, b) => {
            const direction = sortDirection === "asc" ? 1 : -1
            const valA = a[sortColumn] ?? ""
            const valB = b[sortColumn] ?? ""
            return valA.localeCompare(valB) * direction
        })
    }, [data, sortColumn, sortDirection])

    if (isLoading) {
        return (
            <div className="space-y-3 p-4">
                {[1, 2, 3, 4].map((row) => (
                    <div key={row} className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                ))}
            </div>
        )
    }

    return (
        <>
            <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 font-medium">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => handleSort("address")}
                                >
                                    Address
                                    <ChevronsUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                            <TableHead className="px-4 font-medium text-muted-foreground">Postcode</TableHead>
                            <TableHead className="px-4 font-medium text-muted-foreground">Buyer</TableHead>
                            <TableHead className="px-4 font-medium text-muted-foreground">Vendor</TableHead>
                            <TableHead className="px-4 font-medium text-muted-foreground">Withdrawn Date</TableHead>
                            <TableHead className="px-4 font-medium text-muted-foreground">Price</TableHead>
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
                        {sortedListings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No listings found for this agency.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedListings.map((listing) => (
                                <TableRow key={listing.id} className="border-b border-border">
                                    <TableCell className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">
                                        {listing.address}
                                    </TableCell>
                                    <TableCell className={td}>{listing.postcode ?? "—"}</TableCell>
                                    <TableCell className={cn(td, "font-medium text-foreground")}>
                                        {listing.client_name ?? "—"}
                                    </TableCell>
                                    <TableCell className={td}>{listing.vendor_name ?? "—"}</TableCell>
                                    <TableCell className={td}>{formatDate(listing.withdrawn_date)}</TableCell>
                                    <TableCell className={td}>{formatCurrency(listing.price)}</TableCell>
                                    <TableCell className="px-4 py-3">
                                        {listing.status ? (
                                            <Badge
                                                className={cn(
                                                    "rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap",
                                                    propertyStatusStyles[listing.status] || "bg-gray-100 text-gray-800"
                                                )}
                                            >
                                                {propertyStatusLabels[listing.status] || listing.status}
                                            </Badge>
                                        ) : (
                                            "—"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border px-6 py-4">
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const pageNum = idx + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={cn(
                                        "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                                        currentPage === pageNum ? "bg-primary text-secondary" : "text-primary hover:bg-muted"
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ArrowLeft size={16} variant="Outline" className="text-primary" />
                            Previous
                        </button>
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                            <ArrowRight size={16} variant="Outline" className="text-primary" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
