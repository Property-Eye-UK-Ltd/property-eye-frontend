import { FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ReturnCaseModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (note: string) => void
}

export const ReturnCaseModal = ({ open, onClose, onSubmit }: ReturnCaseModalProps) => {
    const [note, setNote] = useState("")

    useEffect(() => {
        if (!open) setNote("")
    }, [open])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!note.trim()) return
        onSubmit(note.trim())
    }

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-lg rounded-2xl bg-white p-0 sm:rounded-3xl"
        >
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="px-4 py-4 pr-12 sm:px-6 sm:py-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Return Case</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Return the case to legal review with a note. The submitter can revise the determination.
                    </p>

                    <div className="mt-6 space-y-2">
                        <Label>Return Note</Label>
                        <Textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Explain what needs to be revised..."
                            className="min-h-[120px] rounded-2xl border-border"
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
                        disabled={!note.trim()}
                        className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
                    >
                        Return to Review
                    </button>
                </div>
            </form>
        </ModalShell>
    )
}
