import { useState } from "react";
import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CaseTypeTabs } from "@/components/dashboard/CaseTypeTabs";
import { faqData } from "@/data/faq-data";

const FAQ = () => {
    const [activeTab, setActiveTab] = useState("General");
    const categories = Object.keys(faqData);

    // Transform categories into format expected by CaseTypeTabs
    const tabsData = categories.map(cat => ({
        label: cat,
        value: cat,
        // Optional: count could be faqData[cat].length if desired
    }));

    return (
        <div className="min-h-screen bg-page-background">
            <Header />
            <main className="pt-32 pb-0">
                {/* Hero Section - Centered on desktop, left on mobile */}
                <div className="text-left md:text-center mb-12 md:mb-16 px-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-secondary font-medium text-xs mb-4 md:mb-6 tracking-widest uppercase">
                        FAQ
                    </div>
                    <h1 className="text-4xl md:text-5xl font-medium text-black mb-6 leading-tight">
                        Your top questions, <br className="hidden md:block" /> answered.
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Explore detailed answers that clarify how our platform prevents commission fraud and strengthens transparency.
                    </p>
                </div>

                {/* Content Section - White bg, rounded top */}
                <div className="bg-white rounded-t-[3rem] px-6 py-12 md:py-24 min-h-[600px]">
                    <div className="max-w-7xl mx-auto">

                        {/* Categories Tabs - Using reused component */}
                        <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
                            <CaseTypeTabs
                                tabs={tabsData}
                                selected={activeTab}
                                onSelect={setActiveTab}
                            />
                        </div>

                        {/* Q&A Accordion */}
                        <div className="max-w-7xl mx-auto">
                            <Accordion type="single" collapsible className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {faqData[activeTab as keyof typeof faqData].map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border rounded-2xl px-6 bg-gray-50/50 data-[state=open]:bg-gray-50 border-gray-50 transition-colors"
                                    >
                                        <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:no-underline py-4">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-4">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
