import { useState } from "react"
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

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const AdminLogin = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange", // Enable real-time validation
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // TODO: Implement super admin login API call
            console.log("Super Admin Login:", values)
            toast.success("Login successful!")
            // Navigate to super admin dashboard
            navigate("/admin/dashboard")
        } catch (error) {
            toast.error("Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-medium text-foreground">
                    Welcome back!
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Enter your details to get access to your account.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
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
                        disabled={!form.formState.isValid || isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/forgot-password")}
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Forgot your password?{" "}
                            <span className="text-progress font-medium">Click here</span>
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AdminLogin
