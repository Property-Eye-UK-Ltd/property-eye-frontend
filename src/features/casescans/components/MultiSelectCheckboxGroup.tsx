import { Checkbox } from "@/components/ui/checkbox"

interface Option {
    value: string
    label: string
}

interface MultiSelectCheckboxGroupProps {
    label: string
    options: Option[]
    selected: string[]
    onChange: (next: string[]) => void
    columns?: 1 | 2
}

// Plain checkbox list rather than a Popover/Command combobox — this sits
// inside a modal that already scrolls, and a nested popover-in-a-modal is a
// common source of z-index/focus-trap bugs. A checkbox group also makes the
// "selected = included, unchecked = excluded" behavior the user asked for
// unmistakable at a glance, with no hidden state.
export const MultiSelectCheckboxGroup = ({
    label,
    options,
    selected,
    onChange,
    columns = 2,
}: MultiSelectCheckboxGroupProps) => {
    const toggle = (value: string, checked: boolean) => {
        if (checked) {
            onChange([...selected, value])
        } else {
            onChange(selected.filter((v) => v !== value))
        }
    }

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <div className={columns === 2 ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}>
                {options.map((option) => {
                    const id = `${label}-${option.value}`
                    const isChecked = selected.includes(option.value)
                    return (
                        <label
                            key={option.value}
                            htmlFor={id}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-muted data-[checked=true]:border-primary data-[checked=true]:bg-primary/5"
                            data-checked={isChecked}
                        >
                            <Checkbox
                                id={id}
                                checked={isChecked}
                                onCheckedChange={(checked) => toggle(option.value, checked === true)}
                            />
                            <span className="text-foreground">{option.label}</span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
