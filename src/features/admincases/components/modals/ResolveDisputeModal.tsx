import { FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AdminCaseStatus } from "@/data/agencyCasesData"

interface ResolveDisputeModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (newStatus: AdminCaseStatus, note?: string) => void
}

export const ResolveDisputeModal = ({ open, onClose, onSubmit }: ResolveDisputeModalProps) => {
    const [note, setNote] = useState("")
    const [newStatus, setNewStatus] = useState<AdminCaseStatus>("Closed")

    useEffect(() => {
        if (!open) {
            setNote("")
            setNewStatus("Closed")
        }
    }, [open])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(newStatus, note.trim() || undefined)
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
                        Confirm you've followed up with the agency directly. You must explicitly select the new status for the case.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label>New Case Status</Label>
                            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as AdminCaseStatus)}>
                                <SelectTrigger className="w-full rounded-2xl border-border bg-white">
                                    <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="Under Legal Review">Under Legal Review</SelectItem>
                                    <SelectItem value="Flagged">Flagged</SelectItem>
                                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                    <SelectItem value="Disputed">Disputed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Resolution Note (optional)</Label>
                            <Textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="What was discussed with the agency..."
                                className="min-h-[100px] rounded-2xl border-border"
                            />
                        </div>
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
