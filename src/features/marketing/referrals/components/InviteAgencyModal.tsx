import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { InfoCircle } from "iconsax-react"

export interface InviteAgencyFormValues {
    agencyEmail: string
}

interface InviteAgencyModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: InviteAgencyFormValues) => Promise<void> | void
    isSubmitting?: boolean
}

const initialFormValues: InviteAgencyFormValues = {
    agencyEmail: "",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const InviteAgencyModal = ({
    open,
    onClose,
    onSubmit,
    isSubmitting = false,
}: InviteAgencyModalProps) => {
    const [formValues, setFormValues] = useState<InviteAgencyFormValues>(initialFormValues)
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

        if (name === "agencyEmail" && emailError) {
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
        if (formValues.agencyEmail) {
            validateEmail(formValues.agencyEmail)
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validateEmail(formValues.agencyEmail) || isSubmitting) {
            return
        }

        onSubmit(formValues)
    }

    const isSubmitDisabled = !formValues.agencyEmail || isSubmitting || !!emailError

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
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Invite an Agency</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        We'll send a branded invite tied to your referral code. Attribution locks once they sign up.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Contact Email</label>
                            <Input
                                type="email"
                                name="agencyEmail"
                                value={formValues.agencyEmail}
                                onChange={handleInputChange}
                                onBlur={handleEmailBlur}
                                placeholder="Enter agency contact email"
                                className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm"
                            />
                            {emailError && <p className="text-xs text-red-600">{emailError}</p>}
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                    <div className="flex items-start gap-3 mb-4">
                        <InfoCircle size={20} variant="TwoTone" className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-primary">
                            The invite expires after the attribution lock period. You can resend it any time.
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            {isSubmitting ? "Sending..." : "Send Invite"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
