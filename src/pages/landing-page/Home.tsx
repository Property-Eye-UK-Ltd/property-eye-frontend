import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import TrustSection from "@/components/landing-page/TrustSection";
import ValueSection from "@/components/landing-page/ValueSection";

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <Hero />
                <TrustSection />
                <ValueSection />
                {/* Other sections will be added here */}
            </main>
        </div>
    );
};

export default Home;
