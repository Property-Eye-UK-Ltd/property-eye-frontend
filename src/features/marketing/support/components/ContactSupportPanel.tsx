import { useState } from "react"
import { Sms, InfoCircle, Copy, TickCircle } from "iconsax-react"
import { toast } from "sonner"
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
    /** Hides the details text box, leaving just the email support button */
    hideDetails?: boolean
}

const buildMailto = (subject: SupportSubject, details: string, context: string, hideDetails?: boolean) => {
    const lines = [
        context ? `Agency / reference: ${context}` : null,
        "",
        details || (hideDetails ? "I am writing to claim the attribution for my referred agency." : "(describe the issue here)"),
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
    hideDetails = false,
}: ContactSupportPanelProps) => {
    const [subject, setSubject] = useState<SupportSubject>(lockedSubject ?? supportSubjects[0])
    const [details, setDetails] = useState("")
    const [showEmail, setShowEmail] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(marketerSupportEmail)
            setCopied(true)
            toast.success("Support email copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error("Couldn't copy email. Please copy it manually.")
        }
    }

    return (
        <DashboardPanel
            title={title}
            description={description}
            icon={<Sms size={18} variant="Bulk" className="text-muted-foreground" />}
            hasBorder
        >
            <div className="space-y-5">
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

                {!hideDetails && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Details (optional)</label>
                        <Textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Add any context that will help support look into this…"
                            className="min-h-[100px] rounded-xl border border-border bg-transparent px-4 py-3 text-sm"
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                        href={buildMailto(subject, details, context, hideDetails)}
                        onClick={() => setShowEmail(true)}
                        className={cn(
                            "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-95 shrink-0",
                            "sm:w-auto cursor-pointer"
                        )}
                    >
                        <Sms size={18} variant="Bold" />
                        Email Support
                    </a>

                    <div
                        className={cn(
                            "transition-all duration-500 ease-out flex items-center justify-between sm:justify-start gap-2.5 rounded-full border bg-card/50 text-sm text-muted-foreground backdrop-blur-sm shadow-sm overflow-hidden whitespace-nowrap",
                            showEmail
                                ? "opacity-100 translate-x-0 max-w-[320px] scale-100 px-4 py-2.5 border-border"
                                : "opacity-0 -translate-x-4 max-w-0 scale-95 pointer-events-none py-0 px-0 border-transparent"
                        )}
                    >
                        <span className="font-mono text-xs text-foreground font-medium select-all">
                            {marketerSupportEmail}
                        </span>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            aria-label="Copy support email address"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary/10 active:scale-90"
                        >
                            {copied ? (
                                <TickCircle size={16} variant="Bulk" className="text-green-600 animate-in fade-in zoom-in duration-200" />
                            ) : (
                                <Copy size={16} variant="Bulk" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardPanel>
    )
}
