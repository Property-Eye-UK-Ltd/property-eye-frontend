import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SecuritySafe } from "iconsax-react";

const CTASection = () => {
    return (
        <section className="bg-primary py-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 relative">

                {/* Main Card */}
                <div className="bg-[#4D66EA] rounded-xl md:rounded-2xl p-8 md:p-24 relative z-10 flex flex-col items-center text-center overflow-hidden">

                    {/* Decoration: Left SVG (Trapped) */}
                    <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 z-0 w-1/4 max-w-[200px]">
                        <img
                            src="/assets/home/cta/left.svg"
                            alt=""
                            className="w-full h-auto drop-shadow-2xl translate-y-[-10%]"
                        />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-white text-2xl md:text-4xl font-medium mb-8 leading-tight">
                            Get started with Property Eye today
                        </h2>

                        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-12">
                            Protect your agency’s revenue with a fraud detection and monitoring platform built specifically for UK
                            real estate operations.
                        </p>

                        <div className="flex flex-col items-center gap-8">
                            <Button
                                asChild
                                className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-14 text-base font-semibold transition-all hover:scale-105"
                            >
                                <Link to="/contact">Contact Us</Link>
                            </Button>

                            <div className="flex items-center gap-3 text-white/70 text-xs md:text-sm">
                                <SecuritySafe size={18} className="text-white" />
                                <span>Join agencies already protecting their revenue with Property Eye</span>
                            </div>
                        </div>
                    </div>

                    {/* Decoration: Right SVG (Trapped) */}
                    <div className="hidden lg:block absolute -right-1 top-1/2 -translate-y-1/2 z-0 w-1/4 max-w-[200px]">
                        <img
                            src="/assets/home/cta/right.svg"
                            alt=""
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>

                    {/* Subtle Internal Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/10 blur-[100px] pointer-events-none" />
                </div>

            </div>
        </section>
    );
};

export default CTASection;
