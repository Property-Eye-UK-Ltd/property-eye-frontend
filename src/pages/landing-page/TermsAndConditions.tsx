import Header from "@/components/landing-page/Header";
import Footer from "@/components/landing-page/Footer";

const TermsAndConditions = () => {
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
                                Our Terms of Service
                            </h1>
                            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
                                These Terms and Conditions govern your access to and use of the Property Eye website, platform, software, and services.
                            </p>
                        </div>
                        {/* Subtle internal glow/decoration */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[80px] pointer-events-none" />
                    </div>

                    {/* Content Sections */}
                    <div className="max-w-3xl mx-auto space-y-12">

                        <section className="space-y-4">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                By accessing or using Property Eye, you agree to be bound by these Terms. If you do not agree, you must not use the Service.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">1. Definitions</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li><strong>“Property Eye”, “we”, “us”, “our”</strong> refers to Property Eye Ltd.</li>
                                <li><strong>“User”, “you”</strong> refers to any individual or entity using the Service.</li>
                                <li><strong>“Agency”</strong> refers to a real estate agency or business account.</li>
                                <li><strong>“Admin”</strong> refers to authorized Property Eye personnel.</li>
                                <li><strong>“Platform”</strong> refers to the Property Eye web application and related services.</li>
                                <li><strong>“Content”</strong> refers to all data, documents, files, and materials uploaded or generated on the Platform.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">2. Eligibility & Account Registration</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>You must be at least 18 years old to use Property Eye.</li>
                                <li>You must provide accurate, complete, and up-to-date information during registration.</li>
                                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                <li>You are responsible for all activities carried out under your account.</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                Property Eye reserves the right to suspend or terminate accounts that provide false information or violate these Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">3. Scope of Services</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                Property Eye provides a commission fraud detection and analytics platform for real estate agencies, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Data integration with agency systems</li>
                                <li>Automated fraud detection and flagging</li>
                                <li>Case management and evidence storage</li>
                                <li>Analytics, reporting, and dashboards</li>
                                <li>Subscription and billing services</li>
                                <li>Sandbox and testing environments</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2 italic">
                                Property Eye does not guarantee recovery of commissions or legal outcomes.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">4. User Responsibilities</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                You agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Use the Platform only for lawful purposes</li>
                                <li>Ensure you have legal rights to upload and process any data</li>
                                <li>Maintain compliance with applicable data protection laws</li>
                                <li>Not misuse, reverse-engineer, or interfere with the Platform</li>
                                <li>Not upload malicious software, false data, or unauthorized content</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                You are solely responsible for the accuracy and legality of data you submit.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">5. Data Usage & Ownership</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>You retain ownership of your uploaded data.</li>
                                <li>By using the Service, you grant Property Eye a limited, non-exclusive license to process your data solely to provide the Service.</li>
                                <li>Property Eye may generate anonymized, aggregated insights for analytics and product improvement.</li>
                                <li>We do not sell customer data.</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                For details, see our Privacy Policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">6. Fraud Detection Disclaimer</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                Property Eye provides risk indicators and analytical insights, not legal advice.
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Fraud alerts are probabilistic and based on data inputs.</li>
                                <li>Property Eye is not liable for decisions made based on platform outputs.</li>
                                <li>Agencies are responsible for independent verification and legal action.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">7. Subscriptions, Billing & Payments</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Some features require a paid subscription.</li>
                                <li>Fees are billed monthly or annually as selected.</li>
                                <li>All payments are non-refundable unless required by law.</li>
                                <li>Failure to pay may result in suspension or termination.</li>
                                <li>Prices may change with prior notice.</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                Billing is handled via third-party payment providers (e.g., Stripe).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">8. Free Trials & Sandbox Access</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Trial or sandbox access is provided “as is.”</li>
                                <li>Property Eye may modify or withdraw trial access at any time.</li>
                                <li>Data in sandbox environments may be deleted without notice.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">9. Intellectual Property</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                All intellectual property rights in the Platform, including:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Software</li>
                                <li>Designs</li>
                                <li>Branding</li>
                                <li>Logos</li>
                                <li>Documentation</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                remain the exclusive property of Property Eye. You may not copy, distribute, or create derivative works without written consent.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">10. Confidentiality</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                Both parties agree to maintain confidentiality of non-public business, technical, and user information obtained through the Platform. This obligation survives termination.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">11. Service Availability & Maintenance</h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>We aim for high availability but do not guarantee uninterrupted access.</li>
                                <li>Maintenance, updates, or outages may occur.</li>
                                <li>Property Eye is not liable for downtime beyond reasonable control.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">12. Termination</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                Property Eye may suspend or terminate access if:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>These Terms are breached</li>
                                <li>The account is inactive for an extended period</li>
                                <li>Required by law or regulation</li>
                            </ul>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                                Users may terminate their account at any time by contacting support.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">13. Limitation of Liability</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                To the maximum extent permitted by law:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Property Eye is not liable for indirect, incidental, or consequential damages.</li>
                                <li>Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">14. Indemnification</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-2">
                                You agree to indemnify and hold harmless Property Eye from claims arising from:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-2 pl-4">
                                <li>Your misuse of the Platform</li>
                                <li>Your uploaded data</li>
                                <li>Your violation of these Terms or applicable laws</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">15. Governing Law & Jurisdiction</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">16. Changes to These Terms</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                We may update these Terms periodically. Changes will be posted on this page with an updated “Last Updated” date. Continued use of the Platform constitutes acceptance.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl md:text-2xl font-medium text-primary">17. Contact Information</h2>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                For questions regarding these Terms:
                            </p>
                            <a href="mailto:legal@propertyeye.com" className="text-primary font-medium hover:underline">
                                legal@propertyeye.com
                            </a>
                        </section>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
