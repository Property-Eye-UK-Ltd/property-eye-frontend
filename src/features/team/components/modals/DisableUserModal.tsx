import { FormEvent, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@/data/team-data"

export interface DisableUserFormValues {
    reason: string
    description: string
}

interface DisableUserModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: DisableUserFormValues) => Promise<void> | void
    user: User | null
    isSubmitting?: boolean
}

const disableReasons = [
    "Violation of company policy",
    "End of contract",
    "Security concerns",
    "Requested by user",
    "Other",
]

export const DisableUserModal = ({
    open,
    onClose,
    onSubmit,
    user,
    isSubmitting = false,
}: DisableUserModalProps) => {
    const [formValues, setFormValues] = useState<DisableUserFormValues>({
        reason: "",
        description: "",
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formValues.reason || !formValues.description || isSubmitting) {
            return
        }
        onSubmit(formValues)
    }

    const isSubmitDisabled = !formValues.reason || !formValues.description || isSubmitting

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
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Disable User</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the reason for disabling user
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Reason for disabling
                                </label>
                                <Select
                                    value={formValues.reason}
                                    onValueChange={(value) =>
                                        setFormValues((prev) => ({ ...prev, reason: value }))
                                    }
                                >
                                    <SelectTrigger className="h-12 rounded-xl border border-border bg-transparent px-4 text-sm">
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {disableReasons.map((reason) => (
                                            <SelectItem key={reason} value={reason}>
                                                {reason}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Description</label>
                                <Textarea
                                    name="description"
                                    value={formValues.description}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({ ...prev, description: e.target.value }))
                                    }
                                    placeholder="Please provide additional details about why this user is being disabled..."
                                    className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
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
                            {isSubmitting ? "Processing..." : "Finish"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
