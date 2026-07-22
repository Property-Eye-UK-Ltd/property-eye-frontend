import { Link } from "react-router-dom"

export const SubscriptionBanner = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-950 px-4 py-2.5 text-xs text-amber-100 sm:px-6 sm:text-sm">
            <p>
                <span className="font-semibold text-amber-300">Not Subscribed</span>
                <span className="mx-2 text-amber-100/40">|</span>
                Subscribe to unlock full access to Property Eye.
            </p>
            <Link
                to="/dashboard/billing"
                className="shrink-0 font-medium text-amber-300 hover:text-amber-200 hover:underline"
            >
                Subscribe now
            </Link>
        </div>
    )
}
