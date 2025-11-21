import { useState } from "react";
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

const AgencyInformation = () => {
    const navigate = useNavigate();
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: AgencyInfoFormData) => {
        console.log("Agency Info data:", data);
        // Handle final submission or next step
        // navigate("/dashboard"); // Example
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-medium text-foreground">
                    Agency information
                </h1>
                <p className="text-base text-muted-foreground">
                    Tell us a bit more about your agency.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Agency Logo Upload */}
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                            {previewLogo ? (
                                <img src={previewLogo} alt="Agency Logo" className="w-full h-full object-cover" />
                            ) : (
                                <Profile size="40" variant="Bulk" className="text-muted-foreground" />
                            )}
                        </div>
                        <div>
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
                        disabled={!form.formState.isValid}
                    >
                        Finish
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AgencyInformation;
