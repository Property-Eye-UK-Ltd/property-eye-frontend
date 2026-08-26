import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Profile, CloudAdd } from "iconsax-react";
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
import { agencyInfoSchema, type AgencyInfoFormData } from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { AuthLoginResponse } from "@/types/auth.types";
import { AUTH_ERROR_DETAIL, extractErrorMessage, getErrorDetail, getErrorStatus } from "@/features/auth/authErrors";
import { clearOnboardingStorage } from "@/features/auth/onboardingStorage";
import { consumeRedirectIntent, resolveRedirectPath } from "@/features/auth/redirectIntent";

const AgencyInformation = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { isAuthenticated, applyAuthSession } = useAuth();
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signup", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const form = useForm<AgencyInfoFormData>({
        resolver: zodResolver(agencyInfoSchema),
        defaultValues: {
            agencyName: "",
            agencyAddress: "",
        },
        mode: "onChange",
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: AgencyInfoFormData) => {
        setIsSubmitting(true);
        try {
            let agencyLogoUrl = undefined;
            if (selectedFile) {
                const imageData = await authService.uploadImage(selectedFile, "logo");
                agencyLogoUrl = imageData.url;
            }

            const response = await authService.agencyUpdateOnboardingProfile({
                agency_name: data.agencyName,
                agency_address: data.agencyAddress,
                agency_logo_url: agencyLogoUrl,
            });
            if ("access_token" in response) {
                const authResponse = response as AuthLoginResponse;
                applyAuthSession(authResponse);
                clearOnboardingStorage();
                navigate(
                    resolveRedirectPath(consumeRedirectIntent(), authResponse.portal_context),
                    { replace: true }
                );
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
                detail === AUTH_ERROR_DETAIL.PROFILE_UPDATE_BEFORE_OTP
            ) {
                clearOnboardingStorage();
                toast({
                    title: "Let's start over",
                    description:
                        detail === AUTH_ERROR_DETAIL.ONBOARDING_ALREADY_COMPLETED
                            ? "This signup is already complete. Please sign in."
                            : "Your session has expired. Please sign up again.",
                    variant: "destructive",
                });
                navigate(
                    detail === AUTH_ERROR_DETAIL.ONBOARDING_ALREADY_COMPLETED ? "/login" : "/signup",
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
                    Agency information
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Tell us a bit more about your agency.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">

                    {/* Agency Logo Upload */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                            {previewLogo ? (
                                <img src={previewLogo} alt="Agency Logo" className="w-full h-full object-cover" />
                            ) : (
                                <Profile size="40" variant="Bulk" className="text-muted-foreground" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="logo-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full text-sm font-medium transition-colors"
                            >
                                <CloudAdd size="18" variant="Bulk" className="mr-2" />
                                Import agency logo
                            </label>
                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleLogoChange}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="agencyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agency Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agency name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="agencyAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agency Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter agency address" {...field} />
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
                        {isSubmitting ? "Finishing..." : "Finish"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AgencyInformation;
