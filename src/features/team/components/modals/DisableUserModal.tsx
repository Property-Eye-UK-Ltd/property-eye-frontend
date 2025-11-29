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
            contentClassName="max-w-3xl rounded-3xl bg-white pb-0 pt-0"
        >
            <form
                onSubmit={handleSubmit}
                className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white"
            >
                <div className="bg-white px-6 py-6 text-left shrink-0">
                    <h2 className="text-2xl font-semibold text-foreground">Disable User</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the reason for disabling user
                    </p>
                </div>

                <div className="bg-muted px-6 py-8 overflow-y-auto scrollbar-super-thin">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
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
                                    placeholder="User"
                                    className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-8 py-6 shrink-0">
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
