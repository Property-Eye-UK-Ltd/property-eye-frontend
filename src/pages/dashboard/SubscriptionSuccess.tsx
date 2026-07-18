import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TickCircle } from "iconsax-react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/features/auth/context/AuthContext"
import apiClient from "@/lib/apiClient"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const SubscriptionSuccess = () => {
    const navigate = useNavigate()
    const { refreshUser } = useAuth()
    const [status, setStatus] = useState<"activating" | "done" | "error">("activating")

    useEffect(() => {
        const activate = async () => {
            try {
                await apiClient.get("/dashboard/billing/current-plan?checkout=success")
                await refreshUser()
                setStatus("done")
            } catch (error) {
                console.error("Failed to activate subscription:", error)
                toast.error("Failed to activate subscription. Please contact support.")
                setStatus("error")
            }
        }
        activate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4 md:space-y-6">
                {status === "activating" ? (
                    <>
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        <h1 className="text-2xl font-medium text-foreground md:text-3xl">
                            Activating your subscription...
                        </h1>
                        <p className="max-w-md text-base text-muted-foreground">
                            This will only take a moment.
                        </p>
                    </>
                ) : status === "done" ? (
                    <>
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 md:h-24 md:w-24">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 md:h-20 md:w-20">
                                <TickCircle size={40} variant="Bold" className="text-success md:h-[52px] md:w-[52px]" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-medium text-foreground md:text-5xl">
                            Subscription Successful
                        </h1>
                        <p className="max-w-md text-base text-muted-foreground">
                            Welcome to Property Eye. Your account is now active and ready to use.
                        </p>
                        <Button
                            onClick={() => navigate("/dashboard", { replace: true })}
                            className="mt-4 rounded-full bg-primary px-8 py-6 text-base font-medium hover:bg-primary/90"
                        >
                            Go to Dashboard
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 md:h-24 md:w-24">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/20 md:h-20 md:w-20">
                                <TickCircle size={40} variant="Bold" className="text-error md:h-[52px] md:w-[52px]" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-medium text-foreground md:text-4xl">
                            We couldn't confirm your subscription
                        </h1>
                        <p className="max-w-md text-base text-muted-foreground">
                            Your payment may still have gone through. Please check your billing page or contact support if this persists.
                        </p>
                        <Button
                            onClick={() => navigate("/dashboard/billing", { replace: true })}
                            className="mt-4 rounded-full bg-primary px-8 py-6 text-base font-medium hover:bg-primary/90"
                        >
                            Go to Billing
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default SubscriptionSuccess
