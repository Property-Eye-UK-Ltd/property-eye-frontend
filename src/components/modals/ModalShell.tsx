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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:py-8">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 flex max-h-[min(90dvh,100%)] w-full max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl",
          contentClassName
        )}
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 text-primary sm:right-6 sm:top-6"
        >
          <CloseCircle variant="TwoTone" size={24} className="text-primary sm:h-7 sm:w-7" />
        </button>
        {children}
      </div>
    </div>
  )
}
