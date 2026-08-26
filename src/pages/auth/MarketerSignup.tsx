import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { marketerSignupSchema, type MarketerSignupFormData } from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { setAuthToken } from "@/lib/apiClient";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { extractErrorMessage, getErrorStatus } from "@/features/auth/authErrors";
import {
    resolveMarketerOnboardingRoute,
    setMarketerOnboardingEmail,
    setMarketerOnboardingOtpExpiresAt,
} from "@/features/auth/marketerOnboardingStorage";

const MarketerSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const { refreshUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { email?: string; password?: string } | null;

    const form = useForm<MarketerSignupFormData>({
        resolver: zodResolver(marketerSignupSchema),
        defaultValues: {
            email: state?.email ?? "",
            password: state?.password ?? "",
            confirmPassword: "",
            termsAccepted: !!state,
        },
        mode: "onChange",
    });

    const onSubmit = async (data: MarketerSignupFormData) => {
        setIsSubmitting(true);
        try {
            const response = await authService.marketerRegister({
                email: data.email,
                password: data.password,
            });
            setMarketerOnboardingEmail(response.email);
            if (response.otp_expires_at) {
                setMarketerOnboardingOtpExpiresAt(response.otp_expires_at);
            }
            // A resumed draft past OTP verification comes back with a real
            // session already (see start_onboarding_session's resume path) —
            // apply it the same way OTP verification itself does.
            if (response.access_token && response.expires_in) {
                setAuthToken(response.access_token, response.expires_in);
                await refreshUser();
            }
            navigate(resolveMarketerOnboardingRoute(response.next_step));
        } catch (error) {
            const status = getErrorStatus(error);

            if (status === 409) {
                toast({
                    title: "Account already exists",
                    description: "An account with this email already exists. Please sign in instead.",
                });
                navigate("/login");
                return;
            }

            toast({
                title: "Sign up failed",
                description: extractErrorMessage(error, "Something went wrong. Please try again."),
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
                    Become a Property Eye referral partner!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Start by entering your details. This helps us personalize your experience
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
                                <FormLabel>Create Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
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
                                <p className="text-xs text-muted-foreground mt-2">
                                    Password must be at least 8 Characters and must contain at least a Capital Letter, a Number and a Special Character.
                                </p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

                    <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal text-muted-foreground">
                                        By ticking, you are confirming that you have read, understood and agree to the Property Eye <Link to="/terms-and-conditions" className="text-progress hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-progress hover:underline">Privacy Policy</Link>.
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium rounded-full"
                        disabled={!form.formState.isValid || isSubmitting}
                    >
                        {isSubmitting
                            ? (state?.email ? "Resuming setup..." : "Creating account...")
                            : (state?.email ? "Resume Setup" : "Create Account")}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-progress font-medium hover:underline">
                            Login
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default MarketerSignup;
