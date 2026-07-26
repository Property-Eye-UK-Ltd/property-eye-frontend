import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HomeTrendUp } from "iconsax-react"
import { TopAgency } from "@/data/reportsData"

interface TopAgenciesTableProps {
    data: TopAgency[]
}

export const TopAgenciesTable = ({ data }: TopAgenciesTableProps) => {
    return (
        <DashboardPanel
            title="Top Checks-Consuming Agencies"
            icon={<HomeTrendUp size={20} variant="TwoTone" className="text-muted-foreground" />}
            className="lg:col-span-3"
            hasBorder
            noPadding
        >
            <div className="overflow-hidden rounded-xl">
                <Table className="text-sm">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">Name</TableHead>
                            <TableHead className="px-4 py-3 text-right text-xs font-medium tracking-wide text-muted-foreground">
                                Total Checks
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((agency, index) => (
                            <TableRow key={index} className="border-t border-border/70">
                                <TableCell className="px-4 py-4 text-sm text-foreground">{agency.name}</TableCell>
                                <TableCell className="px-4 py-4 text-right text-sm text-foreground/80">{agency.totalChecks.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardPanel>
    )
}
