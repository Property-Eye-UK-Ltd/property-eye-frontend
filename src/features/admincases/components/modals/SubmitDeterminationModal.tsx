import { FormEvent, useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CaseDetermination, ReasonForClearing, RecoveryOutcome } from "@/data/agencyCasesData"

export interface SubmitDeterminationValues {
    determination: CaseDetermination
    recoveryOutcome: RecoveryOutcome
    recoveredAmount?: string
    reasonForClearing?: ReasonForClearing
    clearingReason?: string
}

interface SubmitDeterminationModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (values: SubmitDeterminationValues) => void
}

export const SubmitDeterminationModal = ({
    open,
    onClose,
    onSubmit,
}: SubmitDeterminationModalProps) => {
    const [determination, setDetermination] = useState<CaseDetermination>("Fraudulent (Confirmed)")
    const [recoveryOutcome, setRecoveryOutcome] = useState<RecoveryOutcome>("Recovered")
    const [recoveredAmount, setRecoveredAmount] = useState("")
    const [reasonForClearing, setReasonForClearing] = useState<ReasonForClearing>("Data Error")
    const [clearingReason, setClearingReason] = useState("")

    useEffect(() => {
        if (!open) {
            setDetermination("Fraudulent (Confirmed)")
            setRecoveryOutcome("Recovered")
            setRecoveredAmount("")
            setReasonForClearing("Data Error")
            setClearingReason("")
        }
    }, [open])

    useEffect(() => {
        if (determination === "Not Fraudulent (Cleared)") {
            setRecoveryOutcome("N/A")
            setRecoveredAmount("")
        } else if (recoveryOutcome === "N/A") {
            setRecoveryOutcome("Recovered")
        }
    }, [determination, recoveryOutcome])

    const showAmount = determination === "Fraudulent (Confirmed)" && recoveryOutcome === "Recovered"
    const showClearing = determination === "Not Fraudulent (Cleared)"
    const showClearingNote = showClearing && reasonForClearing === "Other"
    const isValid =
        (!showAmount || recoveredAmount.trim().length > 0) &&
        (!showClearingNote || clearingReason.trim().length > 0)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!isValid) return
        onSubmit({
            determination,
            recoveryOutcome,
            recoveredAmount: showAmount ? recoveredAmount : undefined,
            reasonForClearing: showClearing ? reasonForClearing : undefined,
            clearingReason: showClearingNote ? clearingReason.trim() : undefined,
        })
    }

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            contentClassName="max-w-lg rounded-2xl bg-white p-0 sm:rounded-3xl"
        >
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="px-4 py-4 pr-12 sm:px-6 sm:py-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Submit Determination</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Record the legal determination and recovery outcome. The case moves to Pending Approval for admin review.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <Label>Determination</Label>
                            <Select value={determination} onValueChange={(v) => setDetermination(v as CaseDetermination)}>
                                <SelectTrigger className="rounded-2xl border-border">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fraudulent (Confirmed)">Fraudulent (Confirmed)</SelectItem>
                                    <SelectItem value="Not Fraudulent (Cleared)">Not Fraudulent (Cleared)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {determination === "Fraudulent (Confirmed)" && (
                            <div className="space-y-2">
                                <Label>Recovery Outcome</Label>
                                <Select value={recoveryOutcome} onValueChange={(v) => setRecoveryOutcome(v as RecoveryOutcome)}>
                                    <SelectTrigger className="rounded-2xl border-border">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Recovered">Recovered</SelectItem>
                                        <SelectItem value="Unrecovered">Unrecovered</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {showAmount && (
                            <div className="space-y-2">
                                <Label>Recovered Amount</Label>
                                <Input
                                    value={recoveredAmount}
                                    onChange={(e) => setRecoveredAmount(e.target.value)}
                                    placeholder="e.g. £42,300"
                                    className="rounded-2xl border-border"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Agency Share and Property Eye Share are calculated automatically as a starting suggestion and can be edited afterward.
                                </p>
                            </div>
                        )}

                        {showClearing && (
                            <div className="space-y-2">
                                <Label>Reason for Clearing</Label>
                                <Select
                                    value={reasonForClearing}
                                    onValueChange={(v) => setReasonForClearing(v as ReasonForClearing)}
                                >
                                    <SelectTrigger className="rounded-2xl border-border">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Data Error">Data Error</SelectItem>
                                        <SelectItem value="Coincidental Match">Coincidental Match</SelectItem>
                                        <SelectItem value="Agency Documentation Provided">
                                            Agency Documentation Provided
                                        </SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {showClearingNote && (
                            <div className="space-y-2">
                                <Label>Clearing Note</Label>
                                <Textarea
                                    value={clearingReason}
                                    onChange={(e) => setClearingReason(e.target.value)}
                                    placeholder="Explain why this case is not fraudulent..."
                                    className="min-h-[100px] rounded-2xl border-border"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 border-t border-border px-4 py-4 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-foreground"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
                    >
                        Submit for Approval
                    </button>
                </div>
            </form>
        </ModalShell>
    )
}
