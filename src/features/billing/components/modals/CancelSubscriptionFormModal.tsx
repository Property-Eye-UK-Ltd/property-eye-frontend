import { FormEvent, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface CancelSubscriptionFormValues {
    reason: string
    description: string
}

interface CancelSubscriptionFormModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: CancelSubscriptionFormValues) => Promise<void> | void
    isSubmitting?: boolean
}

const cancellationReasons = [
    "Too expensive",
    "Not using it enough",
    "Found a better alternative",
    "Missing features",
    "Technical issues",
    "Other",
]

export const CancelSubscriptionFormModal = ({
    open,
    onClose,
    onSubmit,
    isSubmitting = false,
}: CancelSubscriptionFormModalProps) => {
    const [formValues, setFormValues] = useState<CancelSubscriptionFormValues>({
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
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Cancel Subscription</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the details of the user to be added to the team.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">
                                    Reason for cancellation
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
                                        {cancellationReasons.map((reason) => (
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
                                    value={formValues.description}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({ ...prev, description: e.target.value }))
                                    }
                                    placeholder="Please provide additional details about your cancellation..."
                                    className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
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
                            {isSubmitting ? "Processing..." : "Finish"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
