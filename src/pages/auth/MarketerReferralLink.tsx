import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReferralLinkField } from "@/features/marketing/referrals/components/ReferralLinkField";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
    clearMarketerOnboardingStorage,
    getPendingMarketerSession,
} from "@/features/auth/marketerOnboardingStorage";
import type { AuthLoginResponse } from "@/types/auth.types";

const MarketerReferralLink = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { applyAuthSession } = useAuth();
    const [session, setSession] = useState<AuthLoginResponse | null>(null);

    useEffect(() => {
        const pending = getPendingMarketerSession();
        if (!pending || !pending.marketer) {
            toast({
                title: "Session expired",
                description: "Please start the sign up process again.",
                variant: "destructive",
            });
            navigate("/marketer-signup", { replace: true });
            return;
        }
        setSession(pending);
    }, [navigate, toast]);

    const handleProceed = () => {
        if (!session) return;
        applyAuthSession(session);
        clearMarketerOnboardingStorage();
        navigate("/marketing/dashboard", { replace: true });
    };

    if (!session || !session.marketer) {
        return null;
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                    You're all set, {session.first_name ?? "welcome"}!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Here's your personal referral link. Share it with agencies to start earning commission on recovered fraud.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-6">
                <ReferralLinkField url={session.marketer.referral_link} />
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
