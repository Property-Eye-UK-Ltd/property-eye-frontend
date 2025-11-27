import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Profile2User } from "iconsax-react"

export interface RepeatOffender {
    name: string
    location: string
    offenses: number
}

interface RepeatOffendersPanelProps {
    offenders: RepeatOffender[]
    title?: string
    icon?: React.ReactNode
}

export const RepeatOffendersPanel = ({
    offenders,
    title = "Repeat Offenders (Owners)",
    icon = <Profile2User size={16} variant="TwoTone" className="text-muted-foreground" />
}: RepeatOffendersPanelProps) => (
    <DashboardPanel
        title={title}
        icon={icon}
        className="overflow-hidden lg:col-span-3"
        noPadding
        hasBorder
    >
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="px-4 font-normal">Name</TableHead>
                    <TableHead className="px-4 font-normal">Location</TableHead>
                    <TableHead className="px-4 font-normal text-right">Offense Counter</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {offenders.map((row) => (
                    <TableRow key={`${row.name}-${row.location}`} className="border-b border-border">
                        <TableCell className="px-4 py-3 font-normal">{row.name}</TableCell>
                        <TableCell className="px-4 py-3">{row.location}</TableCell>
                        <TableCell className="px-4 py-3 text-right font-normal">{row.offenses}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </DashboardPanel>
)