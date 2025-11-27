import { ModalShell } from "@/components/modals/ModalShell"
import { EvidenceRecord } from "../EvidenceOverviewPanel"

interface ViewEvidenceModalProps {
  open: boolean
  evidence?: EvidenceRecord | null
  onClose: () => void
  onDownload?: (evidence: EvidenceRecord) => void
}

export const ViewEvidenceModal = ({
  open,
  evidence,
  onClose,
  onDownload,
}: ViewEvidenceModalProps) => {
  const handleDownload = () => {
    if (evidence && onDownload) {
      onDownload(evidence)
    }
  }

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      contentClassName="max-w-md rounded-xl bg-white pb-0 pt-0"
    >
      <div className="flex flex-col overflow-hidden rounded-3xl bg-white">
        <div className="bg-white px-4 py-4 text-left">
          <h2 className="text-lg font-semibold text-foreground">View Evidence</h2>
          <p className="text-xs text-muted-foreground">
            See the details of the evidence that was uploaded.
          </p>
        </div>

        <div className="bg-muted px-8 py-6">
          <div className="rounded-md border border-border/60 bg-white p-4">
            <div className="aspect-[3/4] rounded-sm bg-muted" />
          </div>
        </div>

        <div className="bg-white px-8 py-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground whitespace-nowrap sm:flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground whitespace-nowrap sm:flex-1"
              disabled={!evidence}
            >
              Download Evidence
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

