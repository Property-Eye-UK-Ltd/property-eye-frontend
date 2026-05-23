import { FormEvent, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface RoleOverrideModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (role: string, reason: string, description: string) => void
}

const roles = ["Admin", "Agent", "Viewer"]
const reasons = ["Change of Duties", "Promotion", "Demotion", "Correction", "Other"]

export const RoleOverrideModal = ({ open, onClose, onConfirm }: RoleOverrideModalProps) => {
    const [role, setRole] = useState("")
    const [reason, setReason] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (role && reason && description) {
            onConfirm(role, reason, description)
            setRole("")
            setReason("")
            setDescription("")
        }
    }

    const handleClose = () => {
        setRole("")
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
                    <h2 className="text-xl font-medium text-foreground sm:text-2xl">Role Override</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Make update to the current role a user is assigned to.</p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Select New Role</label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Reason for Role Change</label>
                                <Select value={reason} onValueChange={setReason}>
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reasons.map((r) => (
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
                                    placeholder="The user..."
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
                            disabled={!role || !reason || !description}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-white disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Update Role
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
