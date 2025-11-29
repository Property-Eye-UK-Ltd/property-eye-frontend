import { ReactNode } from "react"
import { CloseCircle } from "iconsax-react"
import { cn } from "@/lib/utils"

interface ModalShellProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  contentClassName?: string
}

export const ModalShell = ({
  open,
  onClose,
  children,
  contentClassName,
}: ModalShellProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-3xl bg-white shadow-2xl",
          contentClassName
        )}
      >
        <button
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-6 top-6 text-primary z-20"
        >
          <CloseCircle variant="TwoTone" size={28} className="text-primary" />
        </button>
        {children}
      </div>
    </div>
  )
}
