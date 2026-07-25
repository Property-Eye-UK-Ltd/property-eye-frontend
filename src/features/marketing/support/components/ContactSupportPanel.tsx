import { useState } from "react"
import { Sms, InfoCircle } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
    SupportSubject,
    supportSubjects,
    supportSubjectDescriptions,
    marketerSupportEmail,
} from "@/data/marketing-data"

interface ContactSupportPanelProps {
    title?: string
    description?: string
    /** Pre-selects and locks a subject, used by the Claim Agency page */
    lockedSubject?: SupportSubject
    /** Prefilled into the email body, e.g. an agency name */
    context?: string
}

const buildMailto = (subject: SupportSubject, details: string, context: string) => {
    const lines = [
        context ? `Agency / reference: ${context}` : null,
        "",
        details || "(describe the issue here)",
    ].filter((line) => line !== null)

    const body = lines.join("\n")
    const params = new URLSearchParams({
        subject: `[${subject}] Property Eye Marketer Support`,
        body,
    })
    return `mailto:${marketerSupportEmail}?${params.toString()}`
}

export const ContactSupportPanel = ({
    title = "Contact Support",
    description = "Marketer disputes and attribution issues are handled directly by our support team, not in-app.",
    lockedSubject,
    context = "",
}: ContactSupportPanelProps) => {
    const [subject, setSubject] = useState<SupportSubject>(lockedSubject ?? supportSubjects[0])
    const [details, setDetails] = useState("")

    return (
        <DashboardPanel
            title={title}
            description={description}
            icon={<Sms size={18} variant="Bulk" className="text-muted-foreground" />}
            hasBorder
        >
            <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 lg:p-4">
                    <InfoCircle size={18} variant="TwoTone" className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-xs text-primary lg:text-sm">
                        Select what you're contacting us about below, then hit the button — it opens your email app with
                        the details filled in. Everything from there, including the resolution, happens over email.
                    </p>
                </div>

                {!lockedSubject && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">What's this about?</label>
                        <Select value={subject} onValueChange={(v) => setSubject(v as SupportSubject)}>
                            <SelectTrigger className="h-12 rounded-xl border border-border px-4 text-sm">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {supportSubjects.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">{supportSubjectDescriptions[subject]}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Details (optional)</label>
                    <Textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Add any context that will help support look into this…"
                        className="min-h-[100px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm"
                    />
                </div>

                <a
                    href={buildMailto(subject, details, context)}
                    className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
                        "sm:w-auto"
                    )}
                >
                    <Sms size={18} variant="Bold" />
                    Email Support
                </a>
            </div>
        </DashboardPanel>
    )
}
