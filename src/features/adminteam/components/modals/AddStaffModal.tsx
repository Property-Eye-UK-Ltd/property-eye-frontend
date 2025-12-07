import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoCircle } from "iconsax-react"

export interface AddStaffFormValues {
    name: string
    email: string
    role: string
}

interface AddStaffModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: AddStaffFormValues) => Promise<void> | void
    isSubmitting?: boolean
}

const initialFormValues: AddStaffFormValues = {
    name: "",
    email: "",
    role: "",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const staffRoles = ["Admin", "Analyst", "Viewer"]

export const AddStaffModal = ({ open, onClose, onSubmit, isSubmitting = false }: AddStaffModalProps) => {
    const [formValues, setFormValues] = useState<AddStaffFormValues>(initialFormValues)
    const [emailError, setEmailError] = useState<string>("")

    useEffect(() => {
        if (!open) {
            setFormValues(initialFormValues)
            setEmailError("")
        }
    }, [open])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormValues((prev) => ({ ...prev, [name]: value }))

        // Clear email error when user starts typing
        if (name === "email" && emailError) {
            setEmailError("")
        }
    }

    const validateEmail = (email: string): boolean => {
        if (!email) {
            setEmailError("Email is required")
            return false
        }
        if (!EMAIL_REGEX.test(email)) {
            setEmailError("Please enter a valid email address")
            return false
        }
        setEmailError("")
        return true
    }

    const handleEmailBlur = () => {
        if (formValues.email) {
            validateEmail(formValues.email)
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validate email before submission
        if (!validateEmail(formValues.email)) {
            return
        }

        if (!formValues.name || !formValues.role || isSubmitting) {
            return
        }

        onSubmit(formValues)
    }

    const isSubmitDisabled = !formValues.name || !formValues.email || !formValues.role || isSubmitting || !!emailError

    return (
        <ModalShell open={open} onClose={onClose} contentClassName="max-w-3xl rounded-3xl bg-white pb-0 pt-0">
            <form onSubmit={handleSubmit} className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white">
                <div className="shrink-0 bg-white px-6 py-6 text-left">
                    <h2 className="text-2xl font-medium text-foreground">Add a Staff</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Enter the details of the staff to be added to the team.</p>
                </div>

                <div className="scrollbar-super-thin overflow-y-auto bg-muted px-6 py-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Name</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                    className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    onBlur={handleEmailBlur}
                                    placeholder="Enter email address"
                                    className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                                />
                                {emailError && <p className="text-xs text-red-600">{emailError}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Satff Role</label>
                                <Select value={formValues.role} onValueChange={(value) => setFormValues((prev) => ({ ...prev, role: value }))}>
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {staffRoles.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-8 py-6">
                    <div className="mb-4 flex items-start gap-3">
                        <InfoCircle size={20} variant="TwoTone" className="mt-0.5 shrink-0 text-primary" />
                        <p className="text-sm text-primary">An email notification will be sent to invite the staff to join the team.</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-full bg-muted px-8 py-3 text-sm font-medium text-foreground sm:flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:flex-1"
                        >
                            {isSubmitting ? "Sending..." : "Send Invite"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
