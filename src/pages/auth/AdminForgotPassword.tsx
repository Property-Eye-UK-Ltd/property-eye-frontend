import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
})

const passwordSchema = z
    .object({
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

const AdminForgotPassword = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState<"request" | "reset">("request")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    })

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })

    const { reset: resetEmailForm, formState } = emailForm
    const { reset: resetPasswordForm } = passwordForm

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setStep("reset")
            resetPasswordForm()
            resetEmailForm()
        }
    }, [formState.isSubmitSuccessful, resetPasswordForm, resetEmailForm])

    const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
        setIsLoading(true)
        try {
            console.log("Super Admin Forgot Password:", values)
            toast.success("Reset link sent to your email!")
        } catch (error) {
            toast.error("Failed to send reset link. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
        setIsLoading(true)
        try {
            console.log("Super Admin Reset Password:", values)
            toast.success("Password reset successfully!")
            navigate("/admin/login")
        } catch (error) {
            toast.error("Failed to reset password. Please try again.")
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
                        ? "Enter your email to reset your password, we'll send a reset link to your registered email."
                        : "Create a new password for your account. Make sure it's strong and secure."}
                </p>
            </div>

            {step === "request" ? (
                <Form key="request" {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4 sm:space-y-6">
                        <FormField
                            control={emailForm.control}
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
                            disabled={!emailForm.formState.isValid || isLoading}
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
                <Form key="reset" {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 sm:space-y-6">
                        <FormField
                            control={passwordForm.control}
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
                            control={passwordForm.control}
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
                            disabled={!passwordForm.formState.isValid || isLoading}
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
