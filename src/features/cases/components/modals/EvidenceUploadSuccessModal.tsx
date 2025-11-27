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
      contentClassName="max-w-md rounded-3xl bg-white px-10 py-12 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
            <TickCircle size={52} variant="Bold" className="text-success" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-medium text-foreground">Evidence Upload Successful</h2>
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

