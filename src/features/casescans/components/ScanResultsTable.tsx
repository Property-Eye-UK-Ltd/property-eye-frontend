import { useState, useMemo } from "react"
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
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ScanSessionResult } from "@/types/scan-session.types"

interface ScanResultsTableProps {
  results: ScanSessionResult[]
  sessionId: string
  loading?: boolean
}

const resultStatusStyles: Record<string, string> = {
  confirmed_fraud: "bg-red-50 text-red-600 border border-red-100",
  not_fraud: "bg-green-50 text-green-600 border border-green-100",
  error: "bg-amber-50 text-amber-600 border border-amber-100",
}

const resultStatusLabel: Record<string, string> = {
  confirmed_fraud: "Confirmed Fraud",
  not_fraud: "Cleared",
  error: "Error",
}

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

export const ScanResultsTable = ({ results, sessionId, loading = false }: ScanResultsTableProps) => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<"case_id" | "scanned_at" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const itemsPerPage = 10

  const handleSort = (column: "case_id" | "scanned_at") => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedResults = useMemo(() => {
    if (!sortColumn) return results

    return [...results].sort((a, b) => {
      let aValue: any
      let bValue: any

      if (sortColumn === "case_id") {
        aValue = a.case_id
        bValue = b.case_id
      } else if (sortColumn === "scanned_at") {
        aValue = new Date(a.scanned_at).getTime()
        bValue = new Date(b.scanned_at).getTime()
      }

      const direction = sortDirection === "asc" ? 1 : -1

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction
      }
      return 0
    })
  }, [results, sortColumn, sortDirection])

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage)
  const paginatedResults = sortedResults.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const handleViewCase = (caseId: string) => {
    navigate(`/admin/cases/${encodeURIComponent(caseId)}`)
  }

  const sortBtnClass =
    "flex items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-sm"

  if (loading) {
    return (
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>Case ID</TableHead>
              <TableHead className={th}>Address</TableHead>
              <TableHead className={th}>Result</TableHead>
              <TableHead className={th}>Scan Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className={cn(td, "text-center text-muted-foreground")}>
                Loading results...
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>Case ID</TableHead>
              <TableHead className={th}>Address</TableHead>
              <TableHead className={th}>Result</TableHead>
              <TableHead className={th}>Scan Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className={cn(td, "text-center text-muted-foreground")}>
                No results found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[1000px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>
                <button
                  className={sortBtnClass}
                  onClick={() => handleSort("case_id")}
                >
                  Case ID
                  <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                </button>
              </TableHead>
              <TableHead className={th}>Address</TableHead>
              <TableHead className={th}>Result</TableHead>
              <TableHead className={th}>
                <button
                  className={sortBtnClass}
                  onClick={() => handleSort("scanned_at")}
                >
                  Scan Date
                  <ChevronsUpDown className="h-3 w-3 lg:h-4 lg:w-4" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedResults.map((result) => (
              <TableRow
                key={result.fraud_match_id}
                onClick={() => handleViewCase(result.case_id)}
                className="border-b border-border cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <TableCell className={cn(td, "text-muted-foreground font-medium")}>
                  {result.case_id}
                </TableCell>
                <TableCell className={cn(td, "text-muted-foreground")}>
                  {result.register_extract?.property_address || "—"}
                </TableCell>
                <TableCell className={td}>
                  <Badge
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      resultStatusStyles[result.verification_status]
                    )}
                  >
                    {resultStatusLabel[result.verification_status]}
                  </Badge>
                </TableCell>
                <TableCell className={cn(td, "text-muted-foreground")}>
                  {new Date(result.scanned_at).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  )
}
