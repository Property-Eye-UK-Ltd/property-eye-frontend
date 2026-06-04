import { useState } from "react"
import { toast } from "sonner"
import { Copy, TickCircle, Share } from "iconsax-react"
import { DashboardPanel } from "@/components/dashboard/DashboardPanel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { marketerProfile } from "@/data/marketing-data"

interface ReferralLinkCardProps {
    className?: string
    onInvite?: () => void
}

export const ReferralLinkCard = ({ className, onInvite }: ReferralLinkCardProps) => {
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
        <DashboardPanel
            title="Your referral link"
            description="Share this link — any agency that signs up through it is attributed to you."
            icon={<Share size={20} variant="Bulk" className="mt-0.5 shrink-0 text-primary" />}
            className={cn("border border-border", className)}
        >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center rounded-xl border border-border bg-muted/40 px-3 py-2.5">
                    <code className="truncate text-xs text-foreground lg:text-sm">
                        {marketerProfile.referralUrl}
                    </code>
                </div>

                <div className="flex shrink-0 gap-2">
                    <Button
                        type="button"
                        onClick={handleCopy}
                        variant="outline"
                        className="h-11 flex-1 rounded-full border-primary px-4 text-sm text-primary hover:bg-primary/5 lg:flex-none"
                    >
                        {copied ? (
                            <TickCircle size={18} variant="Bulk" className="mr-2 text-green-600" />
                        ) : (
                            <Copy size={18} variant="Bulk" className="mr-2" />
                        )}
                        {copied ? "Copied" : "Copy link"}
                    </Button>

                    <Button
                        type="button"
                        onClick={onInvite}
                        className="h-11 flex-1 rounded-full bg-primary px-4 text-sm text-white hover:bg-primary/80 lg:flex-none"
                    >
                        Invite agency
                    </Button>
                </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
                Referral code: <span className="font-medium text-foreground">{marketerProfile.referralCode}</span>
            </p>
        </DashboardPanel>
    )
}
