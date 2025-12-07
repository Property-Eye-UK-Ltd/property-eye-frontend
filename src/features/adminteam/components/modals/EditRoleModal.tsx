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
        <ModalShell open={open} onClose={handleClose} contentClassName="max-w-2xl rounded-3xl bg-white pb-0 pt-0">
            <form onSubmit={handleSubmit} className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white">
                <div className="shrink-0 bg-white px-6 py-6 text-left">
                    <h2 className="text-2xl font-medium text-foreground">Edit a Staff</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Change the details of the staff in the team.</p>
                </div>

                <div className="scrollbar-super-thin overflow-y-auto bg-muted px-6 py-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
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
                            disabled={!name || !email || !role}
                            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:flex-1"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
