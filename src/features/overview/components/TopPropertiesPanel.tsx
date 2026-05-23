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
                        <TableHead className="px-4 font-medium text-xs">Property</TableHead>
                        <TableHead className="px-4 font-medium text-xs">Location</TableHead>
                        <TableHead className="px-4 text-right font-medium text-xs">Commission</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((row, index) => (
                        <TableRow key={`${row.name}-${index}`} className="border-b border-border">
                            <TableCell className="px-4 py-3 text-sm font-normal text-foreground">{row.name}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-muted-foreground">{row.location}</TableCell>
                            <TableCell className="px-4 py-3 text-right text-sm font-medium text-foreground">{row.commission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </DashboardPanel>
)
