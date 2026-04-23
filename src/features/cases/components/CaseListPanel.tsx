import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "iconsax-react"
import { CaseRecord } from "@/data/caseManagementData"

interface CaseListPanelProps {
  data: CaseRecord[]
}

export const CaseListPanel = ({
  data,
}: CaseListPanelProps) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const sortedCases = useMemo(() => {
    return [...data]
  }, [data])

  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedCases.slice(startIndex, endIndex)
  }, [sortedCases, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  const generatePagination = () => {
    const pages: (number | "ellipsis")[] = []
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("ellipsis")
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
      } else if (currentPage >= totalPages - 2) {
        for (let i = 1; i <= 3; i++) pages.push(i)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }
    return pages
  }

  const paginationItems = generatePagination()

  return (
    <DashboardPanel
      title="Case List"
      description="Monitor property withdrawals and sales verified via Price Paid Dataset."
      className="overflow-hidden"
      noPadding
      hasBorder
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 font-medium">Case ID</TableHead>
              <TableHead className="px-4 font-medium">Property Address</TableHead>
              <TableHead className="px-4 font-medium">Completion Date</TableHead>
              <TableHead className="px-4 font-medium">Buyer Name</TableHead>
              <TableHead className="px-4 font-medium text-center">Status</TableHead>
              <TableHead className="px-4 font-medium text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCases.map((caseRecord, index) => (
              <TableRow
                key={`${caseRecord.caseId}-${index}`}
                className="border-b border-border"
              >
                <TableCell className="px-4 py-3 font-normal text-muted-foreground">{caseRecord.caseId}</TableCell>
                <TableCell className="px-4 py-3 font-normal text-foreground">{caseRecord.propertyAddress}</TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">{caseRecord.completionDate}</TableCell>
                <TableCell className="px-4 py-3 text-foreground font-medium">{caseRecord.buyerName}</TableCell>
                <TableCell className="px-4 py-4 text-center">
                  <Badge className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-medium",
                    caseRecord.status === "Checked" 
                      ? "bg-green-50 text-green-600 border border-green-100" 
                      : "bg-amber-50 text-amber-600 border border-amber-100"
                  )}>
                    {caseRecord.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <button
                    onClick={() => navigate(`/dashboard/cases/${encodeURIComponent(caseRecord.caseId.replace("#", ""))}`)}
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
        <div className="flex flex-col gap-4 border-t border-border px-4 py-4 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {paginationItems.map((item, idx) =>
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
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} variant="Outline" className="text-primary" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
