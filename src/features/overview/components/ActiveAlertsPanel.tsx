import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { MatchConfidenceMeter } from "@/components/dashboard/MatchConfidenceMeter"

export interface AlertRecord {
  id?: string
  caseId?: string
  property: string
  fraudScore: number
  severity: "Critical" | "High" | "Medium" | "Low"
  dateDetected: string
}

interface ActiveAlertsPanelProps {
  data: AlertRecord[]
  severityStyles: Record<AlertRecord["severity"], string>
}

export const ActiveAlertsPanel = ({
  data,
  severityStyles,
}: ActiveAlertsPanelProps) => {
  const navigate = useNavigate()
  const [sortColumn, setSortColumn] = useState<"severity" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

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
      return (severityWeight[a.severity] - severityWeight[b.severity]) * direction
    })
  }, [data, sortColumn, sortDirection, severityWeight])

  const handleSort = (column: "severity") => {
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
      description="Tracks recent high-priority alerts based on timing risk and match confidence."
      className="overflow-hidden"
      noPadding
      hasBorder
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 font-medium">Property</TableHead>
              <TableHead className="px-4 font-medium">
                Match Confidence
              </TableHead>
              <TableHead className="px-4 font-medium">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => handleSort("severity")}
                >
                  Timing Risk
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
                <TableCell className="px-4 py-3">
                  <MatchConfidenceMeter value={alert.fraudScore} variant="compact" />
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Badge className={cn("rounded-full px-3 py-1 text-xs font-medium", severityStyles[alert.severity])}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3">{alert.dateDetected}</TableCell>
                <TableCell className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/dashboard/cases/${encodeURIComponent(alert.caseId || "")}`, {
                      state: {
                        returnPath: "/dashboard",
                        returnLabel: "Overview"
                      }
                    })}
                    className="text-sm font-medium transition-colors hover:underline"
                    style={{ color: "var(--progress)" }}
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardPanel>
  )
}

