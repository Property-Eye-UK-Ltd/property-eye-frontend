import { useState } from "react"
import { toast } from "sonner"
import { Copy, TickCircle } from "iconsax-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { marketerProfile } from "@/data/marketing-data"

interface ReferralLinkFieldProps {
    onInvite?: () => void
    className?: string
}

/**
 * Compact referral link control designed to sit inside a DynamicPageHeader.
 * Bordered field with a floating label, the URL inside, a copy button at the
 * right end, and the Invite CTA beside it.
 */
export const ReferralLinkField = ({ onInvite, className }: ReferralLinkFieldProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(marketerProfile.referralUrl)
            setCopied(true)
            toast.success("Referral link copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error("Couldn't copy link. Please copy it manually.")
        }
    }

    return (
        <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center", className)}>
            <div className="relative w-full sm:w-[280px] lg:w-[320px]">
                <span className="absolute -top-2 left-3 z-10 bg-white px-1 text-[10px] font-medium text-muted-foreground lg:text-xs">
                    Your referral link
                </span>
                <div className="flex h-11 items-center rounded-xl border border-border bg-white pl-3 pr-1">
                    <code className="min-w-0 flex-1 truncate text-xs text-foreground lg:text-sm">
                        {marketerProfile.referralUrl}
                    </code>
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy referral link"
                        className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary/5"
                    >
                        {copied ? (
                            <TickCircle size={18} variant="Bulk" className="text-green-600" />
                        ) : (
                            <Copy size={18} variant="Bulk" />
                        )}
                    </button>
                </div>
            </div>

            <Button
                type="button"
                onClick={onInvite}
                size="sm"
                className="h-9 shrink-0 rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/70 hover:text-white lg:h-10"
            >
                Invite Agency
            </Button>
        </div>
    )
}
