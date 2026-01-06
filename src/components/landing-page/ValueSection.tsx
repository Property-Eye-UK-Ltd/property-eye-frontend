import { Eye, EmptyWalletChange, ShieldTick, MenuBoard } from "iconsax-react";

const ValueSection = () => {
    const values = [
        {
            title: "Detect hidden commission leaks",
            description: "Commission loss often goes unnoticed until it becomes significant. Property Eye continuously monitors activity to surface patterns and inconsistencies that traditional checks miss, allowing agencies to address issues before they escalate.",
            icon: <Eye size={24} variant="Outline" />,
        },
        {
            title: "Recover lost revenue",
            description: "By identifying irregularities early, agencies are better positioned to investigate, correct, and recover revenue that would otherwise slip through the cracks.",
            icon: <EmptyWalletChange size={24} variant="Outline" />,
        },
        {
            title: "Protect against internal/external fraud",
            description: "Fraud risks are not limited to a single source. Property Eye provides ongoing monitoring that helps agencies stay protected from both internal misconduct and external manipulation.",
            icon: <ShieldTick size={24} variant="Outline" />,
        },
        {
            title: "View long-term activity with clarity",
            description: "Access historic commission activity in one place, making it easier to spot trends, compare periods, and maintain consistent oversight as your agency grows.",
            icon: <MenuBoard size={24} variant="Outline" />,
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left Column */}
                    <div className="lg:w-[30%]">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-normal text-[10px] mb-8 tracking-widest uppercase">
                            Our Value
                        </div>
                        <h2 className="text-primary text-xl md:text-2xl lg:text-3xl font-medium leading-tight">
                            Why agencies trust our solution
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-[70%]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {values.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-primary rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-300"
                                >
                                    {/* Icon Wrapper */}
                                    <div className="absolute top-6 left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                                        {item.icon}
                                    </div>

                                    <div className="mt-20">
                                        <h3 className="text-secondary text-md font-normal mb-4 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-white text-xs md:text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueSection;
