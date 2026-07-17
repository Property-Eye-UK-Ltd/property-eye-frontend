import { FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ResolveDisputeModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (note?: string) => void
}

export const ResolveDisputeModal = ({ open, onClose, onSubmit }: ResolveDisputeModalProps) => {
    const [note, setNote] = useState("")

    useEffect(() => {
        if (!open) setNote("")
    }, [open])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(note.trim() || undefined)
    }

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-lg rounded-2xl bg-white p-0 sm:rounded-3xl"
        >
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="px-4 py-4 pr-12 sm:px-6 sm:py-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Resolve Agency Dispute</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Confirm you've followed up with the agency directly. You can optionally log what was discussed —
                        this note is internal only and is never shown to the agency.
                    </p>

                    <div className="mt-6 space-y-2">
                        <Label>Resolution Note (optional)</Label>
                        <Textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="What was discussed with the agency..."
                            className="min-h-[100px] rounded-2xl border-border"
                        />
                    </div>
                </div>

                <div className="flex gap-2 border-t border-border px-4 py-4 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-foreground"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                    >
                        Resolve Dispute
                    </button>
                </div>
            </form>
        </ModalShell>
    )
}
