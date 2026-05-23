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
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onCancel}
          className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:w-auto"
        >
          Close
        </button>
        <button
          onClick={onConfirm}
          className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground sm:w-auto"
        >
          Confirm
        </button>
      </div>
    </ModalShell>
  )
}

