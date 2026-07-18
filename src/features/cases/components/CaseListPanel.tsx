import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchNormal } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { TablePagination } from "@/components/dashboard/TablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCases } from "@/features/cases/api/useCases"
import type { AgencyCaseStatus } from "@/features/cases/api/casesService"

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3 lg:text-sm"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

const caseStatusLabels: Record<AgencyCaseStatus, string> = {
  open: "Open",
  closed_confirmed_fraud: "Closed (Confirmed Fraud)",
  closed_not_fraudulent: "Closed (Not Fraud)",
}

const caseStatusStyles: Record<AgencyCaseStatus, string> = {
  open: "bg-blue-50 text-blue-600 border border-blue-100",
  closed_confirmed_fraud: "bg-red-50 text-red-600 border border-red-100",
  closed_not_fraudulent: "bg-green-50 text-green-600 border border-green-100",
}

const ITEMS_PER_PAGE = 10

export const CaseListPanel = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useCases({
    page: currentPage,
    page_size: ITEMS_PER_PAGE,
    sort_by: "created_at",
    sort_dir: "desc",
  })

  const items = data?.items ?? []
  const q = searchQuery.toLowerCase().trim()
  const filteredCases = q
    ? items.filter(
        (c) =>
          c.case_id.toLowerCase().includes(q) ||
          c.property_address.toLowerCase().includes(q) ||
          (c.buyer_name ?? "").toLowerCase().includes(q)
      )
    : items

  const totalPages = Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE) || 1

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
        <Table className="min-w-[560px]">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>Case ID</TableHead>
              <TableHead className={th}>Property Address</TableHead>
              <TableHead className={th}>Completion Date</TableHead>
              <TableHead className={th}>Buyer Name</TableHead>
              <TableHead className={cn(th, "text-center")}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Loading cases...
                </TableCell>
              </TableRow>
            ) : filteredCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No cases found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCases.map((caseRecord) => (
                <TableRow
                  key={caseRecord.case_id}
                  onClick={() => navigate(`/dashboard/cases/${encodeURIComponent(caseRecord.case_id)}`)}
                  className="border-b border-border cursor-pointer hover:bg-slate-50/60"
                >
                  <TableCell className={cn(td, "text-muted-foreground")}>{caseRecord.case_id}</TableCell>
                  <TableCell className={cn(td, "max-w-[140px] truncate text-foreground sm:max-w-none sm:whitespace-normal")}>
                    {caseRecord.property_address}
                  </TableCell>
                  <TableCell className={cn(td, "whitespace-nowrap text-muted-foreground")}>
                    {caseRecord.completion_date ? new Date(caseRecord.completion_date).toLocaleDateString("en-GB") : "-"}
                  </TableCell>
                  <TableCell className={cn(td, "font-medium text-foreground")}>{caseRecord.buyer_name ?? "-"}</TableCell>
                  <TableCell className={cn(td, "text-center")}>
                    <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium lg:px-3 lg:py-1", caseStatusStyles[caseRecord.status])}>
                      {caseStatusLabels[caseRecord.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
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
