import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { AuthLayout } from "@/components/auth";
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
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ERROR_DETAIL, extractErrorMessage, getErrorDetail, getErrorStatus } from "@/features/auth/authErrors";
import {
    ONBOARDING_EMAIL_KEY,
    ONBOARDING_OTP_EXPIRES_AT_KEY,
    resolveOnboardingRoute,
    setOnboardingToken,
} from "@/features/auth/onboardingStorage";
import { captureRedirectIntent } from "@/features/auth/redirectIntent";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const state = location.state as { email?: string; password?: string } | null;

    useEffect(() => {
        captureRedirectIntent(searchParams);
    }, [searchParams]);

    const referralCodeFromUrl = searchParams.get("ref") ?? "";

    // Set only when arriving via a marketer-generated agency invite link
    // (?token=<invite_token>, see backend send_agency_invite_email). Passed
    // straight through as a query param — the backend resolves attribution
    // from it, it isn't a form field the user edits.
    const inviteToken = searchParams.get("token") ?? undefined;

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            phoneNumber: "",
            email: state?.email ?? "",
            password: state?.password ?? "",
            confirmPassword: "",
            referralCode: referralCodeFromUrl,
            termsAccepted: !!state,
        },
        mode: "onChange",
    });

    const onSubmit = async (data: SignupFormData) => {
        setIsSubmitting(true);
        try {
            const trimmedReferralCode = data.referralCode?.trim();
            const response = await authService.agencyRegister(
                {
                    phone_number: data.phoneNumber,
                    email: data.email,
                    password: data.password,
                },
                {
                    ...(trimmedReferralCode ? { ref: trimmedReferralCode } : {}),
                    ...(inviteToken ? { token: inviteToken } : {}),
                }
            );
            sessionStorage.setItem(ONBOARDING_EMAIL_KEY, response.email);
            if (response.otp_expires_at) {
                sessionStorage.setItem(ONBOARDING_OTP_EXPIRES_AT_KEY, response.otp_expires_at);
            }
            if (response.token) {
                setOnboardingToken(response.token);
            }
            navigate(resolveOnboardingRoute(response.next_step));
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

            if (status === 400 && getErrorDetail(error) === AUTH_ERROR_DETAIL.REFERRAL_CODE_INVALID) {
                form.setError("referralCode", {
                    type: "manual",
                    message: "This referral code isn't valid. Check it or leave it blank.",
                });
                setIsSubmitting(false);
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
                    Let's get your agency set up!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Start by entering your agency details. This helps us personalize your experience
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agency Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agency phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agency Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agency email address" {...field} />
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
                        name="referralCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Referral Code (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter a referral code, if you have one"
                                        readOnly={!!referralCodeFromUrl}
                                        className={referralCodeFromUrl ? "bg-muted cursor-not-allowed opacity-80" : ""}
                                        {...field}
                                    />
                                </FormControl>
                                {referralCodeFromUrl && field.value === referralCodeFromUrl && (
                                    <p className="text-xs text-muted-foreground">
                                        Applied from your invite link.
                                    </p>
                                )}
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
                                        By ticking, you are confirming that you have read, understood and agree to the Property Eye <Link to="/terms" className="text-progress hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-progress hover:underline">Privacy Policy</Link>.
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
                        <Link
                            to={{ pathname: "/login", search: searchParams.toString() }}
                            className="text-progress font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Signup;
