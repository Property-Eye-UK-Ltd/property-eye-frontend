import { FormEvent, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SuspendStaffModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (reason: string, description: string) => void
    staffName?: string
}

const suspensionReasons = [
    "Policy Violation",
    "Inactivity",
    "Security Concerns",
    "Performance Issues",
    "Other",
]

export const SuspendStaffModal = ({ open, onClose, onConfirm, staffName }: SuspendStaffModalProps) => {
    const [reason, setReason] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (reason && description) {
            onConfirm(reason, description)
            // Reset form
            setReason("")
            setDescription("")
        }
    }

    const handleClose = () => {
        setReason("")
        setDescription("")
        onClose()
    }

    return (
        <ModalShell open={open} onClose={handleClose} contentClassName="max-w-2xl rounded-3xl bg-white pb-0 pt-0">
            <form onSubmit={handleSubmit} className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white">
                <div className="shrink-0 bg-white px-6 py-6 text-left">
                    <h2 className="text-2xl font-semibold text-foreground">Suspend Staff</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Enter the reason for suspending staff</p>
                </div>

                <div className="scrollbar-super-thin overflow-y-auto bg-muted px-6 py-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Reason for suspension</label>
                                <Select value={reason} onValueChange={setReason}>
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {suspensionReasons.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Description</label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Please provide details about the suspension reason..."
                                    className="min-h-32 rounded-xl border border-border bg-transparent px-4 py-3 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-8 py-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!reason || !description}
                            className="w-full rounded-full bg-red-50 px-8 py-3 text-sm font-medium text-red-600 disabled:opacity-60 sm:flex-1"
                        >
                            Suspend
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
