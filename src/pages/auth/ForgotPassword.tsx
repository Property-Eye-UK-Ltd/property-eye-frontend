import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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

const ForgotPassword = () => {
    const [step, setStep] = useState<"request" | "reset">("request");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const { reset: resetRequestForm, formState } = form;
    const { reset: resetNewPasswordForm } = resetForm;

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setStep("reset");
            resetNewPasswordForm();
            resetRequestForm();
        }
    }, [formState.isSubmitSuccessful, resetNewPasswordForm, resetRequestForm]);

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log("Forgot password data:", data);
        // TODO: trigger password reset email
    };

    const onResetSubmit = (data: ResetPasswordFormData) => {
        console.log("Reset password data:", data);
        // TODO: integrate with API
    };

    return (
        <AuthLayout currentStep={0} totalSteps={1} showProgress={false}>
            <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                        {step === "request" ? "Forgot Password" : "Set New Password"}
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Enter your email to reset your password, we’ll send a reset link to your registered email.
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
                                disabled={!form.formState.isValid}
                            >
                                Reset Password
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
                                disabled={!resetForm.formState.isValid}
                            >
                                Set Password
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

