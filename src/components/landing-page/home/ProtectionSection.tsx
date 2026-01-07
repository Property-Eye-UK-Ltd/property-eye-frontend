import { cn } from "@/lib/utils";

const ProtectionSection = () => {
    const protectionItems = [
        {
            id: "01.",
            title: "UNAUTHORISED PRIVATE DEALS",
            description: "We flag transactions and side-agreements that happen outside your agency's knowledge, making sure your hard-earned commissions aren't missed."
        },
        {
            id: "02.",
            title: "DOUBLE REPRESENTATION FRAUD",
            description: "Spot hidden dual-agency cases where parties attempt to collect undisclosed fees, protecting your agency's reputation and bottom line."
        },
        {
            id: "03.",
            title: "COMMISSION BYPASSING",
            description: "Identify the subtle ways standard processes are circumvented to avoid payments, giving you the clarity needed to step in and recover revenue."
        }
    ];

    return (
        <section className="bg-primary py-24 text-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-block text-secondary font-medium text-xs mb-8 tracking-[0.2em] uppercase">
                            Protection
                        </div>

                        <h2 className="text-xl md:text-3xl font-normal leading-tight mb-16">
                            Where Property Eye Shields Your Agency From Hidden Threats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            {protectionItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "space-y-4",
                                        index === 2 ? "md:col-span-2 md:max-w-[45%]" : ""
                                    )}
                                >
                                    <div className="text-white/40 text-sm font-normal">
                                        {item.id}
                                    </div>
                                    <h3 className="text-white text-sm font-normal tracking-wider">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60 text-xs leading-relaxed font-normal">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-xl md:rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[600px]">
                            <img
                                src="/assets/home/protection.jpg"
                                alt="Real estate keys and model houses"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Subtle decorative element */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-0" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProtectionSection;
