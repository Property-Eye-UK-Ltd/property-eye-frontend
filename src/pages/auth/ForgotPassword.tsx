import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeSlash } from "iconsax-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    forgotPasswordSchema,
    resetPasswordSchema,
    type ForgotPasswordFormData,
    type ResetPasswordFormData,
} from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useToast } from "@/hooks/use-toast";
import { extractErrorMessage } from "@/features/auth/authErrors";

const ForgotPassword = () => {
    const [step, setStep] = useState<"request" | "reset">("request");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const resetForm = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            resetCode: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const { reset: resetNewPasswordForm } = resetForm;

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsSubmitting(true);
        try {
            const response = await authService.forgotPassword({ email: data.email });
            toast({ title: "Check your email", description: response.message });
            setStep("reset");
            resetNewPasswordForm();
        } catch (error) {
            toast({
                title: "Request failed",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onResetSubmit = async (data: ResetPasswordFormData) => {
        setIsSubmitting(true);
        try {
            const response = await authService.resetPassword({
                reset_code: data.resetCode,
                new_password: data.newPassword,
            });
            toast({ title: "Password reset", description: response.message });
            navigate("/login", { replace: true });
        } catch (error) {
            // reset-password's only documented failure is 400 "Reset code is
            // invalid or expired" (backend/src/services/auth_service.py) —
            // extractErrorMessage surfaces that exact detail directly.
            toast({
                title: "Reset failed",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout currentStep={0} totalSteps={1} showProgress={false}>
            <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                        {step === "request" ? "Forgot Password" : "Set New Password"}
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        {step === "request"
                            ? "Enter your email to reset your password, we'll send a reset link to your registered email."
                            : "Create a new password for your account. Make sure it's strong and secure."}
                    </p>
                </div>

                {step === "request" ? (
                    <Form key="request" {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-medium rounded-full"
                                disabled={!form.formState.isValid || isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Reset Password"}
                            </Button>

                            <div className="text-center text-sm">
                                <Link to="/login" className="text-progress font-medium hover:underline">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <Form key="reset" {...resetForm}>
                        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-5 sm:space-y-6">
                            <FormField
                                control={resetForm.control}
                                name="resetCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reset Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the code sent to your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={resetForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Enter a new password"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeSlash size="20" variant="Linear" />
                                                    ) : (
                                                        <Eye size="20" variant="Linear" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={resetForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Re-enter a new password"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeSlash size="20" variant="Linear" />
                                                    ) : (
                                                        <Eye size="20" variant="Linear" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-medium rounded-full"
                                disabled={!resetForm.formState.isValid || isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Set Password"}
                            </Button>

                            <div className="text-center text-sm">
                                <Link to="/login" className="text-progress font-medium hover:underline">
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;

