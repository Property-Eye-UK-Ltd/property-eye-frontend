import { FormEvent, useState, useEffect } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditRoleModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (name: string, email: string, role: string) => void
    staffData?: {
        name: string
        email: string
        role: string
    }
}

const staffRoles = ["Admin", "Analyst", "Viewer", "Managed"]

export const EditRoleModal = ({ open, onClose, onConfirm, staffData }: EditRoleModalProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        if (open && staffData) {
            setName(staffData.name)
            setEmail(staffData.email)
            setRole(staffData.role)
        }
    }, [open, staffData])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (name && email && role) {
            onConfirm(name, email, role)
        }
    }

    const handleClose = () => {
        setName("")
        setEmail("")
        setRole("")
        onClose()
    }

    return (
        <ModalShell open={open} onClose={handleClose} contentClassName="max-w-2xl rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl">
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl"
            >
                <div className="shrink-0 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-medium text-foreground sm:text-2xl">Edit a Staff</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Change the details of the staff in the team.</p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Name</label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Marcus Dan"
                                    className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="marcusdannn@gmail.com"
                                    className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">User Role</label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Analyst" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {staffRoles.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                            disabled={!name || !email || !role}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
