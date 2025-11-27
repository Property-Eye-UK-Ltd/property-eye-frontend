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
      contentClassName="max-w-lg rounded-2xl px-2 py-12 text-center"
    >
      <h2 className="text-2xl font-medium text-primary">Close Case</h2>
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

