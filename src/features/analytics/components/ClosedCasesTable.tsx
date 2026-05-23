import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { closedCasesData } from "@/data/analytics-data"

export const ClosedCasesTable = () => (
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[640px]">
            <TableHeader>
                <TableRow className="bg-gray-50">
                    <TableHead className="px-4 py-3 font-medium lg:px-6">Case ID</TableHead>
                    <TableHead className="px-4 py-3 font-medium lg:px-6">Property Address</TableHead>
                    <TableHead className="px-4 py-3 font-medium lg:px-6">Closed By</TableHead>
                    <TableHead className="px-4 py-3 font-medium lg:px-6">Closed Date</TableHead>
                    <TableHead className="px-4 py-3 text-right font-medium lg:px-6">Reason</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {closedCasesData.map((item) => (
                    <TableRow key={item.id} className="border-b border-border">
                        <TableCell className="px-4 py-3 text-sm text-muted-foreground lg:px-6 lg:py-4">{item.id}</TableCell>
                        <TableCell className="px-4 py-3 text-sm text-foreground lg:px-6 lg:py-4">{item.address}</TableCell>
                        <TableCell className="px-4 py-3 text-sm font-medium text-foreground lg:px-6 lg:py-4">{item.closedBy}</TableCell>
                        <TableCell className="px-4 py-3 text-sm text-muted-foreground lg:px-6 lg:py-4">{item.closedDate}</TableCell>
                        <TableCell className="px-4 py-3 text-right text-sm text-muted-foreground lg:px-6 lg:py-4">{item.reason}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)
