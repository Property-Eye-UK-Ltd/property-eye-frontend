import { SettingsTabShell } from "./SettingsTabShell"
import { Button } from "@/components/ui/button"
import { LogoutCurve } from "iconsax-react"
import { useNavigate } from "react-router-dom"

export const AccountTab = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("Logout clicked")
        navigate("/login")
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
                >
                    <LogoutCurve size={18} variant="TwoTone" />
                    Log Out
                </Button>
            </div>
        </SettingsTabShell>
    )
}
