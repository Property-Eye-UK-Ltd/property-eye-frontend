import { useEffect, useState } from "react"
import { SettingsTabShell } from "./SettingsTabShell"
import { Monitor, Link1, Link2 } from "iconsax-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import * as settingsService from "@/features/settings/api/settingsService"
import { extractErrorMessage } from "@/features/auth/authErrors"
import type { IntegrationType, SettingsIntegrationResponse } from "@/types/settings.types"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// backend/src/schemas/enums.py IntegrationTypeEnum — these are the only
// integration types the backend actually recognizes.
const INTEGRATION_TYPES: { value: IntegrationType; label: string }[] = [
    { value: "crm", label: "CRM" },
    { value: "property", label: "Property Management" },
    { value: "accounting", label: "Accounting" },
]

export const IntegrationTab = () => {
    const { toast } = useToast()
    const [status, setStatusState] = useState<SettingsIntegrationResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isConnecting, setIsConnecting] = useState<IntegrationType | null>(null)
    const [isDisconnecting, setIsDisconnecting] = useState(false)

    const load = async () => {
        try {
            const data = await settingsService.getIntegrationSettings()
            setStatusState(data)
        } catch (error) {
            console.error("Error loading integrations:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const isConnected = status?.connection_status === "healthy" && !!status?.integration_type

    const handleConnect = async (type: IntegrationType) => {
        setIsConnecting(type)
        try {
            await settingsService.connectIntegration(type)
            toast({
                title: "Integration connected",
                description: `Successfully connected ${type} integration.`,
            })
            await load()
        } catch (error) {
            toast({
                title: "Failed to connect",
                description: extractErrorMessage(error),
                variant: "destructive",
            })
        } finally {
            setIsConnecting(null)
        }
    }

    const handleDisconnect = async () => {
        setIsDisconnecting(true)
        try {
            await settingsService.disconnectIntegration()
            toast({
                title: "Integration disconnected",
                description: "Successfully disconnected integration.",
            })
            await load()
        } catch (error) {
            toast({
                title: "Failed to disconnect",
                description: extractErrorMessage(error),
                variant: "destructive",
            })
        } finally {
            setIsDisconnecting(false)
        }
    }

    return (
        <SettingsTabShell
            title="Integration"
            description="Manage your third-party integrations"
            isEditing={false}
            onEdit={() => { }}
            onSave={() => { }}
            onCancel={() => { }}
            showCTA={false}
        >
            {isLoading ? (
                <div className="space-y-8">
                    <div className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-border/50 bg-muted animate-pulse">
                        <div className="flex items-start gap-4">
                            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                            <div className="space-y-2 mt-1">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-64" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-24 rounded-full shrink-0" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl border border-border/50 bg-muted flex flex-col items-center gap-3 text-center"
                            >
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-8 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : isConnected ? (
                <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-border/50 bg-muted">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Link1 size={22} variant="Bulk" className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">
                                    {status?.integration_type} integration connected
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Status: {status?.connection_status}
                                    {status?.last_sync_at &&
                                        ` · Last synced ${new Date(status.last_sync_at).toLocaleString()}`}
                                </p>
                                {status?.sync_error_message && (
                                    <p className="text-xs text-destructive mt-1">{status.sync_error_message}</p>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-full shrink-0"
                            onClick={handleDisconnect}
                            disabled={isDisconnecting}
                        >
                            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                            <Monitor size={40} variant="Bulk" className="text-primary" />
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <h3 className="text-xl font-semibold text-foreground">No integration connected</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Connect a system below to start syncing data automatically.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {INTEGRATION_TYPES.map((type) => (
                            <div
                                key={type.value}
                                className={cn(
                                    "p-5 rounded-2xl border border-border/50 bg-muted flex flex-col items-center gap-3 text-center"
                                )}
                            >
                                <Link2 size={24} variant="Bulk" className="text-primary" />
                                <p className="text-sm font-medium text-foreground">{type.label}</p>
                                <Button
                                    size="sm"
                                    className="rounded-full w-full"
                                    onClick={() => handleConnect(type.value)}
                                    disabled={isConnecting !== null}
                                >
                                    {isConnecting === type.value ? "Connecting..." : "Connect"}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </SettingsTabShell>
    )
}
