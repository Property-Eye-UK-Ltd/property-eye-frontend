import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/home/Hero";
import TrustSection from "@/components/landing-page/home/TrustSection";
import ValueSection from "@/components/landing-page/home/ValueSection";
import ProtectionSection from "@/components/landing-page/home/ProtectionSection";
import HowWeWorkSection from "@/components/landing-page/home/HowWeWorkSection";
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
