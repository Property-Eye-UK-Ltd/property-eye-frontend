import { useNavigate } from "react-router-dom"
import { InfoCircle } from "iconsax-react"
import { Button } from "@/components/ui/button"

const CheckoutCancelled = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4 md:space-y-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 md:h-24 md:w-24">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 md:h-20 md:w-20">
                        <InfoCircle size={40} variant="Bold" className="text-amber-600 md:h-[52px] md:w-[52px]" />
                    </div>
                </div>
                <h1 className="text-4xl font-medium text-foreground md:text-5xl">
                    Checkout Cancelled
                </h1>
                <p className="max-w-md text-base text-muted-foreground">
                    No payment was taken and you haven't been subscribed. You can pick a plan and try again whenever you're ready.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button
                        onClick={() => navigate("/dashboard/billing/plans", { replace: true })}
                        className="rounded-full bg-primary px-8 py-6 text-base font-medium hover:bg-primary/90"
                    >
                        View Plans
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard/billing", { replace: true })}
                        className="rounded-full px-8 py-6 text-base font-medium"
                    >
                        Back to Billing
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCancelled
