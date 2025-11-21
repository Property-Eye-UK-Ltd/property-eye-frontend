import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";

const OTPVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(119); // 1:59s

    useEffect(() => {
        if (timeLeft > 0 && !isVerified) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft, isVerified]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleConfirm = () => {
        if (otp.length === 6) {
            // Mock verification logic
            setIsVerified(true);
        }
    };

    const handleProceed = () => {
        // Navigate to next step (Agency Owner Info)
        navigate("/agency-owner-info");
    };


    return (
        <div className="space-y-8">
            {!isVerified ? (
                // INPUT STATE
                <>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-medium text-foreground">
                            Verify your account
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Enter the one-time code sent to your mobile number to secure your account.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-8">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="w-12 h-14 text-lg border-primary" />
                                <InputOTPSlot index={1} className="w-12 h-14 text-lg border-primary" />
                                <InputOTPSlot index={2} className="w-12 h-14 text-lg border-primary" />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className="w-12 h-14 text-lg border-primary" />
                                <InputOTPSlot index={4} className="w-12 h-14 text-lg border-primary" />
                                <InputOTPSlot index={5} className="w-12 h-14 text-lg border-primary" />
                            </InputOTPGroup>
                        </InputOTP>

                        <div className="text-sm text-muted-foreground">
                            <button
                                className="px-3 py-1 bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                disabled={timeLeft > 0}
                            >
                                Resend OTP
                            </button>
                            <span className="ml-2">in {formatTime(timeLeft)}s</span>
                        </div>

                        <Button
                            className="w-full h-12 text-base font-medium rounded-full"
                            onClick={handleConfirm}
                            disabled={otp.length !== 6}
                        >
                            Confirm
                        </Button>
                    </div>
                </>
            ) : (
                // SUCCESS STATE
                <div className="flex flex-col space-y-6 py-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-medium text-foreground">
                            Account has been Successfully Verified
                        </h1>
                        <p className="text-base text-muted-foreground">
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
