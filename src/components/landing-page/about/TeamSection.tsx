import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const teamMembers = [
    {
        name: "Mark Essien",
        role: "CEO",
        image: "/placeholder.svg",
    },
    {
        name: "Harnet Drury",
        role: "Legal Personnel",
        image: "/placeholder.svg",
    },
    {
        name: "Dan Shellard",
        role: "Head of Analysts",
        image: "/placeholder.svg",
    },
    {
        name: "Julie",
        role: "Head of Analysts",
        image: "/placeholder.svg",
    },
];

const TeamSection = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="bg-secondary py-20 md:py-32">
            <div className="container mx-auto px-6">
                <div className="mb-12 md:mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-6 tracking-widest uppercase">
                        THE TEAM
                    </div>
                    <h2 className="text-2xl md:text-4xl font-medium text-primary mb-6 leading-tight max-w-2xl">
                        The Minds Advancing <br className="hidden md:block" /> Fraud Prevention
                    </h2>
                    <p className="text-primary/80 max-w-2xl text-base md:text-lg mb-8 leading-relaxed">
                        Our team brings together experts in real estate, data analysis, and
                        risk management to build smarter, faster, and more reliable
                        fraud-detection solutions.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="aspect-square bg-white/10 overflow-hidden mb-4 border border-primary/10">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-primary">{member.name}</h3>
                            <p className="text-primary/60 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            slidesToScroll: 2,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {teamMembers.map((member, index) => (
                                <CarouselItem key={index} className="pl-4 basis-1/2">
                                    <div className="flex flex-col">
                                        <div className="aspect-square bg-white/10 overflow-hidden mb-4 border border-primary/10">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-all duration-300"
                                            />
                                        </div>
                                        <h3 className="text-md font-medium text-primary leading-tight">
                                            {member.name}
                                        </h3>
                                        <p className="text-primary/60 text-xs">{member.role}</p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: count }).map((_, i) => (
                                <button
                                    key={i}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        current === i ? "bg-primary w-6" : "bg-progress"
                                    )}
                                    onClick={() => api?.scrollTo(i)}
                                />
                            ))}
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
