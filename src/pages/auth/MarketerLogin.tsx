import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash } from "iconsax-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ERROR_DETAIL, getErrorDetail, getErrorStatus, extractErrorMessage } from "@/features/auth/authErrors";
import {
    MARKETER_PENDING_PROFILE_REDIRECT,
    resumeMarketerPendingVerification,
} from "@/features/auth/resumeOnboarding";

const MarketerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        try {
            await login(data.email, data.password);
            const from = (location.state as { from?: Location } | null)?.from;
            navigate(from?.pathname ?? "/marketing/dashboard", { replace: true });
        } catch (error) {
            const status = getErrorStatus(error);
            const detail = getErrorDetail(error);

            if (status === 403 && detail === AUTH_ERROR_DETAIL.MARKETER_EMAIL_VERIFICATION_REQUIRED) {
                try {
                    const route = await resumeMarketerPendingVerification(data.email);
                    toast({
                        title: "Verify your email",
                        description: "Your account isn't verified yet. We've sent a new code.",
                    });
                    navigate(route);
                } catch (resendError) {
                    toast({
                        title: "Could not resend verification code",
                        description: getErrorDetail(resendError) ?? "Please try signing up again.",
                        variant: "destructive",
                    });
                    navigate(MARKETER_PENDING_PROFILE_REDIRECT);
                }
                return;
            }

            if (status === 403 && detail === AUTH_ERROR_DETAIL.MARKETER_SIGNUP_INCOMPLETE) {
                toast({
                    title: "Finish setting up your partner account",
                    description: "Your signup is incomplete. Let's pick up where you left off.",
                });
                navigate(MARKETER_PENDING_PROFILE_REDIRECT, { state: { email: data.email, password: data.password } });
                return;
            }

            const message =
                status === 401
                    ? "Invalid email or password."
                    : extractErrorMessage(error, "Login failed. Please try again.");
            toast({
                title: "Login failed",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                    Welcome back, partner!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Enter your details to get access to your referral dashboard.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
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
                        disabled={!form.formState.isValid || isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        New referral partner?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/marketer-signup")}
                            className="text-progress font-medium hover:underline"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default MarketerLogin;
