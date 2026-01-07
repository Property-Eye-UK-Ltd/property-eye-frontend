import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header Card */}
                    <div className="bg-primary rounded-2xl p-12 md:p-24 text-center mb-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-white/60 text-sm mb-6">Last updated: Jan 2025</p>
                            <h1 className="text-3xl md:text-5xl font-medium text-white mb-6">
                                We care about your privacy
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
                                Explore how Property Eye can help your agency detect real-estate commission fraud.
                            </p>
                        </div>
                        {/* Subtle internal glow/decoration similar to HelpArticle/CTA if needed */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[80px] pointer-events-none" />
                    </div>

                    {/* Content Sections */}
                    <div className="max-w-3xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">Introduction</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">2. Changes to Terms</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">3. Privacy Policy</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">4. Use of Services</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">5. Use of Services</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By using Property Eye, you acknowledge that you have read, understood, and accepted these terms and conditions. These terms apply to all visitors, users, and anyone accessing or using our website. If you disagree with any part of these terms, you are prohibited from using this website.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these terms from time to time, and any changes will take effect immediately upon being posted. It is your responsibility to review these terms periodically to stay informed of any updates.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
