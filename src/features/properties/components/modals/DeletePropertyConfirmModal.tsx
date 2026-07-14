import { ModalShell } from "@/components/modals/ModalShell"
import { PropertyListing } from "@/types/properties.types"

interface DeletePropertyConfirmModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    listing: PropertyListing | null
    isSubmitting?: boolean
}

export const DeletePropertyConfirmModal = ({
    open,
    onClose,
    onConfirm,
    listing,
    isSubmitting = false,
}: DeletePropertyConfirmModalProps) => {
    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-lg rounded-2xl px-4 py-8 text-center sm:px-6 sm:py-12"
        >
            <h2 className="pr-8 text-xl font-medium text-primary sm:pr-0 sm:text-2xl">Delete Property</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                This will permanently remove{" "}
                <span className="font-medium text-foreground">{listing?.address}</span> from your
                fraud monitoring list. This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-row gap-2 sm:mt-8 sm:gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                >
                    Close
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isSubmitting}
                    className="min-w-0 flex-1 rounded-full bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                >
                    {isSubmitting ? "Deleting..." : "Delete Property"}
                </button>
            </div>
        </ModalShell>
    )
}
