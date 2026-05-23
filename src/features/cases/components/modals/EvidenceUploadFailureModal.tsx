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
      contentClassName="max-w-md rounded-2xl bg-white px-6 py-8 text-center sm:rounded-3xl sm:px-10 sm:py-12"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 sm:h-24 sm:w-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/20 sm:h-20 sm:w-20">
            <CloseCircle size={40} variant="Bold" className="text-error sm:h-[52px] sm:w-[52px]" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">Evidence Upload Failed</h2>
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

