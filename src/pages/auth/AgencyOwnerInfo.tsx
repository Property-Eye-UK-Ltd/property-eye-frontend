import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { Profile, CloudAdd } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { agencyOwnerSchema, type AgencyOwnerFormData } from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useToast } from "@/hooks/use-toast";
import type { ApiErrorResponse } from "@/types/auth.types";
import { getOnboardingToken } from "@/features/auth/onboardingStorage";

const AgencyOwnerInfo = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const onboardingToken = getOnboardingToken();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!onboardingToken) {
            navigate("/signup", { replace: true });
        }
    }, [onboardingToken, navigate]);

    const form = useForm<AgencyOwnerFormData>({
        resolver: zodResolver(agencyOwnerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "",
            address: "",
        },
        mode: "onChange",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: AgencyOwnerFormData) => {
        if (!onboardingToken) return;
        setIsSubmitting(true);
        try {
            // Note: profile_image_url expects an uploaded file URL from the backend;
            // no upload endpoint is wired yet, so the image field is not sent.
            await authService.agencyUpdateProfile(
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    gender: data.gender,
                    address: data.address,
                },
                onboardingToken
            );
            navigate("/agency-information");
        } catch (error) {
            const message =
                isAxiosError<ApiErrorResponse>(error) && typeof error.response?.data?.detail === "string"
                    ? error.response.data.detail
                    : "Something went wrong. Please try again.";
            toast({ title: "Could not save details", description: message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground">
                    Agency owner information
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Provide the details of the primary account owner responsible for this agency.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">

                    {/* Profile Image Upload */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <Profile size="40" variant="Bulk" className="text-muted-foreground" />
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="profile-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full text-sm font-medium transition-colors"
                            >
                                <CloudAdd size="18" variant="Bulk" className="mr-2" />
                                Import profile image
                            </label>
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

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
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your address" {...field} />
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

export default AgencyOwnerInfo;
