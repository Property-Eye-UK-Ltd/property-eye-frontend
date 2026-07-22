import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Eye, EyeSlash } from "iconsax-react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    forgotPasswordSchema,
    resetPasswordSchema,
    type ForgotPasswordFormData,
    type ResetPasswordFormData,
} from "@/lib/validations/auth"
import * as authService from "@/features/auth/api/authService"
import { extractErrorMessage } from "@/features/auth/authErrors"

const AdminForgotPassword = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState<"request" | "reset">("request")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    const resetForm = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            resetCode: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })

    const { reset: resetNewPasswordForm } = resetForm

    const onEmailSubmit = async (values: ForgotPasswordFormData) => {
        setIsLoading(true)
        try {
            const response = await authService.adminForgotPassword({ email: values.email })
            toast.success(response.message)
            setStep("reset")
            resetNewPasswordForm()
        } catch (error) {
            toast.error(extractErrorMessage(error, "Failed to send reset link. Please try again."))
        } finally {
            setIsLoading(false)
        }
    }

    const onPasswordSubmit = async (values: ResetPasswordFormData) => {
        setIsLoading(true)
        try {
            const response = await authService.adminResetPassword({
                reset_code: values.resetCode,
                new_password: values.newPassword,
            })
            toast.success(response.message)
            navigate("/admin/login")
        } catch (error) {
            toast.error(extractErrorMessage(error, "Failed to reset password. Please try again."))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-medium text-foreground">
                    {step === "request" ? "Forgot Password" : "Set New Password"}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    {step === "request"
                        ? "Enter your email to reset your password, we'll send a reset code to your registered email."
                        : "Enter the reset code sent to your email along with a new password."}
                </p>
            </div>

            {step === "request" ? (
                <Form key="request" {...form}>
                    <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-4 sm:space-y-6">
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
                            className="w-full rounded-full"
                            size="lg"
                            disabled={!form.formState.isValid || isLoading}
                        >
                            {isLoading ? "Sending..." : "Reset Password"}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/login")}
                                className="text-sm text-progress font-medium hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </Form>
            ) : (
                <Form key="reset" {...resetForm}>
                    <form onSubmit={resetForm.handleSubmit(onPasswordSubmit)} className="space-y-4 sm:space-y-6">
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
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showNewPassword ? (
                                                    <EyeSlash size={20} variant="Outline" />
                                                ) : (
                                                    <Eye size={20} variant="Outline" />
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
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeSlash size={20} variant="Outline" />
                                                ) : (
                                                    <Eye size={20} variant="Outline" />
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
                            className="w-full rounded-full"
                            size="lg"
                            disabled={!resetForm.formState.isValid || isLoading}
                        >
                            {isLoading ? "Setting..." : "Set Password"}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/login")}
                                className="text-sm text-progress font-medium hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}

export default AdminForgotPassword
