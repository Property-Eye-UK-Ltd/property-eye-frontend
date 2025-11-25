import { useMemo, useState } from "react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { ChevronsUpDown } from "lucide-react"

export interface AlertRecord {
  property: string
  fraudScore: number
  type: string
  severity: "Critical" | "High" | "Medium" | "Low"
  dateDetected: string
}

interface ActiveAlertsPanelProps {
  data: AlertRecord[]
  severityStyles: Record<AlertRecord["severity"], string>
  pagination?: (number | "ellipsis")[]
}

export const ActiveAlertsPanel = ({
  data,
  severityStyles,
  pagination = [1, 2, 3, "ellipsis", 8, 9, 10],
}: ActiveAlertsPanelProps) => {
  const [sortColumn, setSortColumn] = useState<"type" | "severity" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const severityWeight: Record<AlertRecord["severity"], number> = {
    Critical: 3,
    High: 2,
    Medium: 1,
    Low: 0,
  }

  const sortedAlerts = useMemo(() => {
    if (!sortColumn) return data
    const direction = sortDirection === "asc" ? 1 : -1

    return [...data].sort((a, b) => {
      if (sortColumn === "type") {
        return a.type.localeCompare(b.type) * direction
      }
      return (severityWeight[a.severity] - severityWeight[b.severity]) * direction
    })
  }, [data, sortColumn, sortDirection, severityWeight])

  const handleSort = (column: "type" | "severity") => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <DashboardPanel
      title="Active Alerts table"
      description="Tracks recent high-priority alerts based on severity and fraud score."
      className="overflow-hidden"
      noPadding
      hasBorder
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 font-medium">Property</TableHead>
              <TableHead className="px-4 font-medium">Fraud Score</TableHead>
              <TableHead className="px-4 font-semibold">
                <button
                  className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => handleSort("type")}
                >
                  Type
                  <ChevronsUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4 font-semibold">
                <button
                  className="flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => handleSort("severity")}
                >
                  Severity
                  <ChevronsUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="px-4 font-medium">Date Detected</TableHead>
              <TableHead className="px-4 font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAlerts.map((alert, index) => (
              <TableRow
                key={`${alert.property}-${alert.dateDetected}-${index}`}
                className="border-b border-border"
              >
                <TableCell className="px-4 py-3 font-normal">{alert.property}</TableCell>
                <TableCell className="px-4 py-3">{alert.fraudScore}%</TableCell>
                <TableCell className="px-4 py-3">{alert.type}</TableCell>
                <TableCell className="px-4 py-4">
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", severityStyles[alert.severity])}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3">{alert.dateDetected}</TableCell>
                <TableCell className="px-4 py-3">
                  <button className="text-sm font-medium transition-colors hover:underline" style={{ color: "var(--progress)" }}>
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-4 border-t border-border px-4 py-4 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {pagination.map((item, idx) =>
              item === "ellipsis" ? (
                <div key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary text-primary">
                  ...
                </div>
              ) : (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item)}
                  className={cn(
                    "h-9 w-9 rounded-full border border-primary text-sm font-medium transition-colors",
                    currentPage === item ? "bg-primary text-secondary" : "text-primary"
                  )}
                >
                  {item}
                </button>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary"
            >
              <ArrowLeft size={16} variant="Outline" className="text-primary" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(10, prev + 1))}
              className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary"
            >
              Next
              <ArrowRight size={16} variant="Outline" className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </DashboardPanel>
  )
}

