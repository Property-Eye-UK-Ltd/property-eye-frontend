import { FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DocumentUpload, InfoCircle } from "iconsax-react"

export interface SubmitClaimFormValues {
    agencyName: string
    evidence: string
}

interface SubmitClaimModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: SubmitClaimFormValues) => Promise<void> | void
    agencyName?: string
    isSubmitting?: boolean
}

export const SubmitClaimModal = ({
    open,
    onClose,
    onSubmit,
    agencyName = "",
    isSubmitting = false,
}: SubmitClaimModalProps) => {
    const [evidence, setEvidence] = useState("")

    useEffect(() => {
        if (!open) {
            setEvidence("")
        }
    }, [open])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!evidence.trim() || isSubmitting) {
            return
        }
        onSubmit({ agencyName, evidence: evidence.trim() })
    }

    const isSubmitDisabled = !evidence.trim() || isSubmitting

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
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Submit Attribution Claim</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Claim attribution for an agency you brought in offline. An admin reviews every claim — it's never automatic.
                    </p>
                </div>

                <div className="overflow-y-auto bg-muted px-4 py-4 scrollbar-super-thin sm:px-6 sm:py-8">
                    <div className="space-y-5 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Agency</label>
                            <Input
                                type="text"
                                value={agencyName}
                                readOnly
                                className="h-12 rounded-xl border border-border bg-muted/40 px-4 text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Evidence</label>
                            <Textarea
                                value={evidence}
                                onChange={(e) => setEvidence(e.target.value)}
                                placeholder="Describe how you introduced this agency (emails, contracts, dates, contacts)…"
                                className="min-h-[120px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                            <DocumentUpload size={20} variant="Bulk" className="shrink-0 text-primary" />
                            Attach supporting files (coming soon)
                        </div>
                    </div>
                </div>

                <div className="shrink-0 bg-white px-4 py-4 sm:px-8 sm:py-6">
                    <div className="flex items-start gap-3 mb-4">
                        <InfoCircle size={20} variant="TwoTone" className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-primary">
                            Your claim will be created as <span className="font-medium">pending</span> until an admin approves or rejects it.
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
                            {isSubmitting ? "Submitting..." : "Submit Claim"}
                        </button>
                    </div>
                </div>
            </form>
        </ModalShell>
    )
}
