import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { AuthLayout } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ERROR_DETAIL, getErrorDetail, getErrorStatus } from "@/features/auth/authErrors";
import { PENDING_PROFILE_REDIRECT, resumePendingVerification } from "@/features/auth/resumeOnboarding";

const Login = () => {
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
            navigate(from?.pathname ?? "/dashboard", { replace: true });
        } catch (error) {
            const status = getErrorStatus(error);
            const detail = getErrorDetail(error);

            // Login intentionally returns 403 (not a token/permission error)
            // for two known signup states so the frontend can route the user
            // to finish onboarding instead of just failing the login attempt.
            if (status === 403 && detail === AUTH_ERROR_DETAIL.EMAIL_VERIFICATION_REQUIRED) {
                try {
                    const route = await resumePendingVerification(data.email);
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
                    navigate("/signup");
                }
                return;
            }

            if (status === 403 && detail === AUTH_ERROR_DETAIL.AGENCY_SIGNUP_INCOMPLETE) {
                toast({
                    title: "Finish setting up your agency",
                    description: "Your signup is incomplete. Let's pick up where you left off.",
                });
                navigate("/signup", { state: { email: data.email, password: data.password } });
                return;
            }

            const message =
                status === 401
                    ? "Invalid email or password."
                    : detail ?? "Something went wrong. Please try again.";
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
        <AuthLayout currentStep={0} totalSteps={1} showProgress={false}>
            <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                        Welcome back!
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Enter your details to get access to your account.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>

                        <div className="space-y-4 text-center text-sm">
                            <div>
                                Forgot your passsword?{" "}
                                <Link to="/forgot-password" className="text-progress font-medium hover:underline">
                                    Click here
                                </Link>
                            </div>
                            <div>
                                Dont have an account?{" "}
                                <Link to="/signup" className="text-progress font-medium hover:underline">
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default Login;
