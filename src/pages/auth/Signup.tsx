import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            phoneNumber: "",
            email: "",
            password: "",
            termsAccepted: false,
        },
        mode: "onChange", // Enable real-time validation for button state
    });

    const onSubmit = (data: SignupFormData) => {
        console.log("Signup data:", data);
        // Handle signup logic here
    };

    return (
        <AuthLayout currentStep={0} totalSteps={4}>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Let's get your agency set up!
                    </h1>
                    <p className="text-base text-muted-foreground">
                        Start by entering your agency details. This helps us personalize your experience
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            className="w-full h-12 text-base font-medium"
                            disabled={!form.formState.isValid}
                        >
                            Create Account
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
        </AuthLayout>
    );
};

export default Signup;
