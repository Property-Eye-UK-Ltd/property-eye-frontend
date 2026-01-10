import { SecuritySafe } from "iconsax-react";

const Hero = () => {
    return (
        <section className="relative pt-24 pb-0 md:pt-40 bg-white overflow-hidden">
            <div className="container mx-auto px-6 text-center z-10 relative">
                {/* Badge */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-4 md:mb-6 tracking-widest uppercase">
                    ABOUT US
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-black mb-4 md:mb-6 leading-tight max-w-4xl mx-auto">
                    Redefining the Future <br /> of Real Estate
                </h1>

                {/* Subtext */}
                <p className="text-gray-600 max-w-4xl mx-auto text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                    Property Eye is a UK‑focused fraud detection and monitoring platform built to help real estate agencies
                    protect what they earn. We give agencies clear, ongoing visibility into commission activity, helping them
                    identify irregularities early and reduce revenue loss without disrupting day‑to‑day operations.
                </p>

                {/* Security Label */}
                <div className="flex items-center justify-center gap-2 mb-8 md:mb-16">
                    <SecuritySafe size={24} className="w-5 h-5 text-progress" />
                    <span className="text-progress font-normal text-sm md:text-base">Enterprise-grade security</span>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full mx-auto">
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img
                        src="/assets/about/hero-bg.png"
                        alt="Team collaborating"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
