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
        <ModalShell open={open} onClose={handleClose} contentClassName="max-w-2xl rounded-3xl bg-white pb-0 pt-0">
            <form onSubmit={handleSubmit} className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white">
                <div className="shrink-0 bg-white px-6 py-6 text-left">
                    <h2 className="text-2xl font-medium text-foreground">Role Override</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Make update to the current role a user is assigned to.</p>
                </div>

                <div className="scrollbar-super-thin overflow-y-auto bg-muted px-6 py-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
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
                            disabled={!role || !reason || !description}
                            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-white disabled:opacity-60 sm:flex-1"
                        >
                            Update Role
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
