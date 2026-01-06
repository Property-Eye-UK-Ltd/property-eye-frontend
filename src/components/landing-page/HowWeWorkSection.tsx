import { cn } from "@/lib/utils";

const HowWeWorkSection = () => {
    const steps = [
        {
            icon: "/assets/home/works/database.svg",
            title: "Provide property and client database",
            description: "Your agency securely connects relevant property and client data, ensuring monitoring is accurate and up to date."
        },
        {
            icon: "/assets/home/works/find.svg",
            title: "Our system runs fraud checks",
            description: "Property Eye runs ongoing checks across commission activity, watching for irregular patterns and potential risks as they emerge."
        },
        {
            icon: "/assets/home/works/dashboard.svg",
            title: "You get insights in your dashboard",
            description: "Findings are presented through a straightforward dashboard that prioritises clarity, helping you understand what matters without unnecessary complexity."
        }
    ];

    return (
        <section
            className="py-24 relative overflow-hidden bg-white"
            style={{
                backgroundImage: 'url("/assets/home/works/bg.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Heading */}
                    <div className="lg:w-1/4 flex lg:justify-end">
                        <h2 className="text-3xl md:text-4xl font-medium text-primary leading-tight lg:text-left sticky top-32">
                            How we work
                        </h2>
                    </div>

                    {/* Right Columns (Cards) */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="bg-primary rounded-2xl p-4 md:p-6 flex flex-col min-h-[400px] transition-transform hover:translate-y-[-8px] duration-300"
                                >
                                    {/* Icon */}
                                    <div className="mb-16">
                                        <img
                                            src={step.icon}
                                            alt={step.title}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-auto">
                                        <h3 className="text-secondary text-sm md:text-md font-normal mb-4 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-white text-xs md:text-sm leading-relaxed">
                                            {step.description}
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

export default HowWeWorkSection;
