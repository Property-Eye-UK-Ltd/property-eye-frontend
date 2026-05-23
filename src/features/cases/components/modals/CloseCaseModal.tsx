import { ModalShell } from "@/components/modals/ModalShell"

interface CloseCaseModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const CloseCaseModal = ({ open, onCancel, onConfirm }: CloseCaseModalProps) => {
  return (
    <ModalShell
      open={open}
      onClose={onCancel}
      contentClassName="max-w-lg rounded-2xl px-4 py-8 text-center sm:px-6 sm:py-12"
    >
      <h2 className="pr-8 text-xl font-medium text-primary sm:pr-0 sm:text-2xl">Close Case</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You have initiated to close the case. Are you sure you{" "}
        <br className="hidden sm:block" /> want to close the case?
      </p>
      <div className="mt-6 flex flex-row gap-2 sm:mt-8 sm:gap-3">
        <button
          onClick={onCancel}
          className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
        >
          Close
        </button>
        <button
          onClick={onConfirm}
          className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground sm:px-8 sm:py-3 sm:text-sm"
        >
          Confirm
        </button>
      </div>
    </ModalShell>
  )
}

