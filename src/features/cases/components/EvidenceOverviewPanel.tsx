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

export const EvidenceOverviewPanel = ({
  data,
  onUploadEvidence,
  onViewEvidence,
}: EvidenceOverviewPanelProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Evidence Overview</p>
        <button
          onClick={onUploadEvidence}
          className="text-sm font-medium text-progress transition-colors hover:underline"
        >
          Upload Evidence
        </button>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Evidence Type
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Description
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Uploaded by
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((evidence, index) => (
              <TableRow key={index} className="border-t border-border/70">
                <TableCell className="px-4 py-4 text-sm text-foreground">{evidence.evidenceType}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground/80">{evidence.description}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground/80">{evidence.uploadedBy}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-foreground/80">{evidence.date}</TableCell>
                <TableCell className="px-4 py-4 text-sm">
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

