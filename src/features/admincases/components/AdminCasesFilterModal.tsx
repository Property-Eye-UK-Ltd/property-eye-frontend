import { useEffect, useState } from "react"
import { ModalShell } from "@/components/modals/ModalShell"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelectCheckboxGroup } from "@/features/casescans/components/MultiSelectCheckboxGroup"
import {
  AdminCasesFilters,
  emptyAdminCasesFilters,
  statusOptions,
  riskLevelOptions,
  verificationStatusOptions,
  caseStatusOptions,
  determinationOptions,
  recoveryOutcomeOptions,
  confidenceBandOptions,
} from "../types/adminCasesFilters.types"
import type { FraudReportAgencyOption } from "@/features/casescans/api/scanService"

interface AdminCasesFilterModalProps {
  open: boolean
  onClose: () => void
  filters: AdminCasesFilters
  onApply: (filters: AdminCasesFilters) => void
  agencyOptions: FraudReportAgencyOption[]
}

export const AdminCasesFilterModal = ({
  open,
  onClose,
  filters,
  onApply,
  agencyOptions,
}: AdminCasesFilterModalProps) => {
  const [draft, setDraft] = useState<AdminCasesFilters>(filters)

  useEffect(() => {
    if (open) {
      setDraft(filters)
    }
  }, [open, filters])

  const patch = (changes: Partial<AdminCasesFilters>) => {
    setDraft((prev) => ({ ...prev, ...changes }))
  }

  const handleApply = () => {
    onApply(draft)
    onClose()
  }

  const handleReset = () => {
    setDraft(emptyAdminCasesFilters)
  }

  const agencyCheckboxOptions = agencyOptions.map((agency) => ({
    value: agency.id,
    label: agency.name,
  }))

  return (
    <ModalShell open={open} onClose={onClose} contentClassName="max-w-2xl">
      <div className="flex max-h-[min(85dvh,100%)] flex-col overflow-hidden">
        <div className="shrink-0 px-4 py-4 pr-12 sm:px-6 sm:py-6 sm:pr-6">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Filter Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Only the checked values are included in the results — leave a section empty to include everything.
          </p>
        </div>

        <div className="space-y-6 overflow-y-auto px-4 pb-4 scrollbar-super-thin sm:px-6">
          <MultiSelectCheckboxGroup
            label="Case Status"
            options={statusOptions}
            selected={draft.status}
            onChange={(status) => patch({ status })}
          />

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
            label="Case Determination"
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
            <p className="text-sm font-medium text-foreground">Sale Date Range</p>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={draft.saleFromDate}
                onChange={(e) => patch({ saleFromDate: e.target.value })}
              />
              <Input
                type="date"
                value={draft.saleToDate}
                onChange={(e) => patch({ saleToDate: e.target.value })}
              />
            </div>
          </div>

          <MultiSelectCheckboxGroup
            label="Match Confidence"
            options={confidenceBandOptions}
            selected={draft.confidenceBands}
            onChange={(confidenceBands) => patch({ confidenceBands })}
          />

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
