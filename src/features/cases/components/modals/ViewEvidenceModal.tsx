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
      contentClassName="max-w-md rounded-2xl bg-white pb-0 pt-0"
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
        <div className="bg-white px-4 py-4 pr-12 text-left sm:pr-6">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">View Evidence</h2>
          <p className="text-xs text-muted-foreground">
            See the details of the evidence that was uploaded.
          </p>
        </div>

        <div className="bg-muted px-4 py-4 sm:px-8 sm:py-6">
          <div className="rounded-md border border-border/60 bg-white p-3 sm:p-4">
            <div className="aspect-[3/4] rounded-sm bg-muted" />
          </div>
        </div>

        <div className="bg-white px-4 py-4 sm:px-8 sm:py-6">
          <div className="flex flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground sm:px-8 sm:py-3 sm:text-sm"
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

