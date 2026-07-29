import { useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelectCheckboxGroup } from "./MultiSelectCheckboxGroup"
import {
    CaseScansFilters,
    emptyCaseScansFilters,
    riskLevelOptions,
    verificationStatusOptions,
    caseStatusOptions,
    determinationOptions,
    recoveryOutcomeOptions,
} from "../types/caseScansFilters.types"
import type { FraudReportAgencyOption } from "../api/scanService"

interface CaseScansFilterModalProps {
    open: boolean
    onClose: () => void
    filters: CaseScansFilters
    onApply: (filters: CaseScansFilters) => void
    agencyOptions: FraudReportAgencyOption[]
}

export const CaseScansFilterModal = ({
    open,
    onClose,
    filters,
    onApply,
    agencyOptions,
}: CaseScansFilterModalProps) => {
    // Draft state so edits inside the modal don't affect the live table
    // until "Apply Filters" is pressed — closing without applying discards
    // changes, matching how a filter modal is expected to behave.
    const [draft, setDraft] = useState<CaseScansFilters>(filters)

    useEffect(() => {
        if (open) {
            setDraft(filters)
        }
    }, [open, filters])

    const patch = (changes: Partial<CaseScansFilters>) => {
        setDraft((prev) => ({ ...prev, ...changes }))
    }

    const handleApply = () => {
        onApply(draft)
        onClose()
    }

    const handleReset = () => {
        setDraft(emptyCaseScansFilters)
    }

    const agencyCheckboxOptions = agencyOptions.map((agency) => ({
        value: agency.id,
        label: agency.name,
    }))

    return (
        <ModalShell open={open} onClose={onClose} contentClassName="max-w-2xl">
            <div className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden">
                <div className="shrink-0 px-4 py-4 pr-12 sm:px-6 sm:py-6 sm:pr-6">
                    <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Filter Case Scans</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Only the checked values are included in the results — leave a section empty to include everything.
                    </p>
                </div>

                <div className="space-y-6 overflow-y-auto px-4 pb-4 scrollbar-super-thin sm:px-6">
                    <MultiSelectCheckboxGroup
                        label="Timing Risk"
                        options={riskLevelOptions}
                        selected={draft.riskLevels}
                        onChange={(riskLevels) => patch({ riskLevels })}
                    />

                    <MultiSelectCheckboxGroup
                        label="Verification Status"
                        options={verificationStatusOptions}
                        selected={draft.verificationStatuses}
                        onChange={(verificationStatuses) => patch({ verificationStatuses })}
                    />

                    <MultiSelectCheckboxGroup
                        label="Case Status"
                        options={caseStatusOptions}
                        selected={draft.caseStatuses}
                        onChange={(caseStatuses) => patch({ caseStatuses })}
                    />

                    <MultiSelectCheckboxGroup
                        label="Determination"
                        options={determinationOptions}
                        selected={draft.determinations}
                        onChange={(determinations) => patch({ determinations })}
                    />

                    <MultiSelectCheckboxGroup
                        label="Recovery Outcome"
                        options={recoveryOutcomeOptions}
                        selected={draft.recoveryOutcomes}
                        onChange={(recoveryOutcomes) => patch({ recoveryOutcomes })}
                    />

                    {agencyCheckboxOptions.length > 0 && (
                        <MultiSelectCheckboxGroup
                            label="Agency"
                            options={agencyCheckboxOptions}
                            selected={draft.agencyIds}
                            onChange={(agencyIds) => patch({ agencyIds })}
                            columns={1}
                        />
                    )}

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Detected Date Range</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="date"
                                value={draft.detectedFrom}
                                onChange={(e) => patch({ detectedFrom: e.target.value })}
                            />
                            <Input
                                type="date"
                                value={draft.detectedTo}
                                onChange={(e) => patch({ detectedTo: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Match Confidence Range (%)</p>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                placeholder="Min"
                                value={draft.confidenceMin}
                                onChange={(e) => patch({ confidenceMin: e.target.value })}
                            />
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                placeholder="Max"
                                value={draft.confidenceMax}
                                onChange={(e) => patch({ confidenceMax: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                            Minimum Subscription Revenue (£)
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Only show cases for agencies who have paid at least this much in total.
                        </p>
                        <Input
                            type="number"
                            min={0}
                            placeholder="e.g. 5000"
                            value={draft.minSubscriptionRevenue}
                            onChange={(e) => patch({ minSubscriptionRevenue: e.target.value })}
                        />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                        <Checkbox
                            checked={draft.flagActiveOnly}
                            onCheckedChange={(checked) => patch({ flagActiveOnly: checked === true })}
                        />
                        <span className="text-foreground">Only show cases flagged as needing attention</span>
                    </label>
                </div>

                <div className="shrink-0 border-t border-border px-4 py-4 sm:px-6">
                    <div className="flex flex-row gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="min-w-0 flex-1 rounded-full bg-muted px-3 py-2.5 text-xs font-medium text-foreground sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Reset All
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            className="min-w-0 flex-1 rounded-full bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground sm:px-8 sm:py-3 sm:text-sm"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </ModalShell>
    )
}
