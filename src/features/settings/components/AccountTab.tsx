import { useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Button } from "@/components/ui/button"
import { LogoutCurve } from "iconsax-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

export const AccountTab = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const { toast } = useToast()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            navigate("/login", { replace: true })
        } catch {
            // /auth/logout failing shouldn't trap the user in the session —
            // the client-side token is already cleared by AuthContext.logout's
            // finally block, so proceed to /login regardless.
            toast({
                title: "Logged out",
                description: "You've been signed out on this device.",
            })
            navigate("/login", { replace: true })
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <SettingsTabShell
            title="Account"
            description="Manage your account session and log out."
            showCTA={false}
        >
            <div className="py-6 flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-base font-medium text-foreground">Session Control</h3>
                    <p className="text-sm text-muted-foreground">
                        Log out of your current session on this device.
                    </p>
                </div>

                <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="rounded-full flex items-center gap-2 px-6 shrink-0"
                    disabled={isLoggingOut}
                >
                    <LogoutCurve size={18} variant="TwoTone" />
                    {isLoggingOut ? "Logging out..." : "Log Out"}
                </Button>
            </div>
        </SettingsTabShell>
    )
}
