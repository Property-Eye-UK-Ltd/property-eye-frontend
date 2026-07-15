import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import * as authService from "@/features/auth/api/authService"
import { extractErrorMessage } from "@/features/auth/authErrors"

export const SecurityTab = () => {
    const { user } = useAuth()
    const { toast } = useToast()
    const [isSending, setIsSending] = useState(false)
    const [linkSent, setLinkSent] = useState(false)

    const handleSendResetLink = async () => {
        if (!user?.email) return
        setIsSending(true)
        try {
            // Reuses the same pre-auth forgot-password flow as the login
            // page (POST /auth/forgot-password) — there is no separate
            // authenticated "change password" endpoint in the backend
            // contract, and forgot-password always returns a generic
            // message regardless of account state (no enumeration).
            const response = await authService.forgotPassword({ email: user.email })
            setLinkSent(true)
            toast({ title: "Check your email", description: response.message })
        } catch (error) {
            toast({
                title: "Could not send reset email",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
                variant: "destructive",
            })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <SettingsTabShell
            title="Security"
            description="Manage your password and account security preferences."
            isEditing={false}
            onEdit={() => { }}
            onSave={() => { }}
            onCancel={() => { }}
            showCTA={false}
        >
            <div className="space-y-8">
                {/* Password */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                        <h3 className="text-base font-medium text-foreground">Password</h3>
                        <p className="text-sm text-muted-foreground">
                            We'll email a reset link to <span className="font-medium text-foreground">{user?.email}</span> so
                            you can set a new password.
                        </p>
                    </div>
                    <Button
                        onClick={handleSendResetLink}
                        disabled={isSending || !user?.email}
                        variant="outline"
                        className="rounded-full shrink-0"
                    >
                        {isSending ? "Sending..." : linkSent ? "Resend link" : "Send reset link"}
                    </Button>
                </div>

                <div className="h-px bg-border" />

                {/* Two-Factor Authentication — not yet supported by the backend */}
                <div className="relative">
                    <div className="flex items-start justify-between gap-4 opacity-50 pointer-events-none blur-[1px]">
                        <div className="flex-1 space-y-1">
                            <Label className="text-base font-medium text-foreground">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                                Enable 2FA to secure your account with an additional authentication code.
                            </p>
                        </div>
                        <Switch checked={false} disabled className="shrink-0" />
                    </div>
                    <span className="absolute top-0 right-0 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium uppercase">
                        Coming soon
                    </span>
                </div>

                <div className="h-px bg-border" />

                {/* API Keys — not yet supported by the backend */}
                <div className="relative">
                    <div className="flex items-start justify-between gap-4 opacity-50 pointer-events-none blur-[1px]">
                        <div className="flex-1 space-y-1">
                            <Label className="text-base font-medium text-foreground">API Keys</Label>
                            <p className="text-sm text-muted-foreground">
                                Generate API keys to integrate Property Eye with your own tools.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full shrink-0" disabled>
                            Generate Key
                        </Button>
                    </div>
                    <span className="absolute top-0 right-0 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium uppercase">
                        Coming soon
                    </span>
                </div>
            </div>
        </SettingsTabShell>
    )
}
