import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
    changePasswordSchema,
    type ChangePasswordFormData,
} from "@/lib/validations/auth";
import * as authService from "@/features/auth/api/authService";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { extractErrorMessage } from "@/features/auth/authErrors";

interface ChangePasswordRequiredProps {
    redirectTo?: string;
}

const ChangePasswordRequired = ({ redirectTo = "/dashboard" }: ChangePasswordRequiredProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const { refreshUser } = useAuth();
    const navigate = useNavigate();

    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        setIsSubmitting(true);
        try {
            await authService.changePassword({
                current_password: data.currentPassword,
                new_password: data.newPassword,
            });
            await refreshUser();
            toast({ title: "Password updated", description: "Your password has been changed." });
            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast({
                title: "Update failed",
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
                        Set a New Password
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        For your security, you need to set a new password before continuing.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Temporary Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Enter your temporary password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showCurrentPassword ? (
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
                            control={form.control}
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
                            disabled={!form.formState.isValid || isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Set Password"}
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default ChangePasswordRequired;
