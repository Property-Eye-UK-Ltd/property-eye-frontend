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

                    <div className="relative w-full max-w-7xl mx-auto overflow-hidden ">
                        <div className="flex animate-infinite-scroll gap-6 w-max">
                            {[...logos, ...logos, ...logos].map((logo, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "bg-secondary rounded-2xl h-16 md:h-24 w-32 md:w-48 flex items-center justify-center p-4 shrink-0"
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
            </div>
        </section>
    );
};

export default TrustSection;
