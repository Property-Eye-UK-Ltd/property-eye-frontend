import { ModalShell } from "@/components/modals/ModalShell"

interface CancelSubscriptionConfirmModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export const CancelSubscriptionConfirmModal = ({
    open,
    onClose,
    onConfirm,
}: CancelSubscriptionConfirmModalProps) => {
    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-lg rounded-2xl px-4 py-8 text-center sm:px-6 sm:py-12"
        >
            <h2 className="pr-8 text-xl font-medium text-primary sm:pr-0 sm:text-2xl">Cancel Subscription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                You have initiated the cancellation of your current{" "}
                <br className="hidden sm:block" />
                subscription. Are you sure you want to cancel your{" "}
                <br className="hidden sm:block" />
                subscription?
            </p>
            <div className="mt-6 flex flex-row gap-2 sm:mt-8 sm:gap-3">
                <button
                    onClick={onClose}
                    className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                >
                    Close
                </button>
                <button
                    onClick={onConfirm}
                    className="min-w-0 flex-1 rounded-full bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600 hover:bg-red-100 sm:px-8 sm:py-3 sm:text-sm"
                >
                    Cancel Subscription
                </button>
            </div>
        </ModalShell>
    )
}
