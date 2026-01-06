import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import TrustSection from "@/components/landing-page/TrustSection";
import ValueSection from "@/components/landing-page/ValueSection";
import ProtectionSection from "@/components/landing-page/ProtectionSection";
import HowWeWorkSection from "@/components/landing-page/HowWeWorkSection";
import CTASection from "@/components/landing-page/CTASection";
import Footer from "@/components/landing-page/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Hero />
                <TrustSection />
                <ValueSection />
                <ProtectionSection />
                <HowWeWorkSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
