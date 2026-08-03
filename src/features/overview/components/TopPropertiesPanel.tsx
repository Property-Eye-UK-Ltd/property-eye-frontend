import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Buildings } from "iconsax-react"
import { Skeleton } from "@/components/ui/skeleton"

export interface TopProperty {
    name: string
    location: string
    recoveredAmount: string
}

interface TopPropertiesPanelProps {
    properties: TopProperty[]
    isLoading?: boolean
}

export const TopPropertiesPanel = ({
    properties,
    isLoading = false,
}: TopPropertiesPanelProps) => (
    <DashboardPanel
        title="Top Property Recoveries"
        icon={<Buildings size={18} variant="Bulk" className="text-muted-foreground" />}
        className="overflow-hidden lg:col-span-3"
        noPadding
        hasBorder
    >
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <Table className="min-w-[480px]">
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">Property</TableHead>
                        <TableHead className="px-2 py-2 text-xs font-medium lg:px-4 lg:py-3">Location</TableHead>
                        <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3">Recovered Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <TableRow key={idx} className="border-b border-border">
                                <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                    <Skeleton className="h-4 w-40" />
                                </TableCell>
                                <TableCell className="px-2 py-2 lg:px-4 lg:py-3">
                                    <Skeleton className="h-4 w-28" />
                                </TableCell>
                                <TableCell className="px-2 py-2 text-right lg:px-4 lg:py-3">
                                    <Skeleton className="ml-auto h-4 w-20" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : properties.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                No recoveries recorded yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        properties.map((row, index) => (
                            <TableRow key={`${row.name}-${index}`} className="border-b border-border">
                                <TableCell className="px-2 py-2 text-xs font-normal text-foreground lg:px-4 lg:py-3 lg:text-sm">{row.name}</TableCell>
                                <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{row.location}</TableCell>
                                <TableCell className="px-2 py-2 text-right text-xs font-medium text-foreground lg:px-4 lg:py-3 lg:text-sm">{row.recoveredAmount}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    </DashboardPanel>
)

