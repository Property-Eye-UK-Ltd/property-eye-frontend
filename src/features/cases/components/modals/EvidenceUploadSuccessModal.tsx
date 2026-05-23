import { TickCircle } from "iconsax-react"
import { ModalShell } from "@/components/modals/ModalShell"

interface EvidenceUploadSuccessModalProps {
  open: boolean
  onDone: () => void
}

export const EvidenceUploadSuccessModal = ({
  open,
  onDone,
}: EvidenceUploadSuccessModalProps) => {
  return (
    <ModalShell
      open={open}
      onClose={onDone}
      contentClassName="max-w-md rounded-2xl bg-white px-6 py-8 text-center sm:rounded-3xl sm:px-10 sm:py-12"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 sm:h-24 sm:w-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 sm:h-20 sm:w-20">
            <TickCircle size={40} variant="Bold" className="text-success sm:h-[52px] sm:w-[52px]" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">Evidence Upload Successful</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A new evidence has been added to the case details.
          </p>
        </div>
        <button
          onClick={onDone}
          className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground"
        >
          Done
        </button>
      </div>
    </ModalShell>
  )
}

