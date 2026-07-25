import { FormEvent, useEffect, useMemo, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoCircle } from "iconsax-react"
import { AdminUnattributedAgency } from "@/features/marketing-admin/network/api/adminMarketersService"

interface LinkAgencyModalProps {
    open: boolean
    onClose: () => void
    /** Agencies eligible to be linked — i.e. not already attributed to another marketer */
    availableAgencies: AdminUnattributedAgency[]
    marketerName: string
    onConfirm: (agencyId: string) => void
    isSubmitting?: boolean
}

export const LinkAgencyModal = ({
    open,
    onClose,
    availableAgencies,
    marketerName,
    onConfirm,
    isSubmitting = false,
}: LinkAgencyModalProps) => {
    const [agencyId, setAgencyId] = useState("")

    useEffect(() => {
        if (!open) setAgencyId("")
    }, [open])

    const selectedAgency = useMemo(
        () => availableAgencies.find((a) => a.id === agencyId),
        [availableAgencies, agencyId]
    )

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!agencyId || isSubmitting) return
        onConfirm(agencyId)
    }

    return (
        <ModalShell open={open} onClose={onClose} contentClassName="max-w-lg rounded-2xl bg-white pb-0 pt-0 sm:rounded-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden rounded-2xl bg-white sm:rounded-3xl">
                <div className="px-4 py-4 pr-12 text-left sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Link Agency</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Attribute an agency to {marketerName}. Only use this once you've verified the referral yourself
                        (e.g. via a support conversation) — this link is created as approved immediately.
                    </p>
                </div>

                <div className="bg-muted px-4 py-4 sm:px-6 sm:py-6">
                    <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <label className="text-sm font-medium text-foreground">Agency</label>
                        <Select value={agencyId} onValueChange={setAgencyId}>
                            <SelectTrigger className="h-12 rounded-xl border border-border px-4 text-sm">
                                <SelectValue placeholder="Select an unattributed agency" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableAgencies.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        No unattributed agencies available.
                                    </div>
                                ) : (
                                    availableAgencies.map((a) => (
                                        <SelectItem key={a.id} value={a.id}>
                                            {a.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="px-4 py-4 sm:px-8 sm:py-6">
                    <div className="mb-4 flex items-start gap-3">
                        <InfoCircle size={20} variant="TwoTone" className="mt-0.5 shrink-0 text-primary" />
                        <p className="text-sm text-primary">
                            {selectedAgency
                                ? `${selectedAgency.name} will be attributed to ${marketerName} immediately — no approval queue.`
                                : "Attribution takes effect immediately once you confirm."}
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
                            disabled={!agencyId || isSubmitting}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground disabled:opacity-60 sm:px-8 sm:py-3 sm:text-sm"
                        >
                            {isSubmitting ? "Linking..." : "Link Agency"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
