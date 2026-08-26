import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
import { marketerProfileSchema, type MarketerProfileFormData } from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ERROR_DETAIL, extractErrorMessage, getErrorDetail, getErrorStatus } from "@/features/auth/authErrors";
import type { AuthLoginResponse } from "@/types/auth.types";

const MarketerProfile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { isAuthenticated, applyAuthSession } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/marketer-signup", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const form = useForm<MarketerProfileFormData>({
        resolver: zodResolver(marketerProfileSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: MarketerProfileFormData) => {
        setIsSubmitting(true);
        try {
            const response = await authService.marketerUpdateProfile({
                first_name: data.firstName,
                last_name: data.lastName,
                phone_number: data.phoneNumber,
            });

            if ("access_token" in response) {
                applyAuthSession(response as AuthLoginResponse);
                navigate("/marketer-referral-link", { replace: true });
            } else {
                toast({
                    title: "Almost there",
                    description: response.message,
                });
            }
        } catch (error) {
            const status = getErrorStatus(error);
            const detail = getErrorDetail(error);

            if (
                status === 401 ||
                detail === AUTH_ERROR_DETAIL.ONBOARDING_ALREADY_COMPLETED ||
                detail === AUTH_ERROR_DETAIL.MARKETER_PROFILE_UPDATE_BEFORE_OTP
            ) {
                toast({
                    title: "Let's start over",
                    description:
                        detail === AUTH_ERROR_DETAIL.ONBOARDING_ALREADY_COMPLETED
                            ? "This signup is already complete. Please sign in."
                            : "Your session has expired. Please sign up again.",
                    variant: "destructive",
                });
                navigate(
                    detail === AUTH_ERROR_DETAIL.ONBOARDING_ALREADY_COMPLETED ? "/login" : "/marketer-signup",
                    { replace: true }
                );
                return;
            }

            toast({
                title: "Could not save details",
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
                    Tell us about you
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    A few details to finish setting up your marketer account.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
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
                        {isSubmitting ? "Saving..." : "Continue"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default MarketerProfile;
