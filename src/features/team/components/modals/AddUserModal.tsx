import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InfoCircle } from "iconsax-react"
import { userRoles } from "@/data/team-data"

export interface AddUserFormValues {
    name: string
    email: string
    role: string
}

interface AddUserModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: AddUserFormValues) => Promise<void> | void
    isSubmitting?: boolean
}

const initialFormValues: AddUserFormValues = {
    name: "",
    email: "",
    role: "",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const AddUserModal = ({
    open,
    onClose,
    onSubmit,
    isSubmitting = false,
}: AddUserModalProps) => {
    const [formValues, setFormValues] = useState<AddUserFormValues>(initialFormValues)
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

    const isSubmitDisabled =
        !formValues.name || !formValues.email || !formValues.role || isSubmitting || !!emailError

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-3xl rounded-3xl bg-white pb-0 pt-0"
        >
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white"
            >
                <div className="bg-white px-6 py-6 text-left shrink-0">
                    <h2 className="text-2xl font-semibold text-foreground">Add a User</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the details of the user to be added to the team.
                    </p>
                </div>

                <div className="bg-muted px-6 py-8 overflow-y-auto scrollbar-super-thin">
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
                                {emailError && (
                                    <p className="text-xs text-red-600">{emailError}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">User Role</label>
                                <Select
                                    value={formValues.role}
                                    onValueChange={(value) =>
                                        setFormValues((prev) => ({ ...prev, role: value }))
                                    }
                                >
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userRoles.map((role) => (
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

                <div className="bg-white px-8 py-6 shrink-0">
                    <div className="flex items-start gap-3 mb-4">
                        <InfoCircle size={20} variant="TwoTone" className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-primary">
                            An email notification will be sent to invite the user to join the team.
                        </p>
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
