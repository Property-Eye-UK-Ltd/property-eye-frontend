import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import * as authService from "@/features/auth/api/authService";
import { setAuthToken } from "@/lib/apiClient";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
    STALE_ONBOARDING_STATE_DETAILS,
    extractErrorMessage,
    getErrorDetail,
    getErrorStatus,
} from "@/features/auth/authErrors";
import {
    getOnboardingEmail,
    getOnboardingOtpExpiresAt,
    setOnboardingOtpExpiresAt,
} from "@/features/auth/onboardingStorage";

const DEFAULT_OTP_WINDOW_SECONDS = 600; // 10 minutes
const MAX_VERIFY_ATTEMPTS = 5;

const secondsUntil = (isoTimestamp: string) => {
    if (!isoTimestamp) return 0;
    const utcTimestamp = isoTimestamp.endsWith("Z") || isoTimestamp.includes("+")
        ? isoTimestamp
        : `${isoTimestamp}Z`;
    return Math.max(0, Math.floor((new Date(utcTimestamp).getTime() - Date.now()) / 1000));
};

const OTPVerification = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { refreshUser } = useAuth();
    const [email, setEmail] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [verifyAttempts, setVerifyAttempts] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // A code is sent by /auth/agency/register right before navigating here
    // (see Signup.tsx), so the expiry timestamp should already be in the
    // onboarding cookie. If it's missing/stale, treat the code as expired so
    // the Resend action is immediately available instead of silently doing
    // nothing.
    useEffect(() => {
        const storedEmail = getOnboardingEmail();
        if (!storedEmail) {
            toast({
                title: "Session expired",
                description: "Please start the sign up process again.",
                variant: "destructive",
            });
            navigate("/signup", { replace: true });
            return;
        }
        setEmail(storedEmail);

        const storedExpiry = getOnboardingOtpExpiresAt();
        setTimeLeft(storedExpiry ? secondsUntil(storedExpiry) : 0);
    }, [navigate, toast]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0 && !isVerified) {
            timerRef.current = setTimeout(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
            return () => {
                if (timerRef.current) clearTimeout(timerRef.current);
            };
        }
    }, [timeLeft, isVerified]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const isExpired = timeLeft <= 0;
    const canResend = timeLeft <= 0;
    const attemptsRemaining = MAX_VERIFY_ATTEMPTS - verifyAttempts;
    const isAttemptsExhausted = verifyAttempts >= MAX_VERIFY_ATTEMPTS;

    // "Signup draft not found" / "OTP can only be resent before verification" /
    // "OTP verification is no longer available" all mean this device's local
    // onboarding state no longer matches the backend record (e.g. a very old
    // session, or the draft already moved past OTP). There's nothing this
    // page can recover from locally, so send the user back to restart.
    const redirectToSignupOnStaleState = useCallback(
        (error: unknown) => {
            const detail = getErrorDetail(error);
            if (detail && STALE_ONBOARDING_STATE_DETAILS.includes(detail)) {
                toast({
                    title: "Let's start over",
                    description: detail,
                    variant: "destructive",
                });
                navigate("/signup", { replace: true });
                return true;
            }
            return false;
        },
        [navigate, toast]
    );

    const handleResend = useCallback(async () => {
        if (!email || isResending) return;

        setIsResending(true);
        try {
            const response = await authService.agencyResendOtp({ email });

            if (response.otp_expires_at) {
                setOnboardingOtpExpiresAt(response.otp_expires_at);
                setTimeLeft(secondsUntil(response.otp_expires_at));
            } else {
                setTimeLeft(DEFAULT_OTP_WINDOW_SECONDS);
            }

            setVerifyAttempts(0);
            setOtp("");

            toast({
                title: "New code sent",
                description: response.message || "Check your mobile for the verification code.",
            });
        } catch (error) {
            if (redirectToSignupOnStaleState(error)) return;
            toast({
                title: "Could not resend code",
                description: extractErrorMessage(error, "Please try again in a moment."),
                variant: "destructive",
            });
        } finally {
            setIsResending(false);
        }
    }, [email, isResending, redirectToSignupOnStaleState, toast]);

    const handleConfirm = async () => {
        if (otp.length !== 6 || !email || isSubmitting || isAttemptsExhausted || isExpired) return;

        setIsSubmitting(true);
        try {
            const response = await authService.agencyVerifyOtp({ email, otp_code: otp });
            // Same session mechanism as an active user from this point on —
            // gated by account status, not a separate onboarding token.
            if (response.access_token && response.expires_in) {
                setAuthToken(response.access_token, response.expires_in);
                await refreshUser();
            }
            setIsVerified(true);
            toast({
                title: "Verified successfully",
                description: "Your account has been verified.",
            });
        } catch (error) {
            if (redirectToSignupOnStaleState(error)) return;

            const nextAttempts = verifyAttempts + 1;
            setVerifyAttempts(nextAttempts);
            const status = getErrorStatus(error);
            const detail = getErrorDetail(error);
            const isInvalidCode = status === 400 && detail === "OTP code is invalid";
            const isCodeExpired = status === 400 && detail === "OTP code is expired";
            const remaining = MAX_VERIFY_ATTEMPTS - nextAttempts;

            if (isCodeExpired) {
                setTimeLeft(0);
                toast({
                    title: "Code expired",
                    description: "That code has expired. Request a new one to continue.",
                    variant: "destructive",
                });
                setOtp("");
                setIsSubmitting(false);
                return;
            }

            const message = isInvalidCode
                ? remaining > 0
                    ? `Invalid code. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`
                    : "Invalid code. Please request a new one."
                : extractErrorMessage(error, "Verification failed. Please try again.");

            toast({
                title: isInvalidCode ? "Invalid code" : "Verification failed",
                description: message,
                variant: "destructive",
            });

            setOtp("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProceed = () => {
        navigate("/agency-owner-info");
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {!isVerified ? (
                // INPUT STATE
                <>
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                            Verify your account
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Enter the one-time code sent to your mobile number to secure your account.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            onChange={(value) => {
                                if (!isAttemptsExhausted) {
                                    setOtp(value);
                                }
                            }}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                                <InputOTPSlot index={1} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                                <InputOTPSlot index={2} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                                <InputOTPSlot index={4} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                                <InputOTPSlot index={5} className="w-10 h-12 sm:w-12 sm:h-14 text-lg border-primary" />
                            </InputOTPGroup>
                        </InputOTP>

                        <div className="text-sm text-muted-foreground">
                            <button
                                type="button"
                                className="px-3 py-1 bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!canResend || isResending}
                                onClick={handleResend}
                            >
                                {isResending ? "Resending..." : "Resend OTP"}
                            </button>
                            {!canResend && <span className="ml-2">in {formatTime(timeLeft)}s</span>}
                        </div>

                        <Button
                            className="w-full h-12 text-base font-medium rounded-full"
                            onClick={handleConfirm}
                            disabled={
                                otp.length !== 6 ||
                                isSubmitting ||
                                isAttemptsExhausted
                            }
                        >
                            {isSubmitting ? "Verifying..." : "Confirm"}
                        </Button>
                    </div>
                </>
            ) : (
                // SUCCESS STATE
                <div className="flex flex-col space-y-5 sm:space-y-6 py-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                            Account has been Successfully Verified
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            You're all set! Continue to the next step to complete your setup
                        </p>
                    </div>

                    <Button
                        className="w-full h-12 text-base font-medium rounded-full bg-[#00072C] hover:bg-[#00072C]/90 text-white"
                        onClick={handleProceed}
                    >
                        Proceed
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OTPVerification;
