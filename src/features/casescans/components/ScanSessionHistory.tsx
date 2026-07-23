import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getScanSessions } from "@/features/casescans/api/scanSessionService"
import type { ScanSession } from "@/types/scan-session.types"
import { toast } from "sonner"

interface ScanSessionHistoryProps {
  agencyId?: string
}

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-600 border border-green-100",
  running: "bg-blue-50 text-blue-600 border border-blue-100",
  failed: "bg-red-50 text-red-600 border border-red-100",
}

const statusLabel: Record<string, string> = {
  completed: "Completed",
  running: "Running",
  failed: "Failed",
}

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

export const ScanSessionHistory = ({ agencyId }: ScanSessionHistoryProps) => {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<ScanSession[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortColumn, setSortColumn] = useState<"started_at" | "total_count" | null>(
    "started_at"
  )
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true)
      try {
        const response = await getScanSessions({
          page,
          limit: 10,
          agency_id: agencyId,
        })
        setSessions(response.items)
        setTotalPages(response.pagination.total_pages)
      } catch (error) {
        toast.error("Failed to load scan sessions")
        console.error("Error fetching scan sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [page, agencyId])

  const handleSort = (column: "started_at" | "total_count") => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const handleViewSession = (sessionId: string) => {
    navigate(`/admin/case-scans/sessions/${encodeURIComponent(sessionId)}`)
  }

  const sortBtnClass =
    "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

  if (loading && sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground sm:text-sm font-medium">
            Scan Session History
          </p>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground sm:text-sm font-medium">
          Scan Session History
        </p>

        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className={th}>Session ID</TableHead>
                <TableHead className={th}>
                  <button className={sortBtnClass} onClick={() => handleSort("started_at")}>
                    Date
                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                  </button>
                </TableHead>
                <TableHead className={th}>Status</TableHead>
                <TableHead className={th}>
                  <button className={sortBtnClass} onClick={() => handleSort("total_count")}>
                    Cases Scanned
                    <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                  </button>
                </TableHead>
                <TableHead className={th}>Results</TableHead>
                <TableHead className={th}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className={cn(td, "text-center text-muted-foreground")}>
                    No scan sessions found
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="border-b border-border cursor-pointer hover:bg-slate-50/60"
                  >
                    <TableCell className={cn(td, "text-muted-foreground font-medium")}>
                      {session.id.substring(0, 12)}...
                    </TableCell>
                    <TableCell className={cn(td, "text-muted-foreground")}>
                      {new Date(session.started_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className={td}>
                      <Badge
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          statusStyles[session.status]
                        )}
                      >
                        {statusLabel[session.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn(td, "text-primary font-medium")}>
                      {session.total_count}
                    </TableCell>
                    <TableCell className={cn(td, "text-xs")}>
                      <div className="space-y-0.5">
                        <div className="text-green-600">
                          ✓ {session.confirmed_fraud_count} Fraud
                        </div>
                        <div className="text-amber-600">✓ {session.not_fraud_count} Cleared</div>
                        {session.error_count > 0 && (
                          <div className="text-red-600">✗ {session.error_count} Error</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={td}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewSession(session.id)}
                        className="text-xs text-blue-600 hover:text-blue-700 h-auto p-1"
                      >
                        View Results
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <TablePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}
