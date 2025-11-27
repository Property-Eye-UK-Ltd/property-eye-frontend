import { CloseCircle } from "iconsax-react"
import { ModalShell } from "@/components/modals/ModalShell"

interface EvidenceUploadFailureModalProps {
  open: boolean
  onCancel: () => void
  onRetry: () => void
}

export const EvidenceUploadFailureModal = ({
  open,
  onCancel,
  onRetry,
}: EvidenceUploadFailureModalProps) => {
  return (
    <ModalShell
      open={open}
      onClose={onCancel}
      contentClassName="max-w-md rounded-3xl bg-white px-10 py-12 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-error/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/20">
            <CloseCircle size={52} variant="Bold" className="text-error" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium text-foreground">Evidence Upload Failed</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            An error occurred while uploading evidence.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={onCancel}
            className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:flex-1"
          >
            Cancel
          </button>
          <button
            onClick={onRetry}
            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground sm:flex-1"
          >
            Try Again
          </button>
        </div>
      </div>
    </ModalShell>
  )
}

