import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { getAdminAgencyList, runAdminChecks } from "@/features/checks/api/checksService"
import type { AgencySelectOption } from "@/types/checks.types"
import { toast } from "@/hooks/use-toast"
import { extractErrorMessage } from "@/features/auth/authErrors"

interface RunChecksModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onRunStarted: (enqueuedIds: string[]) => void
}

type RunScope = "platform" | "agencies"

export const RunChecksModal = ({ open, onOpenChange, onRunStarted }: RunChecksModalProps) => {
    const [scope, setScope] = React.useState<RunScope>("platform")
    const [agencies, setAgencies] = React.useState<AgencySelectOption[]>([])
    const [selectedAgencyIds, setSelectedAgencyIds] = React.useState<string[]>([])
    const [comboOpen, setComboOpen] = React.useState(false)
    const [loadingAgencies, setLoadingAgencies] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)

    React.useEffect(() => {
        if (!open) return
        setScope("platform")
        setSelectedAgencyIds([])
        setLoadingAgencies(true)
        getAdminAgencyList()
            .then(setAgencies)
            .catch((err) => {
                toast({
                    title: "Couldn't load agencies",
                    description: extractErrorMessage(err, "Please try again."),
                    variant: "destructive",
                })
            })
            .finally(() => setLoadingAgencies(false))
    }, [open])

    const toggleAgency = (agencyId: string) => {
        setSelectedAgencyIds((prev) =>
            prev.includes(agencyId) ? prev.filter((id) => id !== agencyId) : [...prev, agencyId]
        )
    }

    const removeAgency = (agencyId: string) => {
        setSelectedAgencyIds((prev) => prev.filter((id) => id !== agencyId))
    }

    const selectedAgencies = agencies.filter((a) => selectedAgencyIds.includes(a.id))
    const canSubmit = scope === "platform" || selectedAgencyIds.length > 0

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const result = await runAdminChecks(scope === "agencies" ? selectedAgencyIds : undefined)
            onRunStarted(result.enqueued)
            onOpenChange(false)
        } catch (err) {
            toast({
                title: "Couldn't start checks",
                description: extractErrorMessage(err, "Please try again."),
                variant: "destructive",
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Run Checks</DialogTitle>
                    <DialogDescription>
                        Scan agency listings against the Price Paid Dataset for suspicious matches.
                    </DialogDescription>
                </DialogHeader>

                <RadioGroup value={scope} onValueChange={(v) => setScope(v as RunScope)} className="gap-3">
                    <div className="flex items-start gap-2">
                        <RadioGroupItem value="platform" id="scope-platform" className="mt-1" />
                        <Label htmlFor="scope-platform" className="cursor-pointer font-normal">
                            <span className="block font-medium text-foreground">Run full platform check</span>
                            <span className="block text-sm text-muted-foreground">
                                Scans every active agency.
                            </span>
                        </Label>
                    </div>
                    <div className="flex items-start gap-2">
                        <RadioGroupItem value="agencies" id="scope-agencies" className="mt-1" />
                        <Label htmlFor="scope-agencies" className="cursor-pointer font-normal">
                            <span className="block font-medium text-foreground">Select agencies</span>
                            <span className="block text-sm text-muted-foreground">
                                Scan only the agencies you choose.
                            </span>
                        </Label>
                    </div>
                </RadioGroup>

                {scope === "agencies" && (
                    <div className="space-y-2">
                        <Popover open={comboOpen} onOpenChange={setComboOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={comboOpen}
                                    className="w-full justify-between font-normal"
                                    disabled={loadingAgencies}
                                >
                                    {loadingAgencies
                                        ? "Loading agencies..."
                                        : selectedAgencyIds.length > 0
                                          ? `${selectedAgencyIds.length} agenc${selectedAgencyIds.length === 1 ? "y" : "ies"} selected`
                                          : "Search agencies..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                    <CommandInput placeholder="Search agencies..." />
                                    <CommandList>
                                        <CommandEmpty>No agencies found.</CommandEmpty>
                                        <CommandGroup>
                                            {agencies.map((agency) => (
                                                <CommandItem
                                                    key={agency.id}
                                                    value={agency.name ?? agency.id}
                                                    onSelect={() => toggleAgency(agency.id)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedAgencyIds.includes(agency.id)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {agency.name ?? agency.id}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {selectedAgencies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {selectedAgencies.map((agency) => (
                                    <Badge key={agency.id} variant="secondary" className="gap-1 pr-1">
                                        {agency.name ?? agency.id}
                                        <button
                                            type="button"
                                            onClick={() => removeAgency(agency.id)}
                                            className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                                            aria-label={`Remove ${agency.name ?? agency.id}`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!canSubmit || submitting}>
                        {submitting ? "Starting..." : "Run Checks"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
