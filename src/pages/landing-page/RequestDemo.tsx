import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import { useToast } from "@/hooks/use-toast";

export default function RequestDemo() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        agencyName: "",
        message: ""
    });
    const [isValid, setIsValid] = useState(false);
    const { toast } = useToast();

    const logos = Array(4).fill("/assets/logo-dark.png"); // Using placeholders as per design, updated to match style

    const nextSteps = [
        { number: 1, text: "We receive your demo request" },
        { number: 2, text: "We contact you to schedule" },
        { number: 3, text: "You receive an access to demo" },
    ];

    const formatStepText = (text: string) => {
        const words = text.split(" ");
        const firstTwo = words.slice(0, 2).join(" ");
        const rest = words.slice(2).join(" ");
        return (
            <>
                <span className="text-secondary">{firstTwo}</span>{" "}
                <span className="text-[#FFF2CE]">{rest}</span>
            </>
        );
    };

    useEffect(() => {
        const { fullName, email, phoneNumber, agencyName } = formData;
        setIsValid(
            fullName.trim() !== "" &&
            email.trim() !== "" &&
            phoneNumber.trim() !== "" &&
            agencyName.trim() !== ""
        );
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Demo request submitted:", formData);

        toast({
            title: "Request Received",
            description: "Thank you for your interest. We'll be in touch shortly to schedule your demo.",
        });

        // Optional: Reset form
        setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            agencyName: "",
            message: ""
        });
    };

    return (
        <div className="min-h-screen bg-page-background flex flex-col">
            <Header />

            <main className="flex-grow flex flex-col items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start mb-24">

                    {/* Left Column: Info */}
                    <div className="flex flex-col justify-center h-full pt-4">
                        <div>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-normal text-xs mb-8 tracking-widest uppercase">
                                GET A DEMO
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-medium mb-6">
                                Join the Agencies Protecting Their Commissions with Property Eye
                            </h1>

                            <p className="text-gray-500 text-lg mb-12 max-w-xl leading-relaxed">
                                Learn how Property Eye helps real estate teams detect fraud early, stay
                                compliant, and protect every earned commission.
                            </p>

                            <div className="mt-8">
                                <h3 className="text-progress text-sm font-medium uppercase tracking-wider mb-6">
                                    GREAT TEAMS USE PROPERTY EYE
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {/* Placeholder for partner logos - using a simple grayscale style */}
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">Imagine AI</span>
                                    </div>
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">Astra</span>
                                    </div>
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">Atlas</span>
                                    </div>
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">Queue</span>
                                    </div>
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">Layer</span>
                                    </div>
                                    <div className="bg-gray-100/50 rounded-xl h-16 flex items-center justify-center p-4">
                                        <span className="text-gray-400 font-bold text-lg">bolt</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white rounded-xl p-4 md:p-8">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="font-medium text-sm text-primary">Full Name</label>
                                <Input
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="font-medium text-sm text-primary">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phoneNumber" className="font-medium text-sm text-primary">Phone Number</label>
                                <Input
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="agencyName" className="font-medium text-sm text-primary">Agency Name</label>
                                <Input
                                    id="agencyName"
                                    placeholder="Enter your agency name"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.agencyName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="font-medium text-sm text-primary">Message</label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your message..."
                                    className="bg-white border-gray-200 min-h-[120px] resize-none"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                className={`w-full h-12 text-white font-medium rounded-full mt-4 transition-colors ${isValid ? 'bg-primary hover:bg-primary/90' : 'bg-gray-200 hover:bg-gray-300'}`}
                                disabled={!isValid}
                            >
                                Submit Request
                            </Button>
                        </form>
                    </div>

                </div>

                {/* Next Steps Section */}
                <div className="w-full max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-xs mb-6 tracking-widest uppercase">
                            NEXT STEPS
                        </div>
                        <h2 className="text-3xl md:text-4xl font-medium text-black leading-tight">
                            Here’s what you can expect <br className="hidden md:block" /> to happen next
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {nextSteps.map((step) => (
                            <div
                                key={step.number}
                                className="bg-primary rounded-2xl p-8 min-h-0 md:min-h-[450px] flex flex-col justify-between relative overflow-hidden group hover:translate-y-[-8px] transition-transform duration-300"
                            >
                                {/* Number */}
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl font-medium mb-8">
                                    {step.number}
                                </div>
                                {/* Text */}
                                <h3 className="text-lg md:text-2xl lg:text-3xl font-medium leading-tight">
                                    {formatStepText(step.text)}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}