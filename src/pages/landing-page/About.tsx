import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/about/Hero";
import MissionSection from "@/components/landing-page/about/MissionSection";
import ValuesSection from "@/components/landing-page/about/ValuesSection";
import StorySection from "@/components/landing-page/about/StorySection";
import CTASection from "@/components/landing-page/CTASection";

const About = () => {
    return (
        <div className="min-h-screen bg-page-background">
            <Header />
            <main>
                <Hero />
                <MissionSection />
                <StorySection />
                <ValuesSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default About;
