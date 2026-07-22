import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ModalShell } from "@/components/modals/ModalShell"
import { subscriptionGateEvents } from "@/lib/subscriptionGateEvents"

export const SubscribeGateModal = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => subscriptionGateEvents.subscribe(() => setOpen(true)), [])

    const handleSubscribe = () => {
        setOpen(false)
        navigate("/dashboard/billing")
    }

    return (
        <ModalShell
            open={open}
            onClose={() => setOpen(false)}
            contentClassName="max-w-lg rounded-2xl px-4 py-8 text-center sm:px-6 sm:py-12"
        >
            <h2 className="pr-8 text-xl font-medium text-primary sm:pr-0 sm:text-2xl">
                Subscribe to continue
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                This action requires an active subscription. Subscribe to unlock full
                access to Property Eye.
            </p>
            <div className="mt-6 flex flex-row gap-2 sm:mt-8 sm:gap-3">
                <button
                    onClick={() => setOpen(false)}
                    className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubscribe}
                    className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 sm:px-8 sm:py-3 sm:text-sm"
                >
                    Subscribe now
                </button>
            </div>
        </ModalShell>
    )
}
