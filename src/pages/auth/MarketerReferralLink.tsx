import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const MarketerReferralLink = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuth();

    // The session is already live (set by MarketerProfile's applyAuthSession
    // the moment /auth/marketer/profile completed) — this page just reads
    // the authenticated user's marketer summary rather than tracking its own
    // separate pending-session state.
    useEffect(() => {
        if (!user || !user.marketer) {
            toast({
                title: "Session expired",
                description: "Please start the sign up process again.",
                variant: "destructive",
            });
            navigate("/marketer-signup", { replace: true });
        }
    }, [user, navigate, toast]);

    const handleProceed = () => {
        navigate("/marketing/dashboard", { replace: true });
    };

    if (!user || !user.marketer) {
        return null;
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                    You're all set, {user.first_name ?? "welcome"}!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Here's your personal referral link. Share it with agencies to start earning commission on recovered fraud.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">
                <ReferralLinkField url={user.marketer.referral_link} />
            </div>

            <Button
                className="w-full h-12 text-base font-medium rounded-full"
                onClick={handleProceed}
            >
                Proceed to Dashboard
            </Button>
        </div>
    );
};

export default MarketerReferralLink;
