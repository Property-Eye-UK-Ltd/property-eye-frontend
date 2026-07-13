import { FormEvent, useEffect, useMemo, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoCircle } from "iconsax-react"
import {
    DisputeType,
    marketerAgencies,
    commissionLines,
} from "@/data/marketing-data"

export interface RaiseDisputeFormValues {
    type: DisputeType
    linkedRecord: string
    description: string
}

interface RaiseDisputeModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: RaiseDisputeFormValues) => Promise<void> | void
    isSubmitting?: boolean
}

const disputeTypes: DisputeType[] = ["Agency Ownership", "Commission"]

export const RaiseDisputeModal = ({
    open,
    onClose,
    onSubmit,
    isSubmitting = false,
}: RaiseDisputeModalProps) => {
    const [type, setType] = useState<DisputeType>("Agency Ownership")
    const [linkedRecord, setLinkedRecord] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (!open) {
            setType("Agency Ownership")
            setLinkedRecord("")
            setDescription("")
        }
    }, [open])

    // The record a dispute links to depends on its type.
    const linkedOptions = useMemo(() => {
        if (type === "Agency Ownership") {
            return marketerAgencies.map((a) => ({ value: a.name, label: a.name }))
        }
        // Commission disputes link only to lines with an eligible fraud case ref
        return commissionLines
            .filter((c) => Boolean(c.fraudCase))
            .map((c) => ({ value: c.fraudCase!, label: `${c.fraudCase} — ${c.agency}` }))
    }, [type])

    const handleTypeChange = (value: string) => {
        setType(value as DisputeType)
        setLinkedRecord("")
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!linkedRecord || !description.trim() || isSubmitting) {
            return
        }
        onSubmit({ type, linkedRecord, description: description.trim() })
    }

    const isSubmitDisabled = !linkedRecord || !description.trim() || isSubmitting

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
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Raise a Dispute</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Flag an attribution or commission issue. An admin reviews every dispute and updates its status.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="space-y-5 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Dispute Type</label>
                            <Select value={type} onValueChange={handleTypeChange}>
                                <SelectTrigger className="h-12 rounded-xl border border-border px-4 text-sm">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {disputeTypes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                {type === "Agency Ownership" ? "Linked Agency" : "Linked Commission / Case"}
                            </label>
                            <Select value={linkedRecord} onValueChange={setLinkedRecord}>
                                <SelectTrigger className="h-12 rounded-xl border border-border px-4 text-sm">
                                    <SelectValue placeholder="Select a record" />
                                </SelectTrigger>
                                <SelectContent>
                                    {linkedOptions.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
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
                                placeholder="Explain the issue and what outcome you're expecting…"
                                className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                    <div className="flex items-start gap-3 mb-4">
                        <InfoCircle size={20} variant="TwoTone" className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-primary">
                            Your dispute will be created with an <span className="font-medium">Open</span> status until an admin reviews it.
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
                            {isSubmitting ? "Submitting..." : "Submit Dispute"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
