const ValuesSection = () => {
    const values = [
        {
            number: "01.",
            title: "INTEGRITY",
            description: "Trust is the foundation of our platform. We believe agencies deserve clear, honest insight into their operations without unnecessary complexity or hidden agendas."
        },
        {
            number: "02.",
            title: "TRANSPARENCY",
            description: "Visibility creates accountability. Property Eye is designed to surface meaningful information in a way that supports informed decision‑making, not confusion."
        },
        {
            number: "03.",
            title: "REVENUE PROTECTION",
            description: "Commission income is the lifeblood of an agency. We are committed to helping agencies protect what they earn by reducing exposure to avoidable loss and ongoing risk."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-6 tracking-widest uppercase">
                        WHAT WE BELIEVE
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-tight max-w-3xl mx-auto">
                        Our core values guide everything we build and every decision we make
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-primary rounded-2xl p-8 md:p-10 flex flex-col min-h-0 md:min-h-[400px] transition-transform hover:translate-y-[-8px] duration-300"
                        >
                            {/* Number */}
                            <div className="text-[#FFE59D] text-sm font-medium mb-auto">
                                {value.number}
                            </div>

                            {/* Content */}
                            <div className="mt-12">
                                <h3 className="text-secondary text-lg font-medium mb-4 tracking-wide">
                                    {value.title}
                                </h3>
                                <p className="text-white text-base leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ValuesSection;
