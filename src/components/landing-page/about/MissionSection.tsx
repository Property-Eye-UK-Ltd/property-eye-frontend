import { ArrowRight2, ArrowUp } from "iconsax-react";

const MissionSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* Left Content */}
                    <div className="lg:w-2/5 pt-8">
                        {/* Badge */}
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-6 tracking-widest uppercase">
                            OUR MISSION
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-black leading-tight">
                            Property Eye was founded with a singular purpose: to protect real estate agencies from the growing threat of commission fraud and revenue loss.
                        </h2>
                    </div>

                    {/* Right Content (Cards) */}
                    <div className="lg:w-3/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                            {/* Card 1 */}
                            <div className="bg-primary rounded-2xl p-5 md:p-6 flex flex-col min-h-0 md:min-h-[450px] transition-transform hover:translate-y-[-8px] duration-300">
                                {/* Icon */}
                                <div className="mb-8 md:mb-12 flex -space-x-5">
                                    <ArrowRight2 className="w-8 h-8 text-white font-thin" variant="Linear" />
                                    <ArrowRight2 className="w-8 h-8 text-white font-thin" variant="Linear" />
                                </div>

                                {/* Content */}
                                <div className="mt-auto">
                                    <div className="text-secondary text-2xl md:text-3xl font-medium mb-4 leading-snug max-w-[280px]">
                                        Commission fraud is <span style={{ color: '#FFF2CE' }}>draining</span> the UK real estate industry.
                                    </div>
                                    <p className="text-white text-sm md:text-lg leading-relaxed max-w-[280px]">
                                        The damage compounds every year it goes unchecked.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-primary rounded-2xl p-5 md:p-6 flex flex-col min-h-0 md:min-h-[450px] transition-transform hover:translate-y-[-8px] duration-300">
                                {/* Icon */}
                                <div className="mb-8 md:mb-12">
                                    <ArrowUp className="w-8 h-8 text-white" variant="Linear" />
                                </div>

                                {/* Content */}
                                <div className="mt-auto">
                                    <div className="text-secondary text-5xl md:text-6xl font-medium mb-4">
                                        99.8<span style={{ color: '#FFF2CE' }}>%</span>
                                    </div>
                                    <p className="text-white text-sm md:text-lg leading-relaxed max-w-[280px]">
                                        Fraud detection accuracy with Property Eye.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MissionSection;
