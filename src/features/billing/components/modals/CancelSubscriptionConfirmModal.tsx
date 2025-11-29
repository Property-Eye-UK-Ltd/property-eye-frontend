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
            contentClassName="max-w-lg rounded-2xl px-2 py-12 text-center"
        >
            <h2 className="text-2xl font-medium text-primary">Cancel Subscription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                You have initiated the cancellation of your current{" "}
                <br className="hidden sm:block" />
                subscription. Are you sure you want to cancel your{" "}
                <br className="hidden sm:block" />
                subscription?
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                    onClick={onClose}
                    className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:w-auto"
                >
                    Close
                </button>
                <button
                    onClick={onConfirm}
                    className="w-full rounded-full bg-red-50 px-8 py-3 text-sm font-medium text-red-600 hover:bg-red-100 sm:w-auto"
                >
                    Cancel Subscription
                </button>
            </div>
        </ModalShell>
    )
}
