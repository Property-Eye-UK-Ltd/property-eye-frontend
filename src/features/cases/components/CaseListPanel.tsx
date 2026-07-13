import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SearchNormal } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CaseRecord } from "@/data/caseManagementData"
import { AgencyFacingCaseStatus } from "@/data/agencyCasesData"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const caseStatusStyles: Record<AgencyFacingCaseStatus, string> = {
    Open: "bg-blue-50 text-blue-600 border border-blue-100",
    "Closed (Confirmed Fraud)": "bg-red-50 text-red-600 border border-red-100",
    "Closed (Not Fraud)": "bg-green-50 text-green-600 border border-green-100",
}

interface CaseListPanelProps {
  data: CaseRecord[]
}

export const CaseListPanel = ({ data }: CaseListPanelProps) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 10

  const filteredCases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return data
    return data.filter(
      (c) =>
        c.caseId.toLowerCase().includes(q) ||
        c.propertyAddress.toLowerCase().includes(q) ||
        c.buyerName.toLowerCase().includes(q) ||
        c.caseStatus.toLowerCase().includes(q)
    )
  }, [data, searchQuery])

  const sortedCases = useMemo(() => [...filteredCases], [filteredCases])

  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedCases.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedCases, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedCases.length / itemsPerPage) || 1

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  return (
    <DashboardPanel
      title="Case List"
      description="Monitor case status and outcomes for your agency."
      className="overflow-hidden"
      noPadding
      hasBorder
      actions={
        <div className="relative w-full min-w-[9rem] sm:w-44 lg:w-52">
          <SearchNormal
            size={16}
            variant="Outline"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Case, address, buyer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 rounded-full border-border bg-background pl-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 lg:h-9 lg:pl-10 lg:text-sm"
          />
        </div>
      }
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
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1", caseStatusStyles[caseRecord.caseStatus])}>
                      {caseRecord.caseStatus}
                    </Badge>
                    {caseRecord.agencyDispute === "Open" && (
                      <Badge className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 lg:px-3 lg:py-1">
                        Dispute Open
                      </Badge>
                    )}
                    {caseRecord.agencyDispute === "Resolved" && (
                      <Badge className="rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-600 lg:px-3 lg:py-1">
                        Dispute Resolved
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className={cn(td, "text-right")}>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/dashboard/cases/${encodeURIComponent(caseRecord.caseId.replace("#", ""))}`,
                        { state: { caseRecord } }
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
