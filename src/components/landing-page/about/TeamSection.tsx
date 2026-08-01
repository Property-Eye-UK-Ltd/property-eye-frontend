import * as React from "react";
import { Linkedin } from "lucide-react";

const teamMembers = [
    {
        name: "Richard Cook",
        role: "Founder & Chief Executive Officer",
        image: "/assets/about/richard.png",
        imagePosition: "center 0",
        linkedin: "https://www.linkedin.com/in/richard-cook-39529442/",
        bio: [
            "Serial entrepreneur with experience building and successfully exiting businesses across property, finance, publishing, hospitality and technology",
            "Voted the UK's Top Business Mentor in 2014",
            "Experienced non-executive director and angel investor",
            "University lecturer in entrepreneurship"
        ]
    },
    {
        name: "Leonard Onyiriuba",
        role: "Chief Technology Officer",
        image: "/assets/about/leonard.png",
        imagePosition: "center 25%",
        linkedin: "https://www.linkedin.com/in/chukwubuikem-leonard-onyiriuba/",
        bio: [
            "Applied Data Scientist and technology entrepreneur",
            "Experienced in product development, data analytics and fraud detection",
            "Designed and developed Property Eye's property monitoring platform",
            "Leads technology, product development and innovation"
        ]
    }
];

const TeamSection = () => {
    return (
        <section className="bg-secondary py-20 md:py-32">
            <div className="container mx-auto px-6">
                <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-[10px] md:text-xs mb-6 tracking-widest uppercase">
                        THE TEAM
                    </div>
                    <h2 className="text-2xl md:text-4xl font-medium text-primary mb-6 leading-tight">
                        The Minds Advancing Fraud Prevention
                    </h2>
                    <p className="text-primary/80 text-base md:text-lg mb-8 leading-relaxed">
                        Our team brings together experts in real estate, data analysis, and
                        risk management to build smarter, faster, and more reliable
                        fraud-detection solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex flex-col rounded-2xl bg-white shadow-sm border border-primary/10 hover:shadow-md hover:border-primary/20 transition-all duration-300 overflow-hidden"
                        >
                            <div className="w-full aspect-[5/4] bg-white/10 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: member.imagePosition }}
                                />
                            </div>
                            <div className="flex flex-col p-4 md:p-5">
                                <div className="flex items-start justify-between gap-4 mb-1">
                                    <h3 className="text-base md:text-lg font-medium text-primary leading-tight">{member.name}</h3>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary/60 hover:text-primary transition-colors shrink-0"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </div>
                                <p className="text-primary/60 text-[10px] font-medium uppercase tracking-wider mb-3">{member.role}</p>
                                <ul className="space-y-1.5 text-primary/80 text-xs leading-relaxed list-disc list-inside">
                                    {member.bio.map((bullet, i) => (
                                        <li key={i} className="pl-4 -indent-4">{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
