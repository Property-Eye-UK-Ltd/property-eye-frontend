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
        <ModalShell open={open} onClose={handleClose} contentClassName="max-w-2xl rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl">
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl"
            >
                <div className="shrink-0 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-medium text-foreground sm:text-2xl">Suspend Staff</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Enter the reason for suspending staff</p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
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

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                    <div className="flex flex-row gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!reason || !description}
                            className="min-w-0 flex-1 rounded-full bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600 disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Suspend
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
