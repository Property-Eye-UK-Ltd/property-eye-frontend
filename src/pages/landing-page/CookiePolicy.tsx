import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 pb-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header Card */}
                    <div className="bg-primary rounded-2xl p-12 md:p-24 text-center mb-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-white/60 text-sm mb-6">Last Updated: Jan 2025</p>
                            <h1 className="text-3xl md:text-5xl font-medium text-white mb-6">
                                We believe in transparency
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
                                This Cookie Policy explains how Property Eye uses cookies and similar technologies on our website and platform.
                            </p>
                        </div>
                        {/* Subtle internal glow/decoration */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[80px] pointer-events-none" />
                    </div>

                    {/* Content Sections */}
                    <div className="max-w-3xl mx-auto space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">1. What Are Cookies?</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Cookies are small text files placed on your device to help websites function properly, remember preferences, and improve user experience.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">2. Types of Cookies We Use</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">a) Strictly Necessary Cookies</h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                        These cookies are essential for:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 pl-4">
                                        <li>Logging in</li>
                                        <li>Security and session management</li>
                                        <li>Platform navigation</li>
                                    </ul>
                                    <p className="text-gray-600 text-sm md:text-base mt-2 italic">
                                        - These cannot be disabled.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">b) Performance & Analytics Cookies</h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                        Used to understand how users interact with our site, including:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 pl-4">
                                        <li>Page views</li>
                                        <li>Traffic sources</li>
                                        <li>Error tracking</li>
                                    </ul>
                                    <p className="text-gray-600 text-sm md:text-base mt-2">
                                        Examples: Google Analytics (or similar)
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">c) Functional Cookies</h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                        These cookies allow us to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 pl-4">
                                        <li>Remember user preferences</li>
                                        <li>Save settings</li>
                                        <li>Improve usability</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">d) Marketing & Communication Cookies (if applicable)</h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                        Used for:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 pl-4">
                                        <li>Campaign tracking</li>
                                        <li>Email or demo request follow-ups</li>
                                    </ul>
                                    <p className="text-gray-600 text-sm md:text-base mt-2 italic">
                                        (Only enabled with user consent.)
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">3. Managing Cookies</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                You can:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 pl-4">
                                <li>Accept or reject cookies via our cookie banner</li>
                                <li>Modify cookie settings in your browser</li>
                                <li>Delete cookies at any time</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base mt-2 italic">
                                Note: Disabling some cookies may affect functionality.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">4. Third-Party Cookies</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Some cookies may be set by trusted third-party services we use for analytics, performance, or payments. These providers have their own privacy policies.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">5. Changes to This Cookie Policy</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update this Cookie Policy from time to time. Updates will be posted here with a revised date.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">6. Contact Us</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                If you have questions about our use of cookies:
                            </p>
                            <a href="mailto:privacy@propertyeye.com" className="text-primary font-medium hover:underline">
                                privacy@propertyeye.com
                            </a>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CookiePolicy;
