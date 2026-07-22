import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import CTASection from "@/components/landing-page/CTASection";
import { PlanCard } from "@/features/billing/components/PlanCard";
import { usePlan } from "@/features/billing/api/usePlans";
import { useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faq-data";

const Pricing = () => {
    const navigate = useNavigate();
    const { data: plan, isLoading, isError } = usePlan();

    const handleSelectPlan = () => {
        navigate("/signup?redirect=billing");
    };

    return (
        <div className="min-h-screen bg-page-background">
            <Header />
            <main className="pt-32 pb-0">
                {/* Hero Section */}
                <div className="text-left md:text-center mb-12 md:mb-16 px-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-xs mb-4 md:mb-6 tracking-widest uppercase">
                        PRICING
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-4 md:mb-6 leading-tight">
                        We’ve got a plan that is <br className="hidden md:block" /> perfect for you
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Choose the right plan for your agency’s size, workflow, and fraud-prevention needs.
                    </p>
                </div>

                {/* Plan */}
                <div className="mx-auto w-full max-w-5xl px-4 md:px-6 mb-12 md:mb-24">
                    {isLoading ? (
                        <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
                    ) : isError || !plan ? (
                        <p className="py-8 text-center text-sm text-gray-600">
                            Could not load pricing. Please try again shortly.
                        </p>
                    ) : (
                        <PlanCard
                            name={plan.name}
                            description={plan.target_customer_description}
                            priceGbp={plan.price_gbp_monthly}
                            billingInterval={plan.billing_interval}
                            features={plan.feature_list}
                            onSubscribe={handleSelectPlan}
                        />
                    )}
                </div>

                {/* Billing FAQ Section */}
                <div className="mx-auto w-full max-w-7xl px-4 md:px-6 mb-12 md:mb-24">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-medium text-black">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {faqData["Billing"].map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border rounded-2xl px-6 bg-gray-200 data-[state=open]:bg-gray-200 transition-colors"
                            >
                                <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:no-underline py-4">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
