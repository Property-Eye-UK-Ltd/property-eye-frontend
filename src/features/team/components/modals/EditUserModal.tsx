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
import { userRoles, User } from "@/data/team-data"

export interface EditUserFormValues {
    name: string
    email: string
    role: string
}

interface EditUserModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: EditUserFormValues) => Promise<void> | void
    onDisable: () => void
    user: User | null
    isSubmitting?: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EditUserModal = ({
    open,
    onClose,
    onSubmit,
    onDisable,
    user,
    isSubmitting = false,
}: EditUserModalProps) => {
    const [formValues, setFormValues] = useState<EditUserFormValues>({
        name: "",
        email: "",
        role: "",
    })
    const [emailError, setEmailError] = useState<string>("")

    useEffect(() => {
        if (open && user) {
            setFormValues({
                name: user.name,
                email: user.email,
                role: user.role,
            })
            setEmailError("")
        } else if (!open) {
            setFormValues({ name: "", email: "", role: "" })
            setEmailError("")
        }
    }, [open, user])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormValues((prev) => ({ ...prev, [name]: value }))

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
            contentClassName="max-w-3xl rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl"
        >
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl"
            >
                <div className="shrink-0 bg-white px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Edit a User</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Change the details of the user in the team.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
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

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={onDisable}
                            className="w-full rounded-full bg-red-50 px-8 py-3 text-sm font-medium text-red-600 hover:bg-red-100 sm:flex-1"
                        >
                            Disable User
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className="w-full rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:flex-1"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
