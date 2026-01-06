import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] md:min-h-[100vh] lg:min-h-screen flex items-center pt-20 md:pt-24 lg:pt-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/home/hero-bg.jpg"
                    alt="Modern UK Houses"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 md:py-20 relative z-10 flex flex-col items-center text-center">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-normal text-[10px] mb-6 md:mb-8 tracking-widest uppercase">
                        Home
                    </div>

                    {/* Title */}
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-medium mb-4 md:mb-6 leading-tight md:leading-relaxed">
                        Your Agency’s Real-Time <br className="hidden sm:block" /> Fraud Intelligence.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white/70 text-sm md:text-lg font-normal leading-relaxed mb-8 md:mb-12">
                        Property Eye is a fraud detection and monitoring platform built for UK real estate agencies.
                        We provide continuous oversight of commission activity, helping agencies identify irregular
                        behaviour early, reduce revenue loss, and maintain trust across their operations.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
