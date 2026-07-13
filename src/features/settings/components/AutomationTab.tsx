import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { defaultSweepScheduling } from "@/data/schedulingData"

export const AutomationTab = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [frequency, setFrequency] = useState(defaultSweepScheduling.frequency)
    const [dates, setDates] = useState([...defaultSweepScheduling.sweepDates])

    return (
        <SettingsTabShell
            title="Check Scheduling"
            description="Specify how and when Property Eye runs commission checks"
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
        >
            <div className="space-y-8 max-w-2xl mx-auto py-4">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Check Frequency</Label>
                        <Select disabled={!isEditing} value={frequency} onValueChange={setFrequency}>
                            <SelectTrigger className="rounded-2xl bg-muted border-0 h-12 px-4 focus:ring-1 focus:ring-primary/20">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border">
                                <SelectItem value="annually" className="font-medium">Annually</SelectItem>
                                <SelectItem value="bi-annually" className="font-medium">Bi-Annually (Recommended)</SelectItem>
                                <SelectItem value="quarterly" className="font-medium">Quarterly</SelectItem>
                                <SelectItem value="monthly" className="font-medium">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-foreground">Scheduled Sweep Dates</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dates.map((date, index) => (
                                <div key={index} className="space-y-2">
                                    <Label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Sweep Date {index + 1}</Label>
                                    <Input
                                        type="date"
                                        disabled={!isEditing}
                                        value={date}
                                        onChange={(e) => {
                                            const newDates = [...dates]
                                            newDates[index] = e.target.value
                                            setDates(newDates)
                                        }}
                                        className="rounded-2xl bg-muted border-0 h-12 px-4 focus-visible:ring-1 focus-visible:ring-primary/20 font-medium"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            The "Run Checks" button in the dashboard will be enabled specifically on these dates to allow manual triggers of the scheduled sweeps.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-2">
                    <h4 className="text-sm font-medium text-primary">Automatic Execution</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        If no manual action is taken within 24 hours of the scheduled date, Property Eye will automatically initiate the check using the configured integration.
                    </p>
                </div>
            </div>
        </SettingsTabShell>
    )
}
