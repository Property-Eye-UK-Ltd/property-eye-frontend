import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: LoginFormData) => {
        console.log("Login data:", data);
        // Handle login logic here
    };

    return (
        <AuthLayout currentStep={0} totalSteps={1}>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Welcome back!
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Enter your details to get access to your account.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            className="w-full h-12 text-base font-medium"
                            disabled={!form.formState.isValid}
                        >
                            Login
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
