import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Buildings } from "iconsax-react"

export interface TopProperty {
    name: string
    location: string
    commission: string
}

interface TopPropertiesPanelProps {
    properties: TopProperty[]
}

export const TopPropertiesPanel = ({
    properties,
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
                        <TableHead className="px-2 py-2 text-right text-xs font-medium lg:px-4 lg:py-3">Commission</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((row, index) => (
                        <TableRow key={`${row.name}-${index}`} className="border-b border-border">
                            <TableCell className="px-2 py-2 text-xs font-normal text-foreground lg:px-4 lg:py-3 lg:text-sm">{row.name}</TableCell>
                            <TableCell className="px-2 py-2 text-xs text-muted-foreground lg:px-4 lg:py-3 lg:text-sm">{row.location}</TableCell>
                            <TableCell className="px-2 py-2 text-right text-xs font-medium text-foreground lg:px-4 lg:py-3 lg:text-sm">{row.commission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </DashboardPanel>
)
