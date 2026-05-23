import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CaseRecord } from "@/data/caseManagementData"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

interface CaseListPanelProps {
  data: CaseRecord[]
}

export const CaseListPanel = ({ data }: CaseListPanelProps) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const sortedCases = useMemo(() => [...data], [data])

  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedCases.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedCases, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage) || 1

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  return (
    <DashboardPanel
      title="Case List"
      description="Monitor property withdrawals and sales verified via Price Paid Dataset."
      className="overflow-hidden"
      noPadding
      hasBorder
    >
      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>Case ID</TableHead>
              <TableHead className={th}>Property Address</TableHead>
              <TableHead className={th}>Completion Date</TableHead>
              <TableHead className={th}>Buyer Name</TableHead>
              <TableHead className={cn(th, "text-center")}>Status</TableHead>
              <TableHead className={cn(th, "text-right")}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCases.map((caseRecord, index) => (
              <TableRow key={`${caseRecord.caseId}-${index}`} className="border-b border-border">
                <TableCell className={cn(td, "text-muted-foreground")}>{caseRecord.caseId}</TableCell>
                <TableCell className={cn(td, "max-w-[140px] truncate text-foreground sm:max-w-none sm:whitespace-normal")}>
                  {caseRecord.propertyAddress}
                </TableCell>
                <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>{caseRecord.completionDate}</TableCell>
                <TableCell className={cn(td, "font-medium text-foreground")}>{caseRecord.buyerName}</TableCell>
                <TableCell className={cn(td, "text-center")}>
                  <Badge
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1",
                      caseRecord.status === "Checked"
                        ? "border border-green-100 bg-green-50 text-green-600"
                        : "border border-amber-100 bg-amber-50 text-amber-600"
                    )}
                  >
                    {caseRecord.status}
                  </Badge>
                </TableCell>
                <TableCell className={cn(td, "text-right")}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/dashboard/cases/${encodeURIComponent(caseRecord.caseId.replace("#", ""))}`
                      )
                    }
                    className="text-xs font-medium transition-colors hover:underline lg:text-sm"
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
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </DashboardPanel>
  )
}
