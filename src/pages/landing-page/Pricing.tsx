import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import CTASection from "@/components/landing-page/CTASection";
import { PlanCard } from "@/features/billing/components/PlanCard";
import { subscriptionPlans } from "@/data/subscription-plans-data";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
    const navigate = useNavigate();

    const handleSelectPlan = (planId: string) => {
        // For now, redirect to request demo or signup
        navigate("/request-demo");
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

                {/* Plans Grid */}
                <div className="mx-auto w-full max-w-7xl px-4 md:px-6 mb-12 md:mb-24">
                    <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {subscriptionPlans.map((plan) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={{ ...plan, isCurrent: false }}
                                    onSelectPlan={handleSelectPlan}
                                    ctaText="Start for Free"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
