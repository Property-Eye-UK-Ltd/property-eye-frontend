import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export interface EvidenceRecord {
  evidenceType: string
  description: string
  uploadedBy: string
  date: string
}

interface EvidenceOverviewPanelProps {
  data: EvidenceRecord[]
  onUploadEvidence?: () => void
}

export const EvidenceOverviewPanel = ({
  data,
  onUploadEvidence,
}: EvidenceOverviewPanelProps) => {
  return (
    <DashboardPanel
      title="Evidence Overview"
      hasBorder
      actions={
        <button
          onClick={onUploadEvidence}
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "var(--progress)" }}
        >
          Upload Evidence
        </button>
      }
      noPadding
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-4 font-medium">Evidence Type</TableHead>
              <TableHead className="px-4 font-medium">Description</TableHead>
              <TableHead className="px-4 font-medium">Uploaded by</TableHead>
              <TableHead className="px-4 font-medium">Date</TableHead>
              <TableHead className="px-4 font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((evidence, index) => (
              <TableRow key={index} className="border-b border-border">
                <TableCell className="px-4 py-3 font-normal">{evidence.evidenceType}</TableCell>
                <TableCell className="px-4 py-3 font-normal">{evidence.description}</TableCell>
                <TableCell className="px-4 py-3 font-normal">{evidence.uploadedBy}</TableCell>
                <TableCell className="px-4 py-3 font-normal">{evidence.date}</TableCell>
                <TableCell className="px-4 py-3">
                  <button
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

