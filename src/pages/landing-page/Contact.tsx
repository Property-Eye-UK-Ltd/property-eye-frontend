import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import { Sms, Call, Routing } from "iconsax-react";
import { useToast } from "@/hooks/use-toast";
import { submitContact } from "@/features/public-site/api/publicSiteService";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const { name, email, subject, message } = formData;
        setIsValid(name.trim() !== "" && email.trim() !== "" && subject.trim() !== "" && message.trim() !== "");
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await submitContact(formData);

            toast({
                title: "Message Sent",
                description: "We've received your message and will get back to you shortly.",
            });

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            const detail = (error as AxiosError<{ detail?: string }>).response?.data?.detail;
            toast({
                title: "Message Not Sent",
                description: detail ?? "Something went wrong. Please try again shortly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-page-background flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col justify-center h-full pt-10">
                        <div>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-normal text-xs mb-8 tracking-widest uppercase">
                                GET IN TOUCH
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-medium mb-10 leading-tight">
                                Connect With Us for <br className="hidden sm:block" /> Assistance or Inquiry
                            </h1>

                            <p className="text-gray-500 text-lg mb-12 max-w-lg leading-relaxed">
                                Whether you have a question, need support, or want to learn more about
                                our platform, our team is ready to help.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-auto">
                                {/* Email */}
                                <div className="flex flex-col items-center text-center">
                                    <a 
                                        href="mailto:support@propertyeyeuk.com" 
                                        className="inline-flex items-center justify-center p-3.5 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-[#FFBD09] hover:scale-110 transition-all duration-300 mb-3"
                                        title="support@propertyeyeuk.com"
                                    >
                                        <Sms variant="Outline" size={24} />
                                    </a>
                                    <h3 className="font-medium mb-2">Email</h3>
                                    <p className="text-gray-500 text-xs md:text-sm">Have a question or want to collaborate?</p>
                                </div>

                                {/* Call */}
                                <div className="flex flex-col items-center text-center">
                                    <a 
                                        href="tel:+447860468665" 
                                        className="inline-flex items-center justify-center p-3.5 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-[#FFBD09] hover:scale-110 transition-all duration-300 mb-3"
                                        title="+44 7860 468665"
                                    >
                                        <Call variant="Outline" size={24} />
                                    </a>
                                    <h3 className="font-medium mb-2">Call</h3>
                                    <p className="text-gray-500 text-xs md:text-sm">Need to talk it through? Let's connect.</p>
                                </div>

                                {/* Address */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-primary/5 text-primary mb-3">
                                        <Routing variant="Outline" size={24} />
                                    </div>
                                    <h3 className="font-medium mb-2">Address</h3>
                                    <p className="text-gray-500 text-xs md:text-sm">
                                        123, Phantom Avenue, Bournemouth, United Kingdom
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Right Column: Contact Form */}
                    <div className="bg-white rounded-xl p-4 md:p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="font-medium text-sm">Name</label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="font-medium text-sm">Email</label>
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
                                <label htmlFor="subject" className="font-medium text-sm">Subject</label>
                                <Input
                                    id="subject"
                                    placeholder="Enter the subject"
                                    className="bg-white border-gray-200 h-12"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="font-medium text-sm">Message</label>
                                <Textarea
                                    id="message"
                                    placeholder="Enter your message..."
                                    className="bg-white border-gray-200 min-h-[160px] resize-none"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                className={`w-full h-12 text-white font-medium rounded-full mt-4 transition-colors ${isValid ? 'bg-primary hover:bg-primary/90' : 'bg-gray-200 hover:bg-gray-300'}`}
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
