import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import CTASection from "@/components/landing-page/CTASection";
import { PlanCard } from "@/features/billing/components/PlanCard";
import { usePlan } from "@/features/billing/api/usePlans";
import { useNavigate } from "react-router-dom";

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

                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
