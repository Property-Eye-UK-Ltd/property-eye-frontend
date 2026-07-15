import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { AuthLayout } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import * as authService from "@/features/auth/api/authService";
import { useToast } from "@/hooks/use-toast";
import type { ApiErrorResponse } from "@/types/auth.types";
import {
    ONBOARDING_OTP_EXPIRES_AT_KEY,
    getOnboardingEmail,
    setOnboardingToken,
} from "@/features/auth/onboardingStorage";

const DEFAULT_OTP_WINDOW_SECONDS = 600; // 10 minutes
const MAX_VERIFY_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 30;

const secondsUntil = (isoTimestamp: string) =>
    Math.max(0, Math.floor((new Date(isoTimestamp).getTime() - Date.now()) / 1000));

const OTPVerification = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const email = getOnboardingEmail();
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => {
        const storedExpiry = sessionStorage.getItem(ONBOARDING_OTP_EXPIRES_AT_KEY);
        return storedExpiry ? secondsUntil(storedExpiry) : DEFAULT_OTP_WINDOW_SECONDS;
    });
    const [verifyAttempts, setVerifyAttempts] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!email) {
            navigate("/signup", { replace: true });
        }
    }, [email, navigate]);

    // Handle OTP expiration
    useEffect(() => {
        if (timeLeft <= 0 && !isVerified) {
            setIsExpired(true);
            toast({
                title: "Code expired",
                description: "Your verification code has expired. Please request a new one.",
                variant: "destructive",
            });
        }
    }, [timeLeft, isVerified, toast]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0 && !isVerified && !isExpired) {
            timerRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => {
                if (timerRef.current) clearTimeout(timerRef.current);
            };
        }
    }, [timeLeft, isVerified, isExpired]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const canResend = timeLeft === 0 || isExpired;
    const attemptsRemaining = MAX_VERIFY_ATTEMPTS - verifyAttempts;
    const isAttemptsExhausted = verifyAttempts >= MAX_VERIFY_ATTEMPTS;

    const handleConfirm = async () => {
        if (otp.length !== 6 || !email || isSubmitting || isAttemptsExhausted || isExpired) return;

        setIsSubmitting(true);
        try {
            const response = await authService.agencyVerifyOtp({ email, otp_code: otp });
            if (response.token) {
                setOnboardingToken(response.token);
            }
            setIsVerified(true);
            toast({
                title: "Verified successfully",
                description: "Your account has been verified.",
            });
        } catch (error) {
            setVerifyAttempts((prev) => prev + 1);
            const status = isAxiosError<ApiErrorResponse>(error) ? error.response?.status : undefined;
            const isInvalidCode = status === 400;

            const message = isInvalidCode
                ? `Invalid code. ${attemptsRemaining - 1} attempt${attemptsRemaining - 1 !== 1 ? "s" : ""} remaining.`
                : isAxiosError<ApiErrorResponse>(error) && typeof error.response?.data?.detail === "string"
                ? error.response.data.detail
                : "Verification failed. Please try again.";

            toast({
                title: isInvalidCode ? "Invalid code" : "Verification failed",
                description: message,
                variant: "destructive",
            });

            // Clear OTP for retry
            setOtp("");

            // Suggest resend after max attempts
            if (verifyAttempts >= MAX_VERIFY_ATTEMPTS - 1) {
                toast({
                    title: "Too many attempts",
                    description: "Please request a new code to continue.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!email || isResending) return;

        setIsResending(true);
        try {
            const response = await authService.agencyResendOtp({ email });
            setResendAttempts((prev) => prev + 1);

            if (response.otp_expires_at) {
                sessionStorage.setItem(ONBOARDING_OTP_EXPIRES_AT_KEY, response.otp_expires_at);
                setTimeLeft(secondsUntil(response.otp_expires_at));
            } else {
                setTimeLeft(DEFAULT_OTP_WINDOW_SECONDS);
            }

            // Reset verification attempts on resend
            setVerifyAttempts(0);
            setIsExpired(false);
            setOtp("");

            toast({
                title: "New code sent",
                description: response.message || "A new verification code has been sent to your mobile.",
            });
        } catch (error) {
            const message =
                isAxiosError<ApiErrorResponse>(error) && typeof error.response?.data?.detail === "string"
                    ? error.response.data.detail
                    : "Could not resend the code. Please try again in a moment.";
            toast({
                title: "Resend failed",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsResending(false);
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
                            onChange={(value) => setOtp(value)}
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
                                className="px-3 py-1 bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                disabled={timeLeft > 0 || isResending}
                                onClick={handleResend}
                            >
                                {isResending ? "Resending..." : "Resend OTP"}
                            </button>
                            <span className="ml-2">in {formatTime(timeLeft)}s</span>
                        </div>

                        <Button
                            className="w-full h-12 text-base font-medium rounded-full"
                            onClick={handleConfirm}
                            disabled={otp.length !== 6 || isSubmitting}
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
