import { cn } from "@/lib/utils";

const TrustSection = () => {
    const logos = Array(6).fill("/assets/logo-dark.png");

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-white text-xl md:text-xl font-medium uppercase mb-12">
                        Trusted by agencies across the United Kingdom
                    </h2>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 w-full max-w-3xl mx-auto">
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "bg-secondary rounded-2xl h-16 md:h-24 flex items-center justify-center p-4 transition-transform hover:scale-[1.02]",
                                    "col-span-1"
                                )}
                            >
                                <img
                                    src={logo}
                                    alt={`Partner Agency ${index + 1}`}
                                    className="max-h-5 md:max-h-8 w-auto opacity-80 grayscale brightness-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
