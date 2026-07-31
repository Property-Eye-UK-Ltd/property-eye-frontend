import { useMemo, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface AgencyOption {
    value: string
    label: string
}

interface SearchableAgencyMultiSelectProps {
    label: string
    options: AgencyOption[]
    selected: string[]
    onChange: (next: string[]) => void
}

// Searchable combobox instead of a parallel checkbox list — a flat checkbox
// grid stops scaling once the agency count grows past a handful, so this
// swaps in search-to-filter plus an "All Agencies" shortcut for the common
// "everyone" case. Command list renders inline (no Popover), so it doesn't
// carry the nested-popover-in-modal z-index/focus-trap risk a floating
// dropdown would inside this already-scrolling filter modal.
export const SearchableAgencyMultiSelect = ({
    label,
    options,
    selected,
    onChange,
}: SearchableAgencyMultiSelectProps) => {
    const [search, setSearch] = useState("")

    const allSelected = options.length > 0 && selected.length === options.length

    const toggleAll = (checked: boolean) => {
        onChange(checked ? options.map((o) => o.value) : [])
    }

    const toggleOne = (value: string, checked: boolean) => {
        if (checked) {
            onChange([...selected, value])
        } else {
            onChange(selected.filter((v) => v !== value))
        }
    }

    const selectedLabels = useMemo(
        () => options.filter((o) => selected.includes(o.value)).map((o) => o.label),
        [options, selected]
    )

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) => toggleAll(checked === true)}
                    />
                    All Agencies
                </label>
            </div>

            <Command className="rounded-lg border border-border">
                <CommandInput
                    placeholder="Search agencies..."
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList className="max-h-48">
                    <CommandEmpty className="py-4 text-xs text-muted-foreground">
                        No agencies found
                    </CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => {
                            const isChecked = selected.includes(option.value)
                            return (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => toggleOne(option.value, !isChecked)}
                                    className={cn("cursor-pointer gap-2", isChecked && "bg-primary/5")}
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => toggleOne(option.value, checked === true)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="text-foreground">{option.label}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>

            {selectedLabels.length > 0 && (
                <p className="text-xs text-muted-foreground">
                    {selectedLabels.length === options.length
                        ? "All agencies selected"
                        : `Selected: ${selectedLabels.join(", ")}`}
                </p>
            )}
        </div>
    )
}
