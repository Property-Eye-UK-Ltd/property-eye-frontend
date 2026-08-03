import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableSkeletonProps {
    rows?: number
    columns?: number
    headerClassName?: string
    cellClassName?: string
}

export const TableSkeleton = ({
    rows = 5,
    columns = 9,
    headerClassName = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm",
    cellClassName = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"
}: TableSkeletonProps) => {
    return (
        <Table className="min-w-[1100px]">
            <TableHeader>
                <TableRow className="bg-gray-50">
                    {Array.from({ length: columns }).map((_, idx) => (
                        <TableHead key={idx} className={headerClassName}>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: rows }).map((_, rowIdx) => (
                    <TableRow key={rowIdx} className="border-b border-border">
                        {Array.from({ length: columns }).map((_, colIdx) => {
                            // First column: checkbox + short text
                            if (colIdx === 0) {
                                return (
                                    <TableCell key={colIdx} className={cellClassName}>
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-12" />
                                        </div>
                                    </TableCell>
                                )
                            }
                            // Second column: longer text
                            if (colIdx === 1) {
                                return (
                                    <TableCell key={colIdx} className={cellClassName}>
                                        <Skeleton className="h-4 w-56" />
                                    </TableCell>
                                )
                            }
                            // Third column: medium text
                            if (colIdx === 2) {
                                return (
                                    <TableCell key={colIdx} className={cellClassName}>
                                        <Skeleton className="h-4 w-36" />
                                    </TableCell>
                                )
                            }
                            // Badge columns (3, 4)
                            if (colIdx === 3 || colIdx === 4) {
                                return (
                                    <TableCell key={colIdx} className={cellClassName}>
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </TableCell>
                                )
                            }
                            // Date columns (5, 6, 7)
                            if (colIdx >= 5 && colIdx <= 7) {
                                return (
                                    <TableCell key={colIdx} className={cellClassName}>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                )
                            }
                            // Last column: action indicator
                            return (
                                <TableCell key={colIdx} className={cellClassName}>
                                    <Skeleton className="h-5 w-24 rounded-full" />
                                </TableCell>
                            )
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
