import { LampCharge, SearchStatus1 } from "iconsax-react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const StorySection = () => {
    const stories = [
        {
            year: "2024 — The Idea",
            title: "The Idea was born",
            description: "The initial idea for Property Eye was formed in 2024, driven by conversations with agency leaders who suspected revenue loss but lacked the tools to confirm it. What stood out was not just the scale of the problem, but how difficult it was to spot using traditional processes.",
            icon: LampCharge,
            color: "#1B7ECC",
            position: "right"
        },
        {
            year: "2025 — Discovery",
            title: "Deeper Research",
            description: "In 2025, deeper analysis confirmed the extent of the issue. Patterns of commission avoidance, inconsistent disclosures, and internal blind spots were more common than expected. Agencies were not failing due to negligence — they simply lacked visibility. This period shaped the principles behind Property Eye: continuous monitoring, clarity, and accountability.",
            icon: SearchStatus1,
            color: "#008128",
            position: "left"
        },
        {
            year: "2026 — The Launch",
            title: "Building The Solution",
            description: "Property Eye launches in 2026 with a clear purpose: to give agencies a reliable way to monitor commission activity and identify fraud risks in real time. The platform is designed to scale naturally with each agency, delivering the same level of protection whether managing a single office or multiple branches.",
            icon: Rocket,
            color: "#8861DC",
            position: "right"
        }
    ];

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* SVG Background Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'url("/assets/about/story-bg.svg")',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '800px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-6 tracking-widest uppercase">
                        OUR STORY
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        Property Eye was not built overnight. It emerged from close observation of how commission leakage quietly affects agencies of all sizes.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="max-w-6xl mx-auto relative">

                    {stories.map((story, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col mb-24 last:mb-0 relative",
                                story.position === "right" ? "items-end" : "items-start"
                            )}
                        >
                            {/* The Card */}
                            <div className="w-full md:w-[45%] bg-white rounded-2xl p-8 md:p-10flex flex-col gap-6 relative z-20">
                                {/* Header Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${story.color}15` }}
                                    >
                                        <story.icon
                                            size={20}
                                            className="w-6 h-6"
                                            style={{ color: story.color }}
                                        />
                                    </div>
                                    <span
                                        className="text-md md:text-lg font-medium"
                                        style={{ color: story.color }}
                                    >
                                        {story.year}
                                    </span>
                                </div>

                                {/* Body Content */}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">
                                        {story.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {story.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connecting Arrows (Desktop only) */}
                            {index < stories.length - 1 && (
                                <div
                                    className={cn(
                                        "hidden md:block absolute z-10",
                                        index === 0 ? "top-[60%] right-[50%] w-[300px]" : "top-[60%] left-[50%] w-[300px]"
                                    )}
                                >
                                    <img
                                        src="/assets/about/arrow.svg"
                                        alt=""
                                        className={cn(
                                            "w-full h-auto",
                                            index === 1 && "scale-x-[-1] scale-y-[1]" // Invert for 2nd to 3rd connection
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorySection;
