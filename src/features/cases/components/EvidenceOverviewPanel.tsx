import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface EvidenceRecord {
  evidenceType: string
  description: string
  uploadedBy: string
  date: string
}

interface EvidenceOverviewPanelProps {
  data: EvidenceRecord[]
  onUploadEvidence?: () => void
  onViewEvidence?: (record: EvidenceRecord) => void
}

const th = "px-2 py-2 text-xs font-medium whitespace-nowrap lg:px-4 lg:py-3"
const td = "px-2 py-2 text-xs lg:px-4 lg:py-3 lg:text-sm"

export const EvidenceOverviewPanel = ({
  data,
  onUploadEvidence,
  onViewEvidence,
}: EvidenceOverviewPanelProps) => {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-3 shadow-sm sm:p-4 lg:space-y-4 lg:p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground sm:text-sm">Evidence Overview</p>
        <button
          onClick={onUploadEvidence}
          className="shrink-0 text-xs font-medium text-progress transition-colors hover:underline sm:text-sm"
        >
          Upload Evidence
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table className="min-w-[640px] text-sm">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className={th}>Evidence Type</TableHead>
              <TableHead className={th}>Description</TableHead>
              <TableHead className={th}>Uploaded by</TableHead>
              <TableHead className={th}>Date</TableHead>
              <TableHead className={th}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((evidence, index) => (
              <TableRow key={index} className="border-t border-border/70">
                <TableCell className={td}>{evidence.evidenceType}</TableCell>
                <TableCell className={td}>{evidence.description}</TableCell>
                <TableCell className={`${td} whitespace-nowrap`}>{evidence.uploadedBy}</TableCell>
                <TableCell className={`${td} whitespace-nowrap`}>{evidence.date}</TableCell>
                <TableCell className={td}>
                  <button
                    className="text-progress font-medium hover:underline"
                    onClick={() => onViewEvidence?.(evidence)}
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
